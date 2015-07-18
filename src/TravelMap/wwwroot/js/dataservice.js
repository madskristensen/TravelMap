var travel = travel || {};

travel.data = (function (undefined) {

    function get(callback) {
        var xmlhttp = new XMLHttpRequest();
        var url = "/data/countries.json"; // http://peric.github.io/GetCountries/

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var countries = JSON.parse(xmlhttp.responseText);

                countries.sort(function (a, b) {
                    return a.continentName.localeCompare(b.continentName);
                });

                callback(countries);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    return {
        get: get
    }

})();