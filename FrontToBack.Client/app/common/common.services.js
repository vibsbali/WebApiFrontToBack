"use strict";

(function() {
    angular.module("common.services", ["ngResource"])
        .constant("appSettings", {
            serverPath: "http://localhost:8922"
        });
}())