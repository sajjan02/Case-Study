using System.Data;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalogManagementMicroservice.Data;
using ProductCatalogManagementMicroservice.Models;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace ProductCatalogManagementMicroservice.Controllers
{
    [Authorize(Roles = "Admin")]
    public class DiscountsController : Controller
    {
        private readonly RetailManagement1Context _context;

        public DiscountsController(RetailManagement1Context context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        // GET: Discounts
        public async Task<IActionResult> Index()
        {
            return View(await _context.Discounts.ToListAsync());
        }

        // Add ExportToExcel method here
        public async Task<IActionResult> ExportToExcel()
        {
            var discounts = await _context.Discounts.ToListAsync();

            // Create a DataTable to store the data
            DataTable dt = new DataTable("Discounts");
            dt.Columns.AddRange(new DataColumn[]
            {
                new DataColumn("Code"),
                new DataColumn("Description"),
                new DataColumn("DiscountPercentage", typeof(double))
            });

            // Populate the DataTable with data from discounts
            foreach (var discount in discounts)
            {
                dt.Rows.Add(discount.Code, discount.Description, discount.DiscountPercentage);
            }

            // Create Excel file using ClosedXML
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(dt, "Discounts");

                // Prepare the Excel file as a downloadable stream
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DiscountsList.xlsx");
                }
            }
        }


        // Other action methods remain the same...

        // GET: Discounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var discount = await _context.Discounts
                .FirstOrDefaultAsync(m => m.DiscountId == id);
            if (discount == null)
            {
                return NotFound();
            }

            return View(discount);
        }

        // GET: Discounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Discounts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("DiscountId,Code,Description,DiscountPercentage")] Discount discount)
        {
            if (ModelState.IsValid)
            {
                var maxDiscountId = await _context.Discounts.MaxAsync(c => (int?)c.DiscountId) ?? 0;
                discount.DiscountId = maxDiscountId + 1;

                _context.Add(discount);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(discount);
        }

        // GET: Discounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var discount = await _context.Discounts.FindAsync(id);
            if (discount == null)
            {
                return NotFound();
            }
            return View(discount);
        }


        // POST: Discounts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("DiscountId,Code,Description,DiscountPercentage")] Discount discount)
        {
            if (id != discount.DiscountId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(discount);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DiscountExists(discount.DiscountId))
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
            return View(discount);
        }

        
        // GET: Discounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var discount = await _context.Discounts
                .FirstOrDefaultAsync(m => m.DiscountId == id);
            if (discount == null)
            {
                return NotFound();
            }

            return View(discount);
        }

        // POST: Discounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var discount = await _context.Discounts.FindAsync(id);
            if (discount != null)
            {
                _context.Discounts.Remove(discount);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DiscountExists(int id)
        {
            return _context.Discounts.Any(e => e.DiscountId == id);
        }
    }
}
