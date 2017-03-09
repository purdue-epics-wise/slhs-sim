using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLHS.Web.Utils
{
   
    public class Credentials
    {
        public static SLHSDataContext SlHS_DB = new SLHSDataContext();
       
        public enum RegisterStatus
        {
            USERNAME_EXIST,
            EMAIL_EXIST,
            SUCCESS
        }

        public static Member Login(string username, string password)
        {
            Member member = null;
            IQueryable<Member> memberQuery;

            memberQuery = from mem in SlHS_DB.Members
                          where (mem.Username == username && mem.Password == password)
                          select mem;  
            

            if (memberQuery.Count<Member>() > 0)
            {
                member = memberQuery.First<Member>();
            }

            return member;
        }

        

    }
}