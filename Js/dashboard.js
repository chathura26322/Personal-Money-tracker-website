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
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalIncome = income.reduce((total, entry) => total + entry.amount, 0);
let totalExpenses = expenses.reduce((total, entry) => total + entry.amount, 0);
let budget = totalIncome - totalExpenses;

// Update the summary
document.getElementById("incomeSummary").innerText = "$" + totalIncome;
document.getElementById("expensesSummary").innerText = "$" + totalExpenses;
document.getElementById("budgetSummary").innerText = "$" + budget;

var incomeCtx = document.getElementById("incomeChart").getContext("2d");
var incomeChart = new Chart(incomeCtx, {
  type: "pie",
  data: {
    labels: income.map((entry) => entry.category),
    datasets: [
      {
        data: income.map((entry) => entry.amount),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  },
});

var expensesCtx = document.getElementById("expensesChart").getContext("2d");
var expensesChart = new Chart(expensesCtx, {
  type: "pie",
  data: {
    labels: expenses.map((entry) => entry.category),
    datasets: [
      {
        data: expenses.map((entry) => entry.amount),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  },
});

var budgetCtx = document.getElementById("budgetChart").getContext("2d");
var budgetChart = new Chart(budgetCtx, {
  type: "pie",
  data: {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  },
});

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
