const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
//Get Quote From API

//Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loader
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//pick a random quote
function newQuote() {
  // loading();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author is blank and replace it with "Unknown"
  if (!authorText) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length to determine the styling
  if (quote.text.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //show quote and hide loader
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  //Generate random quote on each attempt
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here and show in the user interface
    setTimeout(() => {
      quoteText.textContent = error;
    }, 5000);
  }
}

//Tweet Quote
function tweetQuote() {
  const TwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(TwitterUrl, "_blank");
}

//Events
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);

//onLoad
getQuotes();
