using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class KelasehUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Kelasehnamehha",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Kelasehnamehha_UserId",
                table: "Kelasehnamehha",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kelasehnamehha_Users_UserId",
                table: "Kelasehnamehha",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kelasehnamehha_Users_UserId",
                table: "Kelasehnamehha");

            migrationBuilder.DropIndex(
                name: "IX_Kelasehnamehha_UserId",
                table: "Kelasehnamehha");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Kelasehnamehha");
        }
    }
}
