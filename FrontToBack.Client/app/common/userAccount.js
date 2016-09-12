"use strict";

(function () {
    angular.module("common.services").factory("userAccount", [
        "$resource", "appSettings", function ($resource, appSettings) {

            //returns $resource object
            //We are customising $resource to create a new registerUser method
            return $resource(appSettings.serverPath + "/api/Account/Register", null,
                {
                    "registerUser": { method: "POST" }
                });
        }
    ]);
}())