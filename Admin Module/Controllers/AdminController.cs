using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogManagementMicroservice.Data;
using ProductCatalogManagementMicroservice.Models;
using System.Security.Claims;
using System.Threading.Tasks;

public class AdminController : Controller
{
    private readonly RetailManagement1Context _context;

    public AdminController(RetailManagement1Context context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(Admin admin)
    {
        if (ModelState.IsValid)
        {
            var validAdmin = _context.Admins
                .FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password);

            if (validAdmin != null)
            {
                // Create the identity and the claims
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, validAdmin.Username),
                    new Claim(ClaimTypes.Role, "Admin") // Set the role to Admin
                };

                var claimsIdentity = new ClaimsIdentity(claims, "AdminCookie");

                // Sign in the user with the created identity
                await HttpContext.SignInAsync("AdminCookie", new ClaimsPrincipal(claimsIdentity));

                TempData["Message"] = "Login successful!";
                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                ViewBag.ErrorMessage = "Invalid credentials. Please try again.";
            }
        }

        return View(admin);
    }

    // Log out logic
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("AdminCookie");
        return RedirectToAction("Login");
    }
}
