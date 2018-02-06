using SLHS.Web.Helpers;
using SLHS.Web.Utils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Linq;
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

        //database connection
        private SLHSDataContext SLHS_DB = new SLHSDataContext();

        private int curStudentIndex;

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
            //create table
            DataTable table = new DataTable();
            AddColumnToTable(table);

            //query all students
            IQueryable<Member> query = from mem in SLHS_DB.Members
                                           where mem.RoleId == (int)Credentials.MemberRole.STUDENT
                                           select mem;

            Member[] students = query.ToArray();
            
            //add them to table
            curStudentIndex = 0;

            foreach (Member student in students)
            {
                AddRowToTable(table, student);
            }
           

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
            //table.Columns.Add(EDIT);
        }

        /// <summary>
        /// Used student information to add row to table
        /// </summary>
        /// <param name="table"></param>
        /// <param name="student"></param>
        void AddRowToTable(DataTable table, Member student)
        {
            //simple check
            if (student == null || table == null) return;

            //get information, since a member only has 1 information set
            MemberInformation infor = student.MemberInformations.FirstOrDefault();
            if (infor == null)
                return;

            //add new row
            DataRow row = table.NewRow();
            row[NUMBER] = curStudentIndex;
            row[FIRSTNAME] = infor.FirstName;
            row[LASTNAME] = infor.LastName;
            row[AGE] = infor.Age;
            row[EMAIL] = infor.Email;

            table.Rows.Add(row);

            //update pointer
            curStudentIndex++;
        }

        protected void RemoveStudentsDropDown_SelectedIndexChanged(object sender, EventArgs e)
        {
    
        }

        protected void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}