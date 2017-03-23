using System;
using System.Linq;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.Linq;
using SLHS.Web.Helpers;
using System.Collections.Generic;
using SLHS.Web;
using System.Collections;

namespace SLHS.Web.Forms.Student
{
    public partial class Training : System.Web.UI.Page
    {
        
        private Dictionary<Question, RadioButtonList> questionDict; //store question-seleted choice
        private Dictionary<Question, QuestionResult> previousAnswers; //store question-previous choice 

        private SLHSDataContext SLHS_DB = new SLHSDataContext(); //database

        private int trainingId; //remember what training in.
        private Train curTrain;

        private Member curMember;

        protected void Page_Load(object sender, EventArgs e)
        {
            //check signed in
            if (Session[WebConstant.User] == null)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

            //load things up
            LoadMember();
            LoadTrainingID();
            LoadPreviousAnswers();
            LoadQuestion();
            

        }

        /// <summary>
        /// simple function to load Session["User"] into
        /// private field
        /// </summary>
        void LoadMember()
        {
            curMember = (Member)Session[WebConstant.User];
        }

        /// <summary>
        /// Load current Training, so that we can know
        /// which training that we are on.
        /// ex: training 1
        /// </summary>
        void LoadTrainingID()
        {
            //check trainingId from Request url
            if (Request.QueryString[WebConstant.TrainID] != null)
            {
                try
                {
                    trainingId = int.Parse(Request.QueryString[WebConstant.TrainID]);
                }
                //error
                catch (Exception) { return; }
                
            }
            else
            {
                //error
                trainingId = -1;
            }

            //get the actual train.
            IQueryable<Train> query = from t in SLHS_DB.Trains
                                      where t.Id == trainingId
                                      select t;

            if (query.Count<Train>() == 0)
            {
                return;
            }
            curTrain = query.FirstOrDefault();
            
        }

        
        
        /// <summary>
        /// LoadQuestion() based on current training
        /// Load all question-choices 
        /// </summary>
        private void LoadQuestion()
        {
            //init some variable            
            questionDict = new Dictionary<Question, RadioButtonList>();
            int curQuestion = 0;

            //check if there exist a training
            if (curTrain == null)
            {
                DisplayNoQuestion(message:"current Training Null Exception");
                return;
            }
            EntitySet<Question> questionSet = curTrain.Questions;

            //simple check
            if (questionSet == null || questionSet.Count() == 0)
            {
                DisplayNoQuestion(message:"questionSet null or no questions right now");
                return;
            }
            
            //render questions                  
            foreach (Question question in questionSet)
            {
                //wrap question around <div id="question1">
                HtmlGenericControl questionDiv = new HtmlGenericControl("div");
                questionDiv.ID = "question" + curQuestion;
                questionDiv.Attributes.CssStyle.Add("display", "none"); //Chuyang made me do it

                //question header
                HtmlGenericControl header = new HtmlGenericControl("h3");
                header.InnerText = "Question " + curQuestion;
                header.Attributes.Add("class", "questionHeader"); //add css to make it looks good

                //question content
                HtmlGenericControl h3 = new HtmlGenericControl("h3");
                h3.InnerText = question.Content;

                //question choice
                RadioButtonList radioList = new RadioButtonList();
                EntitySet<Choice> choiceSet = question.ChoiceSet.Choices;

                //load choice[] into a question
                //choice will be ListItem(content, id)
                foreach (Choice choice in choiceSet)
                {
                    radioList.Items.Add(new ListItem(choice.Content, choice.Id.ToString()));
                }

                //create validation                
                RequiredFieldValidator validator = new RequiredFieldValidator();
                radioList.ID = "radioList" + curQuestion;
                validator.ControlToValidate = radioList.ID;
                validator.ErrorMessage = "You forgot this question :|";
                curQuestion++;

                //add JavaScript button
                Button preButton = new Button();
                preButton.OnClientClick = "prev(); return false;"; //function in Training.js
                preButton.Text = "Prev";

                Button nextButton = new Button();
                nextButton.OnClientClick = "next(); return false;"; //return false: set postBack to False 
                nextButton.Text = "Next";

                //add those to question div
                questionDiv.Controls.Add(header);
                questionDiv.Controls.Add(h3);
                questionDiv.Controls.Add(radioList);
                questionDiv.Controls.Add(validator);
                questionDiv.Controls.Add(preButton);
                questionDiv.Controls.Add(nextButton);

                //add those to quiz div
                //so it looks like quiz = [question1, question2]
                quiz.Controls.Add(questionDiv);

                //add those to dictionary to use 
                //with the previous answer dictionary
                questionDict.Add(question, radioList);
                
            }

        }

