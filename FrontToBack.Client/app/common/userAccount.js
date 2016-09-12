"use strict";

(function () {
    angular.module("common.services").factory("userAccount", [
        "$resource", "appSettings", function ($resource, appSettings) {

            //returns $resource object
            //We are customising $resource to create a new registerUser method
            //return $resource(appSettings.serverPath + "/api/Account/Register", null,
            //    {
            //        "registerUser": { method: "POST" }
            //    });

            //A more complex custom userAccount Service that exposes two custom Post methods for different Url addresses
            return{
                registration: $resource(appSettings.serverPath + "/api/Account/Register", null,
                {
                    "registerUser": {
                        method: "POST"
                    }
                }),
                login: $resource(appSettings.serverPath + "/Token", null,
                {
                    "loginUser" : {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        //following method will encode the properties to form-urlendoded as required by our Web Api
                        //If we do not follow following step then the values will be posted as json which will not work with our web api
                        transformRequest: function(data, headersGetter) {
                            var str = [];
                            for (var d in data) {
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join("&");
                        }
                    }
                })
            }
        }
    ]);
}())