using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class KelasehUpdate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kelasehnamehha_Users_UserId",
                table: "Kelasehnamehha");

            migrationBuilder.AddForeignKey(
                name: "FK_Kelasehnamehha_Users_UserId",
                table: "Kelasehnamehha",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kelasehnamehha_Users_UserId",
                table: "Kelasehnamehha");

            migrationBuilder.AddForeignKey(
                name: "FK_Kelasehnamehha_Users_UserId",
                table: "Kelasehnamehha",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
