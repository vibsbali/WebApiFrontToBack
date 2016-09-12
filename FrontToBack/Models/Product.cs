using System;
using System.ComponentModel.DataAnnotations;

namespace FrontToBack.Models
{
    public class Product
    {

        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductCode { get; set; }
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Product Name is required", AllowEmptyStrings = false)]
        [MinLength(4, ErrorMessage = "Product Name min length is 5 character")]
        [MaxLength(12, ErrorMessage = "Product Name max length is 12 character")]
        public string ProductName { get; set; }

        public DateTime ReleaseDate { get; set; }

        public override string ToString()
        {
            return $"Product Name {ProductName} Product Code {ProductCode}";
        }
    }
}