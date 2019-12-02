"use strict";

function routeFw(params) {
    var fw = {};
    var startingPath = params.startingPath;
    var missingPathFunction = params.missingPathFunction;
    var contentId = params.contentId;

    // Check that the routing table contains >= 1 element
    if (!params.routeArray || params.routeArray[0]) {
        console.log("Routing table must contain atleast 1 element.");
        return;
    }

    var routes = params.routeArray;

    function router() {
        var path = location.hash.slice(1) || "/home";

        if (!routes[path]) {
            missingPathFunction(contentId);
        } else {
            routes[path](contentId);
        }
    }

    // Listen for a link to be clicked and force page to start on "/home" content
    window.addEventListener("hashchange", router);
    window.location.hash = "/undefined_xxx";
    window.location.hash = startingPath;
    
    return fw;
}