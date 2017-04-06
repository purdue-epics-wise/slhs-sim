using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SLHS.Web.Forms.Professor
{
    public partial class EditTraining : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LoadResult();
        }

        void LoadResult()
        {
            test10.InnerText = "hello";
        }
    }
}