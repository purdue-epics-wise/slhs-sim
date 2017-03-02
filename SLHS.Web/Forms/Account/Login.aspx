<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="SLHS.Web.Forms.Account.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="BodyContentPlaceHolder1" runat="server">

    <!-- Main -->
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
                    <asp:Login ID="Login1" runat="server" OnAuthenticate="Login1_Authenticate">
                    </asp:Login>

                </div>
                <!-- END main stuff -->
            </div>
        </div>
    </div>
</section>

<!-- END Main -->
</asp:Content>
