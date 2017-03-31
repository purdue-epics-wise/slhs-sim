using SLHS.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SLHS.Web.Forms.Student
{
    public partial class TrainResult : System.Web.UI.Page
    {
        //some constant
        private const string TRAINING = "Training";
        private const string SCORE    = "Score";
        private const string PERCENT  = "Percent";
        private const string PASS     = "Pass";

        private SLHSDataContext SLHS_DB = new SLHSDataContext();
        private int passPercent = 100; //student needs to be above this to pass

        private Member curMember;
        protected void Page_Load(object sender, EventArgs e)
        {
            //check signed in
            if (Session[WebConstant.User] == null)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

            LoadMember();
            LoadDataTable();
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
        /// populate data into GridView
        /// </summary>
        void LoadDataTable()
        {
            //create data source
            DataTable table = new DataTable();

            //add columns
            AddColumnToTable(table);

            //add rows
            IQueryable<Train> query = from t in SLHS_DB.Trains
                                      select t;

            Train[] trainings = query.ToArray();
            foreach (Train t in trainings)
            {
                AddRowToTable(table, t);
            }

            //bind data to grid view
            gridViewResult.DataSource = table;
            gridViewResult.DataBind();
        }

        /// <summary>
        /// simply add column to table to make code clean
        /// </summary>
        /// <param name="table"></param>
        void AddColumnToTable(DataTable table)
        {
            table.Columns.Add(TRAINING, typeof(string));
            table.Columns.Add(SCORE   , typeof(string));
            table.Columns.Add(PERCENT , typeof(int));
            table.Columns.Add(PASS    , typeof(bool));
        }

        /// <summary>
        /// for every training available, calculate their score
        /// that a student get,
        /// put the score in a table_row, 
        /// put that row into the 'table'
        /// </summary>
        /// <param name="table"></param>
        /// <param name="training"></param>
        void AddRowToTable(DataTable table, Train training)
        {
         
            //get all the question_result to determine student score
            EntitySet<Question> questions = training.Questions;
            int allQuestions = questions.Count;
            int correctQuestions = 0;
          
            //calculate
            foreach (Question q in questions)
            {
                //since every student can only answer once
                QuestionResult result = q.QuestionResults.Where(r => r.StudentId == curMember.Id).FirstOrDefault();
                
                //student not answer yet   
                if (result == null) break;        
                if (result.ChoiceId == q.ChoiceCorrectId)
                    correctQuestions++;

            }

            //put them together  
            bool isPass = false;
            string score = correctQuestions + "/" + allQuestions;

            //calculate percent
            double percent = ((double)correctQuestions / allQuestions) * 100;
            percent = Math.Round(percent);
            if (percent > passPercent)
                isPass = true;
            
            //put data into row
            DataRow row = table.NewRow();
            row[TRAINING] = training.Name;
            row[SCORE]    = score;
            row[PERCENT]  = percent;
            row[PASS] = isPass;

            //add them to table
            table.Rows.Add(row);
        }


    }
}