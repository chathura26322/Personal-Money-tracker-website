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

var wallets = [];
var transactions = [];

function generateWalletCards() {
  var walletCards = document.getElementById("walletCards");
  walletCards.innerHTML = "";
  for (var i = 0; i < wallets.length; i++) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerText = wallets[i];
    walletCards.appendChild(card);
  }
}

function listTransactions() {
  var transactionTable = document.getElementById("transactionTable");
  transactionTable.innerHTML = "";
  for (var i = 0; i < transactions.length; i++) {
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      transactions[i].date +
      "</td><td>" +
      transactions[i].category +
      "</td><td>" +
      transactions[i].amount +
      "</td><td>" +
      transactions[i].description +
      "</td>";
    transactionTable.appendChild(row);
  }
}

function filterTransactions() {
  var searchInput = document.getElementById("searchTransactions").value;
  var filteredTransactions = transactions.filter(function (transaction) {
    return transaction.description.includes(searchInput);
  });
  listTransactions(filteredTransactions);
}

document
  .getElementById("addWalletForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var walletName = document.getElementById("walletName").value;
    wallets.push(walletName);
    generateWalletCards();
  });

document
  .getElementById("addTransactionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var transactionDate = document.getElementById("transactionDate").value;
    var transactionCategory = document.getElementById(
      "transactionCategory"
    ).value;
    var transactionAmount = document.getElementById("transactionAmount").value;
    var transactionDescription = document.getElementById(
      "transactionDescription"
    ).value;
    transactions.push({
      date: transactionDate,
      category: transactionCategory,
      amount: transactionAmount,
      description: transactionDescription,
    });
    listTransactions();
  });

generateWalletCards();
listTransactions();

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
