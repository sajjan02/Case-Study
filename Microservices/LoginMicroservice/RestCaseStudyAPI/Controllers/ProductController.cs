using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestCaseStudyLibrary.Models;
using RestCaseStudyLibrary.Repo;

namespace RestCaseStudyAPI.Controllers
{
    
        [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class ProductController : ControllerBase
        {
            private readonly IProduct product;

            public ProductController(IProduct iu)
            {
                product = iu;
                // GET: api/<UserController>
            }

            // GET: api/<UserController>
            [HttpGet]
            public List<Product> Get()
            {
                return product.GetAllProducts();
            }

            // GET api/<UserController>/5
            [HttpGet("{id}")]
            public Product Get(int id)
            {
                return product.GetProductById(id);
            }

            // POST api/<UserController>
            [HttpPost]
            public void Post(Product value) => product.AddProduct(value);

            // PUT api/<UserController>/5
            [HttpPut("{id}")]
            public void Put(int id, [FromBody] Product value) => product.UpdateProduct(value);

            // DELETE api/<UserController>/5
            [HttpDelete("{id}")]
            public void Delete(int id) => product.DeleteProductById(id);
        }
    }

