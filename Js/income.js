function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
});

jQuery(document).ready(function ($) {
  var path = window.location.pathname.split("/").pop();

  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');

  target.parent().addClass("active");
});

let income = JSON.parse(localStorage.getItem("income")) || [];
let totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;

document.getElementById("incomeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let amount = parseFloat(document.getElementById("amount").value);

  addEntryToTable(date, category, amount);

  totalIncome += amount;
  updateDisplay("totalIncome", totalIncome);

  localStorage.setItem("income", JSON.stringify(income));
  localStorage.setItem("totalIncome", totalIncome);
});

function addEntryToTable(date, category, amount) {
  let table = document
    .getElementById("incomeTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow();
  newRow.innerHTML = `<td>${date}</td><td>${category}</td><td>$${amount.toFixed(
    2
  )}</td><td><button class="btn btn-danger delete">Delete</button></td>`;

  let incomeEntry = { date, category, amount, row: newRow };
  income.push(incomeEntry);
}

function updateDisplay(id, value) {
  document.getElementById(id).innerText = `Total Income: $${value.toFixed(2)}`;
}

document.getElementById("incomeTable").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let row = e.target.parentNode.parentNode;
    let index = income.findIndex((incomeEntry) => incomeEntry.row === row);
    if (index !== -1) {
      totalIncome -= income[index].amount;
      updateDisplay("totalIncome", totalIncome);
      income.splice(index, 1);
      row.parentNode.removeChild(row);

      localStorage.setItem("income", JSON.stringify(income));
      localStorage.setItem("totalIncome", totalIncome);
    }
  }
});

document
  .getElementById("generateReportButton")
  .addEventListener("click", function () {
    let report = `Income Report\n\n`;
    income.forEach((incomeEntry) => {
      report += `Date: ${incomeEntry.date}, Category: ${
        incomeEntry.category
      }, Amount: $${incomeEntry.amount.toFixed(2)}\n`;
    });
    report += `\nTotal Income: $${totalIncome.toFixed(2)}`;
    downloadSimplePDF(report);
  });

document
  .getElementById("generateChartButton")
  .addEventListener("click", function () {
    let ctx = document.getElementById("incomeChart").getContext("2d");
    let labels = income.map(function (e) {
      return e.category;
    });
    let data = income.map(function (e) {
      return e.amount;
    });
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Income",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });

function downloadSimplePDF(report) {
  var pdf = new jsPDF();
  var lines = report.split("\n");
  for (var i = 0; i < lines.length; i++) {
    pdf.text(lines[i], 10, 10 + i * 10);
  }
  pdf.save("IncomeReport.pdf");
}

var navLinks = document.querySelectorAll("#navbar a");

for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].href === window.location.href) {
    var activeElements = document.querySelectorAll(".nav-item.active");
    for (var j = 0; j < activeElements.length; j++) {
      activeElements[j].classList.remove("active");
    }
    navLinks[i].parentNode.classList.add("active");
  }
}
