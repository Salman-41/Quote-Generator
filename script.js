let apiQuotes = [];
//Get Quote From API
async function getQuotes() {
  try {
    //Generate random quote on each attempt
    const apiUrl = "https://zenquotes.io/api/quotes";
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(data);
  } catch (error) {
    //catch error here
    console.log(error);
  }
}
getQuotes();
