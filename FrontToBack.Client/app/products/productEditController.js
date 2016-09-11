(function () {
    "use strict";

    angular.module("productManagement").controller("ProductEditCtrl", function(productResource) {

        var vm = this;
            vm.product = {};
            vm.message = "";

        //using $resource
            productResource.get({ id: 5 },
                function(data) {
                    vm.product = data;
                    vm.originalProduct = angular.copy(data);
                });

            if (vm.product && vm.product.productId) {
                vm.title = "Edit: " + vm.product.productName;
            } else {
                vm.title = "New Product";
            }

            vm.submit = function() {
            };

            vm.cancel = function(editForm) {
                editForm.$setPristine();
                vm.product = angular.copy(vm.originalProduct);
                vm.message = "";
            }
        });
}());