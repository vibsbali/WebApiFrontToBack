﻿using FrontToBack.Models;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Linq;

namespace FrontToBack.Controllers
{
    [EnableCors("http://localhost:9640", "*", "*")]
    public class ProductsController : ApiController
    {
        private ProductRepository repository = new ProductRepository();

        // GET: api/Products
        public IHttpActionResult Get()
        {
            return Ok(repository.Retrieve());
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
        public string Get(int id)
        {
            return "value";
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
