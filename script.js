var btn = document.getElementById("convertBtn");
var result = document.getElementById("result");
var dateText = document.getElementById("date");
var table = document.getElementById("tableBody");

btn.onclick = function () {

    var amount = document.getElementById("amount").value;
    var base = document.getElementById("base").value.toUpperCase();
    var target = document.getElementById("target").value.toUpperCase();

    if (amount === "" || base === "" || target === "") {
        result.innerText = "Please fill all fields";
        return;
    }

    fetch("https://api.frankfurter.dev/v1/latest?base=" + base)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var rate = data.rates[target];

            console.log(data);



            if (rate === undefined) {
                result.innerText = "Invalid currency";
                return;
            }

            var converted = amount * rate;

            result.innerText = amount + " " + base + " = " + converted.toFixed(2) + " " + target;

            dateText.innerText = "Rates as of " + data.date;

            table.innerHTML = "";

            Object.entries(data.rates).forEach(function (item) {

                var row = document.createElement("tr");

                var c1 = document.createElement("td");
                c1.innerText = item[0];

                var c2 = document.createElement("td");
                c2.innerText = item[1];

                row.appendChild(c1);
                row.appendChild(c2);

                table.appendChild(row);
            });

        })
        .catch(function () {
            result.innerText = "Network error";
        });
};