using SLHS.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SLHS.Web.Forms.Professor
{
    public partial class ViewData : System.Web.UI.Page
    {
        //will have use for this later
        private Member curMember;

        //useful constant
        private const string NUMBER = "Number";
        private const string FIRSTNAME = "First Name";
        private const string LASTNAME = "Last Name";
        private const string AGE = "Age";
        private const string EMAIL = "Email";
        private const string EDIT = "Edit";

        protected void Page_Load(object sender, EventArgs e)
        {
            CheckMember();
            LoadDataTable();
        }

        /// <summary>
        /// check if member logged in a qualified admin or professor
        /// redirect if this is a student or anoynmous user
        /// </summary>
        void CheckMember()
        {
            //check signed in
            Member member = (Member) Session[WebConstant.User];
            if ( member == null || member.Role.Content != WebConstant.Professor)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }

            this.curMember = member;
        }

        /// <summary>
        /// Insert data into the table 
        /// student information table
        /// </summary>
        void LoadDataTable()
        {
            DataTable table = new DataTable();
            AddColumnToTable(table);

            DataRow row = table.NewRow();
           

            //bind data to grid view
            gridViewStudent.DataSource = table;
            gridViewStudent.DataBind();

        }

        /// <summary>
        /// simply add column to table to make code clean
        /// </summary>
        /// <param name="table"></param>
        void AddColumnToTable(DataTable table)
        {
            table.Columns.Add(NUMBER    , typeof(int));
            table.Columns.Add(FIRSTNAME , typeof(string));
            table.Columns.Add(LASTNAME  , typeof(string));
            table.Columns.Add(AGE       , typeof(int));
            table.Columns.Add(EMAIL     , typeof(string));
            table.Columns.Add(EDIT);
        }
    }
}