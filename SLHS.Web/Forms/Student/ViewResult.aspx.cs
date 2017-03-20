using SLHS.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.UI;
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


        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session[WebConstant.User] == null)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

            //load things up
            LoadMember();
            LoadTrainingID();
            LoadPreviousAnswers();
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
        /// display list of question like in Training page
        /// however, display the correct choice as well.
        /// </summary>
        void LoadQuestionWithAnswer()
        {

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
    }
}