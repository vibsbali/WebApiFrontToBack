using FrontToBack.Models;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
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
        [ResponseType(typeof(Product))]
        //We use response type so that Web Api shows proper documentation
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(repository.Retrieve().AsQueryable());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        public IHttpActionResult Get(string search)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(search))
                {
                    return Get();
                }

                return Ok(repository.Retrieve().Where(p => p.ProductCode.Contains(search)));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // GET: api/Products/5
        public IHttpActionResult Get(int id)
        {
            try
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
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // POST: api/Products
        public IHttpActionResult Post(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newProduct = repository.Save(product);
                    return Created(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
                }

                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, Product product)
        {
            try
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
            catch (Exception e)
            {
                return InternalServerError(e);
            }
            
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
