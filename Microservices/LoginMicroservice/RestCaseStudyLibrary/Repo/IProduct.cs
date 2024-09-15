using RestCaseStudyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestCaseStudyLibrary.Repo
{
    public interface IProduct
    {
        public List<Product> GetAllProducts();
        public Product GetProductById(int id);
        public void AddProduct(Product product);
        public void DeleteProductById(int id);
        public void UpdateProduct(Product product);
    }
}
