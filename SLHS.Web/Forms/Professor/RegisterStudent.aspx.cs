using SLHS.Web.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SLHS.Web.Forms.Professor
{
    public partial class RegisterStudent : System.Web.UI.Page
    {
        private int i = 0;
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonSave_Click(object sender, EventArgs e)
        {
            //get name
            string lastName = TextBoxLastName.Text;
            string firstName = TextBoxFirstName.Text;

            //check integer
            int age;
            bool state = int.TryParse(TextBoxAge.Text, out age);
            if (state == false) return;

            //get email
            string email = TextBoxEmail.Text;

            //new information
            MemberInformation memInfo = new MemberInformation();
            memInfo.LastName = lastName;
            memInfo.FirstName = firstName;
            memInfo.Email = email;
            memInfo.Age = age;

            //register
            Credentials.RegisterStatus status = Credentials.Register(memInfo);
            if (status == Credentials.RegisterStatus.SUCCESS)
            {
                result.InnerText = "SUCCESS: Register student success";
            }
            else
            {
                result.InnerText = "FAIL: not register yet";
            }
        }


    }
}