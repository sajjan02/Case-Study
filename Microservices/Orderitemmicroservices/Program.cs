using Microsoft.EntityFrameworkCore;
using Orderitemmicroservices.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RetailManagementContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Constr")));



builder.Services.AddCors(options => options.AddPolicy("policy", builder =>
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("policy");

app.UseAuthorization();

app.MapControllers();

app.Run();
