using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using Microsoft.EntityFrameworkCore;
using ProductCatalogManagementMicroservice.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<RetailManagement1Context>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("Constr")));

builder.Services.AddControllersWithViews();

// Add session management
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // session timeout setting
    options.Cookie.HttpOnly = true;
});

// Add authentication using cookies
builder.Services.AddAuthentication("AdminCookie")
    .AddCookie("AdminCookie", options =>
    {
        options.LoginPath = "/Admin/Login"; // Redirect to login if not authenticated
        options.AccessDeniedPath = "/Admin/AccessDenied"; // If access is denied
        options.Cookie.HttpOnly = true; // Ensure cookie security
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Require HTTPS for cookies
    });

builder.Services.AddAuthorization(); // Adds the default authorization services


var app = builder.Build();

// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//}
//app.UseStaticFiles();

//app.UseRouting();

//app.UseAuthorization();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Admin}/{action=Login}/{id?}");


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication(); // Enable authentication
app.UseAuthorization(); // Enable authorization
app.UseSession(); // Enable session management

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Admin}/{action=Login}/{id?}");
});

app.Run();
