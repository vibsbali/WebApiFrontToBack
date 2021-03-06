(function () {
    "use strict";
    angular
        .module("productManagement").controller("ProductListCtrl",["productResource", function(productResource) {
            var vm = this;

            vm.searchCriteria = "GDN";
            vm.searchCriteriaTwo = "Video";
            vm.sortProperty = "Price";
            vm.sortDirection = "desc";

            //query is get method and takes in a callback function
            //the object {search:vm.searchCriteria} will be added as query string
            //unhide following to test
            //productResource.query({ search: vm.searchCriteria }, function (data) {
            //    vm.products = data;
            //});

            productResource.query(
                //{ $skip:1, $top:3 },
                {
                    $filter: "substringof('".concat(vm.searchCriteria).concat("',ProductCode)")
                              .concat(" or substringof('".concat(vm.searchCriteriaTwo).concat("',ProductName)")),
                    $orderby: vm.sortProperty + " " + vm.sortDirection
                },
                function (data) {
                vm.products = data;
            });

            //hardcoded products
            //vm.products = [
            //{
            //    "productId": 1,
            //    "productName": "Leaf Rake",
            //    "productCode": "GDN-0011",
            //    "releaseDate": "March 19, 2009",
            //    "description": "Leaf rake with 48-inch wooden handle.",
            //    "price": 19.95
            //},
            //{
            //    "productId": 2,
            //    "productName": "Garden Cart",
            //    "productCode": "GDN-0023",
            //    "releaseDate": "March 18, 2010",
            //    "description": "15 gallon capacity rolling garden cart",
            //    "price": 32.99
            //},
            // {
            //     "productId": 5,
            //     "productName": "Hammer",
            //     "productCode": "TBX-0048",
            //     "releaseDate": "May 21, 2013",
            //     "description": "Curved claw steel hammer",
            //     "price": 8.99
            // },
            // {
            //     "productId": 8,
            //     "productName": "Saw",
            //     "productCode": "TBX-0022",
            //     "releaseDate": "May 15, 2009",
            //     "description": "15-inch steel blade hand saw",
            //     "price": 11.55
            // },
            // {
            //     "productId": 10,
            //     "productName": "Video Game Controller",
            //     "productCode": "GMG-0042",
            //     "releaseDate": "October 15, 2002",
            //     "description": "Standard two-button video game controller",
            //     "price": 35.95
            // }
            //];
        }]);
}());
