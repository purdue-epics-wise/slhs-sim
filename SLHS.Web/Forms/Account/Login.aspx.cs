using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using SLHS.Web.Utils;

namespace SLHS.Web.Forms.Account
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void Login1_Authenticate(object sender, AuthenticateEventArgs e)
        {
            string username = Login1.UserName;
            string password = Login1.Password;

            Member member = Credentials.Login(username, password);
            if (member == null)
            {
                e.Authenticated = false;
                return;
            }
            e.Authenticated = true;
            Session["UserRole"] = member.getRole().Content;
            Response.Redirect("/Forms/Public/");
        }
    }
}