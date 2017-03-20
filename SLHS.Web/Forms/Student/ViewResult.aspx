<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="ViewResult.aspx.cs" Inherits="SLHS.Web.Forms.Student.ViewResult" %>
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
						<h3>Student Information</h3>
						<div id="informationSidebar"></div>
					</section>
                </div>
                <!-- END Side bar -->
            </div>
            <div class="8u  12u(narrower) important(narrower)">
                <!-- Main stuff -->
                <div id="content">
                   
                    <!-- Quiz section -->
                    <div id="quiz" runat="server">
                        
                    </div>
                   
                    <asp:Button ID="Button1" runat="server" Text="Submit Answers" OnClick="ButtonSubmit_Click" />
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