        /// <summary>
        /// Based on student ID, and current training ID
        /// Load all questions-student choices into a dictionary
        /// so as to update them if the student  answer
        /// or insert them if not found the question
        /// </summary>
        private void LoadPreviousAnswers()
        {
            //declare
            previousAnswers = new Dictionary<Question, QuestionResult>();

            //get all curQuestions from training
            EntitySet<Question> curQuestions = curTrain.Questions;
            if (curQuestions.Count == 0) return;

            //get results based on member.Id
            QuestionResult result = null;
            
            foreach (Question question in curQuestions)
            {
                //1 student can only answer 1 question 1 time
                result = question.QuestionResults.Where(r => r.StudentId == curMember.Id).FirstOrDefault();
                if (result == null) continue;

                //track them in dictionary
                previousAnswers.Add(question, result);
            }
        }

       
        /// <summary>
        /// when student submit their answers
        /// Update db if already answered
        /// Insert db if not found
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void ButtonSubmit_Click(object sender, EventArgs e) 
        {
            //get the answers that student just submitted
            foreach (Question question in questionDict.Keys)
            {
                //get previous answers
                QuestionResult result = null;               
                previousAnswers.TryGetValue(question, out result);
                
                //get this answer
                RadioButtonList radioList;
                questionDict.TryGetValue(question, out radioList);
                int choiceId = int.Parse(radioList.SelectedItem.Value);

                //if answer this question before, update it
                if (result != null)
                {
                    result.ChoiceId = choiceId;
                    continue;
                }

                //if not, insert it
                result = new QuestionResult();
                result.StudentId = curMember.Id;
                result.QuestionId = question.Id;
                result.ChoiceId = choiceId;
                SLHS_DB.QuestionResults.InsertOnSubmit(result);
            }

            //final call to update or insert
            SLHS_DB.SubmitChanges();
            DisplaySuccess();
        }



        
        /// <summary>
        /// simply display possible error in train page
        /// </summary>
        private void DisplayError()
        {
            Label label = new Label();
            label.Text = "Either you have not logged in"
                + "<br> Or not selected all questions "
                + "<br> Or Server Error :(";

            result.Controls.Add(label);

        }

      
        /// <summary>
        /// Simple display success for students to know
        /// that they have submitted successfully
        /// </summary>
        private void DisplaySuccess()
        {
            //simple lable
            Label label = new Label();
            label.Text = "Submit successfully"
                + "<br> You can watch video again "
                + "<br> Or See your result in the Result page"
                + "<br> <hr />";

            //redirect student to see the result           
            //ex: "/Forms/Student/ViewResult.aspx?trainID=1"
            Response.Redirect( WebConstant.ViewResultUrl + "?" + WebConstant.TrainID + "="+ trainingId);
            
        }

       
        /// <summary>
        /// Call when no question available
        /// </summary>
        /// <param name="message"></param>
        void DisplayNoQuestion(string message = "")
        {
            Label noti = new Label();
            noti.Text = "No quiz or comment available at moment"
                        + "<br/>" + message;
            quiz.Controls.Add(noti);
        }
    }
}