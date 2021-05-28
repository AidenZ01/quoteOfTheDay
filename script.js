const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  authorText.textContent = quote.author ? quote.author : 'Unknown';
  quoteText.textContent = quote.text;
  quote.text.length >= 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
  removeLoadingSpinner();
};
// Get Quotes From API

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
