"use strict";
(function () {
    angular.module("productManagement")
        .controller("MainController", [
            "userAccount", function (userAccount) {
                var vm = this;

                vm.isLoggedIn = false;
                vm.message = "";
                vm.userData = {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                };

                vm.registerUser = function () {
                    vm.userData.confirmPassword = vm.userData.password;

                    userAccount.registerUser(vm.userData, function (data) {
                            console.log(data);
                        vm.confirmPassword = "";
                        vm.message = ".... Registration successful";
                        vm.login();
                    }, function (response) {
                        console.log(response);
                        vm.message = response.statusText + "\r\n";

                        //Adding data annotation validation from web api
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }
                    }
                    );
                };

                vm.login = function () {

                };


            }
        ]);
}());
