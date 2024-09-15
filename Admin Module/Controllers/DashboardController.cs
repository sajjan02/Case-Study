using Microsoft.AspNetCore.Mvc;
using ProductCatalogManagementMicroservice.Data;

public class DashboardController : Controller
{
    private readonly RetailManagement1Context _context;

    public DashboardController(RetailManagement1Context context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        // Query the database for totals
        var totalOrders = _context.Orders.Count();
        var totalProducts = _context.Products.Count();
        var totalCategories = _context.Categories.Count();

        // Pass the data to the view
        ViewBag.TotalOrders = totalOrders;
        ViewBag.TotalProducts = totalProducts;
        ViewBag.TotalCategories = totalCategories;

        return View();
    }
}
