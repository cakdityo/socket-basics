(function(){

    function getQueryParam(key) {
        var params = window.location.search.substring(1).split('&');
        for (var i=0; i<params.length; i++){
            let param = params[i].split('=');
            if (decodeURIComponent(param[0]) == key) {
                return decodeURIComponent(param[1]).replace('+', ' ');
            }
        }
        return undefined;
    }

    function qs(query) {
        if (query) {
            return document.querySelector(query);
        }
    }

    var h = {};
    h.getQueryParam = getQueryParam;
    h.qs = qs;

    window.h = h;

})();