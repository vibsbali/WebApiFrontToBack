"use strict";

(function() {
    angular.module("common.services").factory("productResource", [
        "$resource", "appSettings", "currentUser", function ($resource, appSettings, currentUser) {
            //returns $resource object
            //The parameters are url with id as optional
            return $resource(appSettings.serverPath + "/api/products/:id", null,
                {
                    "get" : {
                        headers: { "Authorization": "Bearer " + currentUser.getProfile().token }
                    },
                    "save" : {
                        headers: { "Authorization" : "Bearer " + currentUser.getProfile().token }
                    },
                    "update" : {
                        method: "PUT",
                        headers: { "Authorization": "Bearer " + currentUser.getProfile().token }
                    }
                });
        }
    ]);
}())