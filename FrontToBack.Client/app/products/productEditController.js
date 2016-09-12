(function () {
    "use strict";

    angular.module("productManagement").controller("ProductEditCtrl", function(productResource) {

        var vm = this;
            vm.product = {};
            vm.message = "";

        //using $resource
            productResource.get({ id: 4 },
                function(data) {
                    vm.product = data;
                    vm.originalProduct = angular.copy(data);
                }, function(response) {
                    vm.message = response.statusText + "\r\n";
                    //Following code handles cases when exception gets thrown from the web api
                    if (response.data.exceptionMessage) {
                        vm.message += response.data.exceptionMessage;
                    }
                });

            if (vm.product && vm.product.productId) {
                vm.title = "Edit: " + vm.product.productName;
            } else {
                vm.title = "New Product";
            }

            vm.submit = function () {
                vm.message = "";
                if (vm.product.productId) {
                    vm.product.$update({
                        id: vm.product.productId
                    }, function (data) {
                        console.log(data);
                        vm.message = "... Save Complete";
                    }, function(response) {
                        vm.message = response.statusText + "\r\n";
                        //Following code handles cases when exception gets thrown from the web api
                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    });
                } else {
                    vm.product.$save(function(data) {
                        console.log(data);
                        vm.originalProduct = angular.copy(data);
                        vm.message = "... Save complete";
                    }, function(response) {
                        vm.message = response.statusText + "\r\n";
                        //Following code handles cases when exception gets thrown from the web api
                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    });
                }
            };

            vm.cancel = function(editForm) {
                editForm.$setPristine();
                vm.product = angular.copy(vm.originalProduct);
                vm.message = "";
            }
        });
}());