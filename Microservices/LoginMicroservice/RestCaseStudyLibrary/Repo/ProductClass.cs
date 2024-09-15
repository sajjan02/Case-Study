using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Identity.Client;
using RestCaseStudyLibrary.Data;
using RestCaseStudyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestCaseStudyLibrary.Repo
{
    internal class ProductClass : IProduct
    {
        RetailManagement1Context _context;
        public ProductClass(RetailManagement1Context retailManagement1Context)
        {
            _context = retailManagement1Context;
        }
        
        public List<Product> GetAllProducts()
        {
            List<Product> list = _context.Products.ToList();
            return list;
        }

        public Product GetProductById(int id)
        {
            Product product = _context.Products.Where(u => u.ProductId == id).FirstOrDefault();
            return product;
        }

       
        public void AddProduct(Product product)
        {
            _context.Add(product);
            _context.SaveChangesAsync();
        }

        public void DeleteProductById(int id)
        {
            Product product = _context.Products.Find(id);
            _context.Remove(product);
            _context.SaveChangesAsync();
        }

        public void UpdateProduct(Product product)
        {
            Product exitCust = _context.Products.Find(product.ProductId);

            if (exitCust != null)
            {
                exitCust.ProductId = product.ProductId;
                exitCust.Name = product.Name;
                exitCust.Price = product.Price;
                exitCust.InventoryCount = product.InventoryCount;
                _context.SaveChanges();
                //throw new NotImplementedException();
            }
        }

       
    }
}

