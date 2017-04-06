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
                            <asp:TableCell> <asp:TextBox ID="TextBoxFirstName" runat="server"></asp:TextBox></asp:TableCell>
                            <asp:TableCell><asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="Required" ControlToValidate="TextBoxFirstName"></asp:RequiredFieldValidator></asp:TableCell>
                            </asp:TableRow>

                            <asp:TableRow>
                            <asp:TableCell>Student Last Name</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxLastName" runat="server"></asp:TextBox></asp:TableCell>
                            <asp:TableCell><asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ErrorMessage="Required" ControlToValidate="TextBoxLastName"></asp:RequiredFieldValidator></asp:TableCell>
                            </asp:TableRow>


                            <asp:TableRow>
                            <asp:TableCell>Age</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxAge" runat="server"></asp:TextBox></asp:TableCell>
                            <asp:TableCell>
                                <asp:RangeValidator ID="RangeValidator1" runat="server" ErrorMessage="RangeValidator" Type="Integer" MaximumValue="100" MinimumValue="10" ControlToValidate="TextBoxAge"></asp:RangeValidator></asp:TableCell>
                            </asp:TableRow>

                            <asp:TableRow>
                            <asp:TableCell>E-mail</asp:TableCell>
                            <asp:TableCell> <asp:TextBox ID="TextBoxEmail" runat="server"></asp:TextBox></asp:TableCell>
                            <asp:TableCell><asp:RegularExpressionValidator ID="regexEmailValid" runat="server" ValidationExpression="\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="TextBoxEmail" ErrorMessage="Invalid Email Format"></asp:RegularExpressionValidator></asp:TableCell>
                            </asp:TableRow>
                       
                    </asp:Table>

                    <!-- Save Button-->
                    <asp:Button ID="ButtonSave" runat="server" Text="Add new student" OnClick="ButtonSave_Click" />

                    <!-- End Button-->

                    <!-- Result Section -->
                    <div id="result" runat="server">

                    </div>
                    <!-- End result Section -->
                </div>
                




            
                


            </div>
        </div>
    </div>
</section>
 
</asp:Content>
