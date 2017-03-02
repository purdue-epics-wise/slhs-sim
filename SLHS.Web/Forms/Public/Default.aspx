<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SLHS.Web.Forms.Public.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContentPlaceHolder1" runat="server">

<section class="wrapper style1">
		<div class="container">
			<div class="row 200%">
				<section class="4u 12u(narrower)">
					<div class="box highlight">
						<i class="icon major fa-paper-plane"></i>
						<h3>Speech</h3>
						<p>The expression of or the ability to express thoughts and feelings by articulate sounds.</p>
					</div>
				</section>
				<section class="4u 12u(narrower)">
					<div class="box highlight">
						<i class="icon major fa-pencil"></i>
						<h3>Language</h3>
						<p>The method of human communication, either spoken or written, consisting of the use of words in a structured and conventional way.</p>
					</div>
				</section>
				<section class="4u 12u(narrower)">
					<div class="box highlight">
s						<i class="icon major fa-wrench"></i>
						<h3>Hearing</h3>
						<p>The faculty of perceiving sounds.</p>
					</div>
				</section>
			</div>
		</div>
	</section>

<!-- Gigantic Heading -->
	<section class="wrapper style2">
		<div class="container">
			<header class="major">
                <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
				<h2>Peabody Picture Vocabulary Test</h2>
				<p>The Peabody Picture Vocabulary Test, the 2007 edition of which is known as the PPVT-IV, is an untimed test of receptive vocabulary for Standard American English and is intended to provide a quick estimate of verbal ability and scholastic aptitude. It was developed in 1959 by special education specialists Lloyd M. Dunn and Leota M. Dunn. The current version lists L.M. Dunn and his son D.M. Dunn as authors.</p>
			</header>
		</div>
	</section>

<!-- Posts -->
	<section class="wrapper style1">
		<div class="container">
			<div class="row">
				<section class="6u 12u(narrower)">
					<div class="box post">
						<a href="#" class="image left"><img src="/assets/images/pic01.jpg" alt="" /></a>
						<div class="inner">
							<h3>Procedure</h3>
							<p>The test is given verbally and takes from twenty to thirty minutes to complete. No reading is required by the individual, and scoring is rapid. For its administration, the examiner presents a series of pictures to each person. There are four pictures to a page, and each is numbered. The examiner speaks a word describing one of the pictures and asks the individual to point to or say the number of the picture that the word describes. Item responses can also be made by multiple choice selection depending on the age of the person being tested. The total score can be converted to a percentile rank, mental age, or a standard deviation IQ score.</p>
						</div>
					</div>
				</section>
				<section class="6u 12u(narrower)">
					<div class="box post">
						<a href="#" class="image left"><img src="/assets/images/pic02.jpg" alt="" /></a>
						<div class="inner">
							<h3>Clinical Use</h3>
							<p>The PPVT-IV provides an estimate of the client's verbal intelligence and has been administered to groups who had reading or speech problems, had intellectual disability, or were emotionally withdrawn. Studies of earlier versions of the test suggested that it tended to underestimate full-scale IQ scores for both intellectually disabled and gifted test-takers. Because the manner of the individual's response to stimulus vocabulary is to point in any fashion to one of four pictures that best fits the stimulus work, these tests also apply to rehabilitation of individuals who have multiple physical impairments, but whose hearing and vision are intact. </p>
						</div>
					</div>
				</section>
			</div>
						
		</div>
	</section>


</asp:Content>
