let apiQuotes = [];
//Get Quote From API

//pick a random quote
function newQuote() {
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
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
    //catch error here
    console.log(error);
  }
}
getQuotes();
