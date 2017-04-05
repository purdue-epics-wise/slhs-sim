<%@ Page Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="Tour.aspx.cs" Inherits="SLHS.Web.Forms.Student.Tour" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContentPlaceHolder1" runat="server">


	<section class="wrapper style2">
		<div class="container">
			<header class="major">
                <asp:Label ID="Label1" runat="server"></asp:Label>
				<h2>What is Peabody Picture Vocabulary Test</h2>
				<p>The Peabody Picture Vocabulary Test, the 2007 edition of which is known as the PPVT-IV, is an untimed test of receptive vocabulary for Standard American English and is intended to provide a quick estimate of verbal ability and scholastic aptitude. It was developed in 1959 by special education specialists Lloyd M. Dunn and Leota M. Dunn. The current version lists L.M. Dunn and his son D.M. Dunn as authors.</p>
			</header>
		</div>
	</section>

    <section class="wrapper style2">
		<div class="container">
			<header class="major">
                <asp:Label ID="Label2" runat="server"></asp:Label>
				<h2>What you will do in here</h2>
				<p>By providing a learning web-paged program for SLHS students, we believe that we can train students to become test proctor for students who needs to be evaluated. This would significantly reduce the amount of time necessary to train each student. This program would at student's pace and does not require for student to be on site. All you need is you and your computer.</p>
                <img src="../../assets/images/TrainingScreenshot.PNG" />
                <img src="../../assets/images/TrainResultScreenshot.PNG" />
			</header>
		</div>
	</section>

    <section class="wrapper style2">
		<div class="container">
			<asp:Button ID="Button1" runat="server" Text="Start Training Now" OnClick="StartTraining_Click" />
		</div>
	</section>




</asp:Content>

