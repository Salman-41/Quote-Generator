const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];
//Get Quote From API

//pick a random quote
function newQuote() {
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author is blank and replace it with "Unknown"
  if (!authorText) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length to determine the styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

async function getQuotes() {
  try {
    //Generate random quote on each attempt
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
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

//onLoad
getQuotes();
