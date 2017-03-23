<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="TrainResult.aspx.cs" Inherits="SLHS.Web.Forms.Student.TrainResult" %>
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
						<div id="informationSidebar">
                            put student information here
						</div>
					</section>
                </div>
                <!-- END Side bar -->
            </div>
            <div class="8u  12u(narrower) important(narrower)">
                <!-- Main stuff -->
                <div id="content">
                   
                    <!-- Training Result section-->                  
                    <div id="trainResult" runat="server">
                        <!-- GridView:: display multiple trainings result-->
                       <asp:GridView ID="gridViewResult" runat="server" CellPadding="4" ForeColor="#333333" GridLines="None">
                            <AlternatingRowStyle BackColor="White" />
                            <EditRowStyle BackColor="#2461BF" />
                            <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                            <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                            <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                            <RowStyle BackColor="#EFF3FB" />
                            <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                            <SortedAscendingCellStyle BackColor="#F5F7FB" />
                            <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                            <SortedDescendingCellStyle BackColor="#E9EBEF" />
                            <SortedDescendingHeaderStyle BackColor="#4870BE" />
                        </asp:GridView>
                        <!-- END GridView section-->
                    </div>
                    <!-- END Training Result section-->

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
