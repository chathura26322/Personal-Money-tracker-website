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

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalExpense = parseFloat(localStorage.getItem("totalExpense")) || 0;

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let amount = parseFloat(document.getElementById("amount").value);

  addEntryToTable(date, category, amount);

  totalExpense += amount;
  updateDisplay("totalExpenses", totalExpense);

  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalExpense", totalExpense);
});

function addEntryToTable(date, category, amount) {
  let table = document
    .getElementById("expenseTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow();
  newRow.innerHTML = `<td>${date}</td><td>${category}</td><td>$${amount.toFixed(
    2
  )}</td><td><button class="btn btn-danger delete">Delete</button></td>`;

  let expense = { date, category, amount, row: newRow };
  expenses.push(expense);
}

function updateDisplay(id, value) {
  document.getElementById(id).innerText = `Total Expenses: $${value.toFixed(
    2
  )}`;
}

document.getElementById("expenseTable").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let row = e.target.parentNode.parentNode;
    let index = expenses.findIndex((expense) => expense.row === row);
    if (index !== -1) {
      totalExpense -= expenses[index].amount;
      updateDisplay("totalExpenses", totalExpense);
      expenses.splice(index, 1);
      row.parentNode.removeChild(row);

      localStorage.setItem("expenses", JSON.stringify(expenses));
      localStorage.setItem("totalExpense", totalExpense);
    }
  }
});

document
  .getElementById("generateReportButton")
  .addEventListener("click", function () {
    let report = `Expense Report\n\n`;
    expenses.forEach((expense) => {
      report += `Date: ${expense.date}, Category: ${
        expense.category
      }, Amount: $${expense.amount.toFixed(2)}\n`;
    });
    report += `\nTotal Expense: $${totalExpense.toFixed(2)}`;
    downloadSimplePDF(report);
  });

document
  .getElementById("generateChartButton")
  .addEventListener("click", function () {
    let ctx = document.getElementById("expenseChart").getContext("2d");
    let labels = expenses.map(function (e) {
      return e.category;
    });
    let data = expenses.map(function (e) {
      return e.amount;
    });
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expenses",
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
  pdf.save("ExpenseReport.pdf");
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
