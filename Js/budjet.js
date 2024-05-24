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

let totalIncome = 0;
let totalExpense = 0;
let entries = [];

document.getElementById("budgetForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let category = document.getElementById("category").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let type = document.getElementById("type").value;

  addEntryToTable(category, amount, type);

  if (type === "income") {
    totalIncome += amount;
    updateDisplay("totalIncome", totalIncome);
  } else {
    totalExpense += amount;
    updateDisplay("totalExpense", totalExpense);
  }

  updateDisplay("netBudget", totalIncome - totalExpense);
});

function addEntryToTable(category, amount, type) {
  let table = document
    .getElementById("entriesTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow();
  newRow.innerHTML = `<td>${category}</td><td>$${amount.toFixed(
    2
  )}</td><td>${type}</td><td><button class="btn btn-danger delete">Delete</button></td>`;

  let entry = { category, amount, type, row: newRow };
  entries.push(entry);
}

function updateDisplay(id, value) {
  document.getElementById(id).innerText =
    id === "netBudget"
      ? `Net Budget: $${value.toFixed(2)}`
      : `Total ${id.charAt(0).toUpperCase() + id.slice(1)}: $${value.toFixed(
          2
        )}`;
}

document.getElementById("entriesTable").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let row = e.target.parentNode.parentNode;
    let index = entries.findIndex((entry) => entry.row === row);
    if (index !== -1) {
      if (entries[index].type === "income") {
        totalIncome -= entries[index].amount;
      } else {
        totalExpense -= entries[index].amount;
      }
      updateDisplay("totalIncome", totalIncome);
      updateDisplay("totalExpense", totalExpense);
      updateDisplay("netBudget", totalIncome - totalExpense);
      entries.splice(index, 1);
      row.parentNode.removeChild(row);
    }
  }
});

document
  .getElementById("generateReport")
  .addEventListener("click", function () {
    let report = `Total Income: $${totalIncome.toFixed(
      2
    )}\nTotal Expense: $${totalExpense.toFixed(2)}\nNet Budget: $${(
      totalIncome - totalExpense
    ).toFixed(2)}`;
    downloadSimplePDF(report);
  });

function downloadSimplePDF(report) {
  var pdf = new window.jspdf.jsPDF();
  var lines = report.split("\n");
  for (var i = 0; i < lines.length; i++) {
    pdf.text(lines[i], 10, 10 + i * 10);
  }
  pdf.save("BudgetReport.pdf");
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
