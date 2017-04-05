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
    public partial class Tour : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //check signed in
            if (Session[WebConstant.User] == null)
            {
                Response.Redirect(WebConstant.PublicDefaultUrl, true);
            }
        }

        protected void StartTraining_Click(object sender, EventArgs e)
        {
            Response.Redirect(WebConstant.TrainingUrl);
        }
    }
}