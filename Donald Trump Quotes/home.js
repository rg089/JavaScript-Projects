const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);
const spinner = document.querySelector('#js-spinner');
const tweetButton = document.querySelector('#js-tweet');


function tweetQuote(quote){
    tweetButton.setAttribute("href", `https://twitter.com/share?text=${quote} - Donald Trump`);}

async function getQuote(){
    spinner.classList.remove('hidden');
    newQuoteButton.disabled = true;
    try {
        const resp = await fetch('https://api.whatdoestrumpthink.com/api/v1/quotes/random');
        if (!resp.ok) throw Error(resp.statusText);
        const quoteJSON = await resp.json();
        const quote = quoteJSON.message;
        displayQuote(quote);
        tweetQuote(quote);
        console.log(quote);} 
    catch (error) {
        console.log(error);
        alert("Couldn't fetch the quote.");}
    finally{
        spinner.classList.add('hidden');
        newQuoteButton.disabled = false;}}

function displayQuote(quote){
    const displayQ = document.getElementById("js-quote-text");
    displayQ.textContent = quote;}

getQuote();
