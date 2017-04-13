<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="ViewResult.aspx.cs" Inherits="SLHS.Web.Forms.Student.ViewResult" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- Some CSS to make questions look pretty-->
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
						<h3>Student Information</h3>
						<div id="informationSidebar"></div>
					</section>
                </div>
                <!-- END Side bar -->
            </div>
            <div class="8u  12u(narrower) important(narrower)">
                <!-- Main stuff -->
                <div id="content">
                   <!-- Video section -->
                    <video id="video" width="640" height="480" controls="controls" runat="server">
                        <%--<source src="/assets/video/video1.mp4" type="video/mp4"/>--%>
                      
                        Your browser does not support.
                    </video>
                    <!-- END Video section -->

                    <!-- Score section -->
                    <div id="score" runat="server">
                       
                    </div>
                    <!-- END Score section-->

                    <!-- Quiz section -->
                    <div id="quiz" runat="server">
                        
                    </div>
                   
                   
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
