"use strict";
(function () {
    angular.module("productManagement")
        .controller("MainController", [
            "userAccount", function(userAccount) {
                var vm = this;

                vm.isLoggedIn = false;
                vm.message = "";
                vm.userData = {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                };

                vm.registeredUser = function() {
                    
                }

                vm.login = function() {
                    
                }
            }
        ]);
}())