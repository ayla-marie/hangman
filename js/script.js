$(document).ready(function() {
  var calendar = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "january",
    "feburary",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
    "thanksgiving",
    "christmas",
    "easter",
    "weekend",
    "month",
    "week",
    "yesterday",
    "today",
    "tomorrow"
  ];

  let selectedWord = calendar[Math.floor(Math.random() * calendar.length)];

  const correctLetters = [];
  const wrongLetters = [];

  function displayWord() {
    var letterArr = selectedWord.split("").map(
      letter =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>
    `
    );

    var letterArrAll = letterArr.join("");
    $("#word").html(letterArrAll);

    //compared innerWord2 to selectedWord to register a win
    if (correctLetters.length === selectedWord.length) {
      $(".popup, .box").css("display", "flex");
    }
  }
  displayWord();

  //function for updating wrong letters
  function updateWrongLetters() {
    //add letters to incorrect area
    var areaTitle = `<h4>Wrong Letters</h4>`;
    var listLetters = wrongLetters.map(letter => `<span>${letter} </span>`);
    $(".wrong-letters").html(areaTitle + listLetters);

    //add parts to the figure
    $(".figure-part").each((index, part) => {
      var errors = wrongLetters.length;

      if (index < errors) {
        part.style.display = "block";
      } else {
        part.style.display = "none";
      }
    });

    //Register a loss
    if (wrongLetters.length === $(".figure-part").length) {
      var areaTitle = `<h2>So Close!</h2>`;
      var addText = `<p>You Lost. Try Again?</p>`;
      $(".box").html(areaTitle + addText);

      $(".popup, .box").css("display", "flex");
    }
  }

  //function that shows notification of duplicate letter entry
  function showNotification() {
    $(".notice").css("visibility", "visible");

    setTimeout(() => {
      $(".notice").css("visibility", "collapse");
    }, 3000);
  }

  //Play another round
  $(".play").click(function() {
    //clear letters from correct and wrong
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = calendar[Math.floor(Math.random() * calendar.length)];

    displayWord();

    updateWrongLetters();

    $(".popup, .box").css("display", "none");
  });

  //keydown letter press
  window.addEventListener("keydown", e => {
    //console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLetters();
        }
      }
    }
  });
});
