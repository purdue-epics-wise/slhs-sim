<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="RegisterStudent.aspx.cs" Inherits="SLHS.Web.Forms.Professor.RegisterStudent" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


<style>
    table, th, td {
        border: 1px solid black;
    }
</style>
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
<!-- First Name -->
                <div id="content">
                    <h3>Please Enter student's Information</h3>
                    <asp:Table ID="StudentInfo" runat="server">
                            
                            <asp:TableRow>
                            <asp:TableCell>Student First Name</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextFirstNm" runat="server"></asp:TextBox></asp:TableCell>
                            </asp:TableRow>

                            <asp:TableRow>
                            <asp:TableCell>Student Last Name</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxLastNm" runat="server"></asp:TextBox></asp:TableCell>
                            </asp:TableRow>

                            <asp:TableRow>
                            <asp:TableCell>Student ID</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxID" runat="server"></asp:TextBox></asp:TableCell>
                            </asp:TableRow>

                            <asp:TableRow>
                            <asp:TableCell>Age</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxAge" runat="server"></asp:TextBox></asp:TableCell>
                            </asp:TableRow>
                            <asp:TableRow>
                            <asp:TableCell>E-mail</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxEmail" runat="server"></asp:TextBox></asp:TableCell>
                            </asp:TableRow>
                       
                    </asp:Table>
                </div>
                




                <br />
<!-- Save Button-->
                <asp:Button ID="ButtonSave" runat="server" Text="Save" />

                <!-- End Button-->


            </div>
        </div>
    </div>
</section>
 
</asp:Content>
