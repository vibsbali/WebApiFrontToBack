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
            var product = repository.Retrieve().FirstOrDefault(p => p.ProductId == id);
            if (product == null)
            {
                return BadRequest();
            }

            return Ok(product);
        }

        // POST: api/Products
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Products/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
