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
            SUCCESS,
            ERROR
        }

        public enum MemberRole
        {
            PROFESSOR = 1,
            STUDENT = 2
        }


        /// <summary>
        /// Login() find a member with given username and password
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns>
        ///     a Member type if found
        ///     null if not
        /// </returns>
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

      
        /// <summary>
        /// Register() insert data of a new student into the database
        /// only works for a student
        /// </summary>
        /// <param name="member"></param>
        /// <returns></returns>
        public static RegisterStatus Register(Member member)
        {
            //check null
            if (member == null)
            {
                return RegisterStatus.ERROR;
            }

            //check if email exist
            IQueryable<Member> memberQuery;
            memberQuery = from mem in SlHS_DB.Members
                          where (mem.Email == member.Email)
                          select mem;

            if (memberQuery.Count() > 0)
                return RegisterStatus.EMAIL_EXIST;

            //create random username, password


            return RegisterStatus.SUCCESS;
        }


    }
}