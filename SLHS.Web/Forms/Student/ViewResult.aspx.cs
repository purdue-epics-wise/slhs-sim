using SLHS.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace SLHS.Web.Forms.Student
{
    public partial class ViewResult : System.Web.UI.Page
    {

        private SLHSDataContext SLHS_DB = new SLHSDataContext(); //database
        private Dictionary<Question, QuestionResult> previousAnswers; //store question-previous choice 

        private int trainingId; //remember what training in.
        private Train curTrain;
        private Member curMember;

        private int totalQuestions; //count the total questions student answered
        private int correctQuestions; //count how many those correct.

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session[WebConstant.User] == null)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

            //load credentials
            LoadMember();
            LoadTrainingID();

            //load content
            LoadVideo();
            LoadPreviousAnswers();
            LoadQuestionWithAnswer();
            LoadScore();
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
                //no training, throw student back
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

            //get the actual train.
            IQueryable<Train> query = from t in SLHS_DB.Trains
                                      where t.Id == trainingId
                                      select t;

            if (query.Count() == 0)
            {
                return;
            }
            curTrain = query.FirstOrDefault();

        }

        /// <summary>
        /// LoadVideo() load the specific video for the training
        /// for now, it will load simple video with that training
        /// ex: traingID = 2, video = "video2.mp4"
        /// </summary>
        private void LoadVideo()
        {
            //get video source
            string source = "/assets/video/video" + curTrain.Id + ".webm";
            HtmlGenericControl videoSrc = new HtmlGenericControl("source");
            videoSrc.Attributes.Add("src", source);
            videoSrc.Attributes.Add("type", "video/mp4");

            //append video source to video
            video.Controls.Add(videoSrc);
        }

        /// <summary>
        /// display list of question like in Training page
        /// however, display the correct choice as well.
        /// </summary>
        void LoadQuestionWithAnswer()
        {
            //init some variable                        
            int curQuestion = 0;
            totalQuestions = previousAnswers.Count;
            correctQuestions = 0;

            //display each question-choices-correct answer
            foreach(Question question in previousAnswers.Keys)
            {
                //wrap question around <div id="question1">
                HtmlGenericControl questionDiv = new HtmlGenericControl("div");
                questionDiv.ID = "question" + curQuestion;

                //question header
                HtmlGenericControl header = new HtmlGenericControl("h3");
                header.InnerText = "Question " + curQuestion;
                header.Attributes.Add("class", "questionHeader"); //add css to make it looks good

                //question content
                HtmlGenericControl h3 = new HtmlGenericControl("h3");
                h3.InnerText = question.Content;

                //question choice
                RadioButtonList radioList = new RadioButtonList();
                radioList.Enabled = false; //disable so that user cannot choose
                EntitySet<Choice> choiceSet = question.ChoiceSet.Choices;

                //previous choice
                QuestionResult result;
                previousAnswers.TryGetValue(question, out result);
                if (result == null)
                {
                    DisplayError();
                    return;
                }

                //increase points if correct
                if (result.ChoiceId == question.ChoiceCorrectId)
                {
                    correctQuestions++;
                }

                //load choice[] into a question
                //choice will be ListItem(content, id)             
                foreach (Choice choice in choiceSet)
                {
                    ListItem item = new ListItem(choice.Content, choice.Id.ToString());

                    //make text->red if student pick this
                    //the class can be found in Content/Training.css
                    if (choice.Id == result.ChoiceId)
                    {
                        item.Attributes.CssStyle.Add("color", "red");
                        item.Selected = true;                  
                    }
                        

                    //make text->green if this is correct                   
                    if (choice.Id == question.ChoiceCorrectId)
                    {
                        item.Attributes.CssStyle.Clear();
                        item.Attributes.CssStyle.Add("color", "green");                      
                    }    
                    
                    //add item to radio button list
                    radioList.Items.Add(item);
                  
                }

                //add those to question div
                questionDiv.Controls.Add(header);
                questionDiv.Controls.Add(h3);
                questionDiv.Controls.Add(radioList);
                curQuestion++;

                //add those to quiz div
                //so it looks like quiz = [question1, question2]
                quiz.Controls.Add(questionDiv);
                
            }
        }

        /// <summary>
        /// Display score of student
        /// on <div id="score"></div>
        /// </summary>
        void LoadScore()
        {
            //simple calculate
            HtmlGenericControl points = new HtmlGenericControl("h3");
            double percent = ((double) correctQuestions / totalQuestions) * 100;
            percent = Math.Round(percent);

            //display those
            points.InnerHtml = "Score: " 
                + correctQuestions + " / " + totalQuestions
                + "<br/>" + percent + " %";

            score.Controls.Add(points);
        }

        /// <summary>
        /// load student answer, like the one in Training.cs
        /// different is that if there is no answer
        /// this will redirect to the traning page because student has not
        /// answer
        /// </summary>
        void LoadPreviousAnswers()
        {
            //declare
            previousAnswers = new Dictionary<Question, QuestionResult>();

            //get all curQuestions from training
            //don't see, then throw student back.
            EntitySet<Question> curQuestions = curTrain.Questions;
            if (curQuestions == null || curQuestions.Count == 0)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

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
        /// simply display possible error in train page
        /// </summary>
        private void DisplayError()
        {
            Label label = new Label();
            label.Text = "Some  thing goes wrong<br>";

            result.Controls.Add(label);

        }
    }
}