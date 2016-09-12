using FrontToBack.Models;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.OData;


namespace FrontToBack.Controllers
{
    [EnableCors("http://localhost:9640", "*", "*")]
    public class ProductsController : ApiController
    {
        private ProductRepository repository = new ProductRepository();

        // GET: api/Products
        [EnableQuery()]
        //We can add constraints to EnableQuery for security
        public IHttpActionResult Get()
        {
            return Ok(repository.Retrieve().AsQueryable());
        }

        public IHttpActionResult Get(string search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                return Get();
            }

            return Ok(repository.Retrieve().Where(p => p.ProductCode.Contains(search)));
        }

        // GET: api/Products/5
        public IHttpActionResult Get(int id)
        {
            //We create a new product if id == 0
            if (id == 0)
            {
                return Ok(repository.Create());
            }

            var product = repository.Retrieve().FirstOrDefault(p => p.ProductId == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: api/Products
        public IHttpActionResult Post(Product product)
        {
            if (ModelState.IsValid)
            {
                var newProduct = repository.Save(product);
                return Created(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
            }

            return BadRequest(ModelState);
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, Product product)
        {
            if (ModelState.IsValid)
            {
                var updatedProduct = repository.Save(id, product);
                if (updatedProduct == null)
                {
                    return BadRequest();
                }

                return Ok(updatedProduct);
            }

            return BadRequest(ModelState);
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
