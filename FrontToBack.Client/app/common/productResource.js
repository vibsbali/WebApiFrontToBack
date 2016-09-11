"use strict";

(function() {
    angular.module("common.services").factory("productResource", [
        "$resource", "appSettings", function ($resource, appSettings) {
            //returns $resource object
            //The parameters are url with id as optional
            return $resource(appSettings.serverPath + "/api/products/:search");
        }
    ]);
}())