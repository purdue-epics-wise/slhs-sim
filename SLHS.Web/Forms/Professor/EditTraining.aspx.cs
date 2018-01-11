using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Diagnostics;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Configuration;

namespace SLHS.Web.Forms.Professor
{
    public partial class EditTraining : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public int countRows()
        {
            string stmt = "SELECT COUNT(*) FROM dbo.Trains";
            int count = 0;

            using (SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLHS_DBConnectionString"].ConnectionString))
            {
                using (SqlCommand cmdCount = new SqlCommand(stmt, thisConnection))
                {
                    thisConnection.Open();
                    count = (int)cmdCount.ExecuteScalar();
                }
            }
            return count;
        }

        protected void convertToBinaryStream()
        {
            using (BinaryReader br = new BinaryReader(FileUploadControl.PostedFile.InputStream))
            {
                byte[] bytes = br.ReadBytes((int)FileUploadControl.PostedFile.InputStream.Length);
                string strConnString = ConfigurationManager.ConnectionStrings["SLHS_DBConnectionString"].ConnectionString;
                int count = countRows();
                using (SqlConnection con = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.CommandText = "insert into Trains(Name, Data) values (@Name, @Data)";
                        cmd.Parameters.AddWithValue("@Name", "Training " + (count + 1).ToString());
                        cmd.Parameters.AddWithValue("@Data", bytes);
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                }
            }
        }

        protected void UploadButton_Click(object sender, EventArgs e)
        {
            if (FileUploadControl.HasFile)
            {
                try
                {
                    string filename = Path.GetFileName(FileUploadControl.FileName);
                    if(Path.GetExtension(filename) == ".webm")
                    {
                        convertToBinaryStream();
                        
                        StatusLabel.Text = "Upload status: File uploaded!";
                    }
                    else
                    {
                        StatusLabel.Text = "Upload status: The file could not be uploaded. The following error occured: File needs to be in .webm format";                       
                    }
                    FileUploadControl.SaveAs(Server.MapPath("~/") + filename);
                }
                catch (Exception ex)
                {
                    StatusLabel.Text = "Upload status: The file could not be uploaded. The following error occured: " + ex.Message;
                }
            }
        }

    }
}