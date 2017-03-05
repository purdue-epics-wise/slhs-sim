<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="Training.aspx.cs" Inherits="SLHS.Web.Forms.Student.Training" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContentPlaceHolder1" runat="server">


    <section class="wrapper style1">
    <div class="container">
        <div class="row 200%">
            <div class="4u 12u(narrower)">
                <!-- Side bar -->
                <div id="sidebar">
                    <section>
						<h3>SLHS login system</h3>
						<p>Develop by team of Purdue students</p>
						<footer>
							<a href="#" class="button">Continue Reading</a>
						</footer>
					</section>
                </div>
                <!-- END Side bar -->
            </div>
            <div class="8u  12u(narrower) important(narrower)">
                <!-- Main stuff -->
                <div id="content">
                   <video id="video" width="640" height="480" controls>
                        <source src="/assets/video/video1.mp4" type="video/mp4"/>
                        Your browser does not support.
                    </video>
                    <div id="quiz">
                        <h3>quizzes</h3>
                        <br/>
                        <p>1. This is an example quiz question</p>
            
                            <input type="radio" name="gender" value="male"/> Male<br/>
                            <input type="radio" name="gender" value="female"/> Female<br/>
                            <input type="radio" name="gender" value="other"/> Other
           
                        <br/>
                        <p>2. This is an example quiz question</p>
           
                            <input type="radio" name="gender" value="male"/> Male<br/>
                            <input type="radio" name="gender" value="female"/> Female<br/>
                            <input type="radio" name="gender" value="other"/> Other
           
                        <br/>
                        <p>3. This is an example quiz question</p>
           
                            <input type="radio" name="gender" value="male"/> Male<br/>
                            <input type="radio" name="gender" value="female"/> Female<br/>
                            <input type="radio" name="gender" value="other"/> Other
           
           
                    </div>

                </div>
                <!-- END main stuff -->
            </div>
        </div>
    </div>
</section>
</asp:Content>
