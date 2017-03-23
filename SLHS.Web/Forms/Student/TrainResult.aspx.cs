using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SLHS.Web.Forms.Student
{
    public partial class TrainResult : System.Web.UI.Page
    {
        private SLHSDataContext SLHS_DB = new SLHSDataContext();
        private int passGrade = 100; //student needs to be above this grade to pass

        private Member curMember;
        protected void Page_Load(object sender, EventArgs e)
        {
            LoadDataTable();
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
            table.Rows.Add("training 1", "2/2", 100, true);
            table.Rows.Add("training 2", "3/3", 100, true);
            table.Rows.Add("training 3", "2/5", 40, false);
            table.Rows.Add("training 4", "0/2", 0, false);

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
            table.Columns.Add("Training", typeof(string));
            table.Columns.Add("Score", typeof(string));
            table.Columns.Add("Percent", typeof(int));
            table.Columns.Add("Pass", typeof(bool));
        }


        void AddRowToTable(DataTable table, QuestionResult result)
        {

        }


    }
}