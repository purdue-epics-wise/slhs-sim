<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="Training.aspx.cs" Inherits="SLHS.Web.Forms.Student.Training" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <link rel="stylesheet" href="/Forms/Content/css/Training.css" />
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
                   <video id="video" width="640" height="480" controls="controls">
                        <source src="/assets/video/video1.mp4" type="video/mp4"/>
                        Your browser does not support.
                    </video>

                    <!-- Quiz section -->
                    <div id="quiz" runat="server">
                        
                    </div>
                   
                    <asp:Button ID="Button1" runat="server" Text="Button" OnClick="ButtonSubmit_Click" />
                    <!-- END Quiz section -->

                    <!--Error/Result section-->
                    <div id="result" runat="server">
                       
                    </div>
                    <!-- END Error/Result section-->

                </div>
                <!-- END main stuff -->
            </div>
        </div>
    </div>
</section>
</asp:Content>
