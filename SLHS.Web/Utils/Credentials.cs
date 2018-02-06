using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;

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
            //query member
            Member member = null;
            IQueryable<Member> memberQuery;

            memberQuery = from mem in SlHS_DB.Members
                          where (mem.Username == username && mem.Password == password)
                          select mem;


            if (memberQuery.Count<Member>() > 0)
            {
                member = memberQuery.First<Member>();
            }

            //update datetime
            member.LastLoginDate = DateTime.Now;
            SlHS_DB.SubmitChanges();

            //return
            return member;
        }

      
        /// <summary>
        /// Register() insert data of a new student into the database
        /// only works for a student
        /// </summary>
        /// <param name="member"></param>
        /// <returns></returns>
        public static RegisterStatus Register(MemberInformation memberInformation)
        {
            //check null
            if (memberInformation == null)
            {
                return RegisterStatus.ERROR;
            }

            //check if email exist
            IQueryable<Member> memberQuery;
            memberQuery = from mem in SlHS_DB.Members
                          where (mem.Email == memberInformation.Email)
                          select mem;

            if (memberQuery.Count() > 0)
                return RegisterStatus.EMAIL_EXIST;

            //create new member
            Member member = new Member();

            //add connection to information
            member.MemberInformations.Add(memberInformation);

            //create random password
            int passwordLength = 8;
            int numNonAlphaChar = 3;
            string randPass = 
                System.Web.Security.Membership.GeneratePassword(passwordLength, numNonAlphaChar);

            //random username
            Member lastMem = SlHS_DB.Members.ToArray().LastOrDefault();
            int nextID = 1;
            if (lastMem != null)
            {
                nextID = lastMem.Id + 1;
            }

            string randUsername = "member" + nextID;

            //for debugging, write to output
            System.Diagnostics.Debug.WriteLine("username: " + randUsername);
            System.Diagnostics.Debug.WriteLine("password: " + randPass);

            //insert to database, table Credentials, and MemberInformations
            member.LastLoginDate = null;
            member.Username = randUsername;
            member.Password = randPass;
            member.CreatedDate = DateTime.Now;
            member.Email = memberInformation.Email;
            member.RoleId = (int) Credentials.MemberRole.STUDENT;

            //final call
            SlHS_DB.Members.InsertOnSubmit(member);
            SlHS_DB.SubmitChanges();

            //sends mail
            string username = member.Username;
            string pwd = member.Password;
            string messageBody = string.Format("Your username is {0} and your password is {1}", username, pwd);

            System.Net.Mail.MailMessage message = new System.Net.Mail.MailMessage(//creates a message with these inputs
            "slhspurdueepics@gmail.com",                 //from
            member.Email,                                //to
            "Your SLHS Credentials",                     //sub
            messageBody);                                //body

            message.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address

            //Credentials for the SLHS dummy gmail I set up 
            smtp.Credentials = new System.Net.NetworkCredential("slhspurdueepics@gmail.com", "NarutoIsBad");
            smtp.Port = 587;

            //Or your Smtp Email ID and Password
            smtp.EnableSsl = true;
            smtp.Send(message);

            //mail.To.Add(TextBoxEmail.Text);
            //mail.From = "pchang1996@gmail.com";

            return RegisterStatus.SUCCESS;
        }


    }
}