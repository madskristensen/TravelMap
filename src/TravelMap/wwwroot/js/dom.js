var travel = travel || {};

(function (undefined) {

    var elmList = document.getElementById("list"),
        elmForm = document.getElementsByTagName("form")[0],
        elmEmail = document.getElementById("email"),
        statsCountries = document.getElementById("countries"),
        statsPercent = document.getElementById("percent"),
        statsTotalCount = document.getElementById("totalcount");

    var totalCount = 0;

    travel.data.get(function (countries) {

        totalCount = countries.length;

        var list = [],
            continent = countries[0].continentName;

        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];

            if (country.continentName !== continent) {
                bindContinent(continent, list);
                continent = country.continentName;
                list = [];
            }

            list.push(country);
        }

        bindContinent(continent, list);

        var visited = parseInt(statsCountries.innerHTML, 10);
        statsPercent.innerHTML = Math.ceil(visited / countries.length * 100) + "%";
    });

    function bindContinent(name, countries) {
        var h2 = document.createElement("h2");
        h2.innerHTML = name;

        elmList.appendChild(h2);

        countries.sort(function (a, b) {
            return a.countryName.localeCompare(b.countryName);
        });

        var div = document.createElement("div");
        var count = 0;

        for (var i = 0; i < countries.length; i++) {

            var check = document.createElement("input");
            check.type = "checkbox";
            check.id = countries[i].countryCode
            check.defaultChecked = localStorage[check.id] == 1;

            var label = document.createElement("label");
            label.htmlFor = check.id;
            label.appendChild(check);
            label.innerHTML += countries[i].countryName;

            div.appendChild(label);
            //label.onclick = saveCheck;

            if (check.defaultChecked) {
                count += 1;
            }
        }

        var span = document.createElement("span");
        h2.appendChild(span);

        elmList.appendChild(div)
        setStats(div);

        statsCountries.innerHTML = parseInt(statsCountries.innerHTML, 10) + count;
    }

    function setStats(div) {
        setTimeout(function () {
            var span = div.previousSibling.firstElementChild;
            var count = 0;
            var total = div.children.length;

            for (var i = 0; i < total; i++) {
                if (div.children[i].firstElementChild.checked)
                    count += 1;
            }

            span.innerHTML = count + "/" + total + "&nbsp;&nbsp;&nbsp;&nbsp;" + Math.ceil(count / total * 100) + "%";
        }, 100);
    }

    function saveCheck(input) {
        var id = input.id;
        var visited = parseInt(statsCountries.innerHTML, 10);

        if (input.checked) {
            localStorage[id] = 1;
            visited += 1;
        }
        else {
            localStorage.removeItem(id);
            visited -= 1;
        }

        setStats(input.parentNode.parentNode);
        statsCountries.innerHTML = visited;
        statsPercent.innerHTML = Math.ceil(visited / totalCount * 100) + "%";
    }

    elmForm.addEventListener("submit", function (e) {
        e.preventDefault();

    }, false);

    document.addEventListener("click", function (e) {

        if (e.target.tagName == "INPUT") {
            saveCheck(e.target);
        }
    }, false)

})();