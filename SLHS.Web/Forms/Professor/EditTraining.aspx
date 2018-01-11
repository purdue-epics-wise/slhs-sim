<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="EditTraining.aspx.cs" Inherits="SLHS.Web.Forms.Professor.EditTraining" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContentPlaceHolder1" runat="server">

     <section class="wrapper style1">
    <div class="container">
        <div class="row 200%">
            <div class="4u 12u(narrower)">
                <!-- Content -->
                <div id="content">
                    <section>
						<h3>Edit Training</h3>
                    </section>
                </div>
            </div>
        </div>
    </div>
    
    <asp:FileUpload id="FileUploadControl" runat="server" />
    <asp:Button runat="server" id="UploadButton" text="Upload" onclick="UploadButton_Click" />
    <br /><br />
    <asp:Label runat="server" id="StatusLabel" text="Upload status: " />
    
    <div>
		<div class="row 200%">
            <div class="4u 12u(narrower)">
                <!-- Content -->
                <div id="content2">
                    <section>		
                        <footer>Develop by team of Purdue students
                            <a href="#" class="button">+</a>
                        </footer>
					</section>

                </div>
                <!-- END CONTENT -->
            </div>
        </div>
    </div>
    </section>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolderScript" runat="server">
</asp:Content>

