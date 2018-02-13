<%@ Page Title="" Language="C#" MasterPageFile="~/Shared/SLHS.Master" AutoEventWireup="true" CodeBehind="ViewData.aspx.cs" Inherits="SLHS.Web.Forms.Professor.ViewData" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContentPlaceHolder1" runat="server">
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:SLHS_DBConnectionString2 %>" SelectCommand="SELECT [MemberId], [FirstName] + ' ' + [LastName] as MemberName FROM [MemberInformations]"></asp:SqlDataSource>
    <section class="wrapper style1">
        <div class="container">
            <div class="row 200%">
                <div class="4u 12u(narrower)">
                    <!-- Side bar -->
                    <div id="sidebar">
                        <section>
						    <h3>View student data</h3>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div id="content">

                        <!-- Result section -->
                        <div id="result" runat="server">

                            Remove Students:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <asp:DropDownList ID="RemoveStudentsDropDown" runat="server" Height="40px" OnSelectedIndexChanged="RemoveStudentsDropDown_SelectedIndexChanged" Width="204px" DataSourceID="SqlDataSource1" DataTextField="MemberName" DataValueField="MemberId">
                    <asp:ListItem Value="1">Test1</asp:ListItem>
                    <asp:ListItem Value="2">Test2</asp:ListItem>
                    <asp:ListItem Value="3">Test3</asp:ListItem>
                </asp:DropDownList>
                            <asp:Button ID="Button1" runat="server" Text="Remove" />
                            <br />

                        </div>
                        <!-- END Result section -->


                        <!-- Grid View section -->
                        <asp:GridView ID="gridViewStudent" runat="server" CellPadding="4" ForeColor="#333333"
                            emptydatatext="There are no data to display">
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
                            <SortedDescendingHeaderStyle BackColor="#4870BE" BorderStyle="Outset" />


                            
                        </asp:GridView>
                       
                        <!-- END Grid section -->
                    </div>
                    <!-- END main stuff -->
                </div>
               
            </div>
        </div>
    </section>
</asp:Content>