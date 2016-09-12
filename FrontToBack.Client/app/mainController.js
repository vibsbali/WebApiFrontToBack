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

                    userAccount.registration.registerUser(vm.userData, function (data) {
                            console.log(data);
                        vm.confirmPassword = "";
                        vm.message = ".... Registration successful";

                        //once registered call login method
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
                    });
                };

                vm.login = function () {
                    vm.userData.grant_type = "password";
                    vm.userData.userName = vm.userData.email;

                    userAccount.login.loginUser(vm.userData,
                        function (data) {
                            console.log(data);
                            vm.isLoggedIn = true;
                            vm.message = "";
                            vm.password = "";
                            vm.token = data.access_token;
                        },
                        function(response) {
                            vm.password = "";
                            vm.isLoggedIn = false;
                            vm.message = response.statusText + "\r\n";

                            //Following code handles cases when exception gets thrown from the web api
                            if (response.data.exceptionMessage) {
                                vm.message += response.data.exceptionMessage;
                            }

                            if (response.data.error) {
                                vm.message += response.data.error;
                            }
                        });
                };
            }
        ]);
}());
