using System;
using System.Linq;
using System.Web.UI.WebControls;
using SLHS.Web.Utils;
using System.Web.UI.HtmlControls;
using System.Data.Linq;
using SLHS.Web.Helpers;
using System.Collections.Generic;

namespace SLHS.Web.Forms.Student
{
    public partial class Training : System.Web.UI.Page
    {
        //store question-choices
        private Dictionary<Question, RadioButtonList> questionDict;

        //database
        private SLHSDataContext SLHS_DB = new SLHSDataContext();

        protected void Page_Load(object sender, EventArgs e)
        {           
            LoadQuestion();                      
        }

        /*
         * LoadQuestion()
         * a bit long, can be reduced into small function
         * but for now, it works fine 
         */ 
        private void LoadQuestion()
        {
            //init some variable            
            questionDict = new Dictionary<Question, RadioButtonList>();
            int curQuestion = 0;

            //query from database
            IQueryable<Question> query = from q in SLHS_DB.Questions
                               select q;

            //convert to array
            Question[] questionArray = query.ToArray();
            
            //simple check
            if (questionArray.Length == 0)
            {
                Label noti = new Label();
                noti.Text = "No quiz or comment available at moment";
                quiz.Controls.Add(noti);
                return;
            }

            //render questions                  
            foreach (Question question in questionArray)
            {
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

                //add those to div.quiz
                quiz.Controls.Add(header);
                quiz.Controls.Add(h3);
                quiz.Controls.Add(radioList);
                quiz.Controls.Add(validator);

                //add those to dictionary
                questionDict.Add(question, radioList);
            }
                   
        }

        protected void ButtonSubmit_Click(object sender, EventArgs e)
        {
            //get student
            Member student = (Member) Session[WebConstant.User];

            ////detect hacker
            if (student == null)
            {
                DisplayError();
                return;
            }

            //insert data to database
            foreach (Question question in questionDict.Keys)
            {
                //get chosen choice
                RadioButtonList radioList;
                questionDict.TryGetValue(question, out radioList);
                
                //check server error              
                if (radioList == null)
                {
                    DisplayError();
                    return;
                }
                ListItem selected = radioList.SelectedItem;

                //although I have added RequiredFieldValidator, but to be safe
                if (selected == null)
                {
                    DisplayError();
                    return;
                }

                //insert to database
                QuestionResult questionResult = new QuestionResult();
                questionResult.StudentId = student.Id;
                questionResult.QuestionId = question.Id;
                questionResult.ChoiceId = Int32.Parse(radioList.SelectedItem.Value);

                //submit
                try
                {
                    SLHS_DB.QuestionResults.InsertOnSubmit(questionResult);
                } catch (InvalidOperationException)
                {
                    DisplayError();
                    return;
                }
                
            }

            //final call
            SLHS_DB.SubmitChanges();
            DisplaySuccess();
        }

        /*
         * DisplayError()
         * simply display possible error in train page
         */ 
        private void DisplayError()
        {
            Label label = new Label();
            label.Text = "Either you have not logged in"
                + "<br> Or not selected all questions "
                + "<br> Or Server Error :(";

            result.Controls.Add(label);
        }

        /*
         * Simple display success for students to know
         * that they have submitted successfully
         */ 
        private void DisplaySuccess()
        {
            //simple lable
            Label label = new Label();
            label.Text = "Submit successfully"
                + "<br> You can watch video again "
                + "<br> Or See your result in the Result page"
                + "<br> <hr />";

            //simple result link
            HyperLink resultLink = new HyperLink();
            Button resultBtn = new Button();
            resultBtn.Text = "==> Result";
            resultLink.Controls.Add(resultBtn);

            //add them
            result.Controls.Add(label);
            result.Controls.Add(resultLink);
        }
    }
}