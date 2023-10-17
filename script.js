const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const errorElement = document.getElementById("error-element");

let apiQuotes = [];

// Show Loader
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Pick a random quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine the styling
  if (quote.text.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Show quote and hide loader
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  // Generate random quote on each attempt
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here and show in the user interface
    setTimeout(() => {
      const errorMessage = "Failed to fetch quotes. Please try again later.";
      errorElement.textContent = errorMessage;
      loader.hidden = true;
      quoteContainer.hidden = true;
    }, 5000);
  }
}

// Tweet Quotes
function tweetQuote() {
  const TwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(TwitterUrl, "_blank");
}

// Events
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);

// onLoad
getQuotes();
