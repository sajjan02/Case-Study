using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using ClosedXML.Excel;
using ProductCatalogManagementMicroservice.Data; // Replace with your actual namespace
using ProductCatalogManagementMicroservice.Models; // Replace with your actual namespace
using System.Threading.Tasks;

namespace YourNamespace.Controllers // Replace with your actual namespace
{
    [Authorize(Roles = "Admin")]
    public class OrdersController : Controller
    {

        private readonly RetailManagement1Context _context;

        public OrdersController(RetailManagement1Context context)
        {
            _context = context;
        }

        public async Task<IActionResult> ExportToExcel()
        {
            var orders = await _context.Orders.ToListAsync();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Orders");

                // Adding Headers
                worksheet.Cell(1, 1).Value = "Order ID";
                worksheet.Cell(1, 2).Value = "User ID";
                worksheet.Cell(1, 3).Value = "Order Date";
                worksheet.Cell(1, 4).Value = "Total Amount";
                worksheet.Cell(1, 5).Value = "Status";

                // Adding Data
                var row = 2;
                foreach (var order in orders)
                {
                    worksheet.Cell(row, 1).Value = order.OrderId;
                    worksheet.Cell(row, 2).Value = order.UserId;
                    worksheet.Cell(row, 3).Value = order.OrderDate.HasValue ? order.OrderDate.Value.ToString("MM/dd/yyyy") : "N/A";
                    worksheet.Cell(row, 4).Value = order.TotalAmount.HasValue ? order.TotalAmount.Value.ToString("C") : "N/A";
                    worksheet.Cell(row, 5).Value = order.Status;
                    row++;
                }

                // Auto-fit columns for all data
                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    stream.Position = 0;
                    var fileName = "Orders.xlsx";
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                }
            }
        }

        [Authorize(Roles = "Admin")]
        // GET: Orders
        public async Task<IActionResult> Index()
        {
            return View(await _context.Orders.ToListAsync());
        }

        // GET: Orders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .FirstOrDefaultAsync(m => m.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

    
        // GET: Orders/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Orders/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UserId,OrderDate,TotalAmount,Status")] Order order)
        {
            if (ModelState.IsValid)
            {
                // Automatically increment OrderId
                var maxOrderId = await _context.Orders.MaxAsync(o => (int?)o.OrderId) ?? 0;
                order.OrderId = maxOrderId + 1;

                _context.Add(order);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(order);
        }

        // GET: Orders/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return View(order);
        }

        // POST: Orders/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("OrderId,UserId,OrderDate,TotalAmount,Status")] Order order)
        {
            if (id != order.OrderId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderExists(order.OrderId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(order);
        }

        // GET: Orders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .FirstOrDefaultAsync(m => m.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        // POST: Orders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
