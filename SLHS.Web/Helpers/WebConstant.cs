using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLHS.Web.Helpers
{

    /// <summary>
    /// Some useful constants that can help reduce typing all
    /// these things again.
    /// </summary>
    public static class WebConstant
    {
        
        public const string User = "User";
        public const string Professor = "Professor";
        public const string UserRole = "UserRole";
        public const string TrainID = "trainID";

        public const string PublicDefaultUrl = "/Forms/Public/Default.aspx";
        public const string ViewResultUrl = "/Forms/Student/ViewResult.aspx";
        public const string TrainingUrl = "/Forms/Student/Training.aspx?trainID=1";
        public const string TourUrl = "/Forms/Student/Tour.aspx";
    }
}