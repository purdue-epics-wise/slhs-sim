<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="RegisterStudent.aspx.cs" Inherits="SLHS.Web.Forms.Professor.RegisterStudent" %>
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
                <!-- First Name -->
                <div id="content">
                    <asp:Table ID="Table1" runat="server">
                        <asp:TableRow>
                            <asp:TableCell>Student First Name</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextName" runat="server"></asp:TextBox></asp:TableCell>
                        </asp:TableRow>
                    </asp:Table>
                </div>
                <!-- END First Name -->
                <!-- Last Name -->
                <div id="content">
                    <asp:Table ID="Table2" runat="server">
                        <asp:TableRow>
                            <asp:TableCell>Student Last Name</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox></asp:TableCell>
                        </asp:TableRow>
                    </asp:Table>
                </div>
                <!-- END Last name -->
                <!-- ID -->
                <div id="content">
                    <asp:Table ID="Table3" runat="server">
                        <asp:TableRow>
                            <asp:TableCell>Student ID</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox></asp:TableCell>
                        </asp:TableRow>
                    </asp:Table>
                </div>
                <!-- END ID -->
            </div>
        </div>
    </div>
</section>
 
</asp:Content>
