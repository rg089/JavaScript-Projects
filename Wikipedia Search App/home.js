const submit = document.querySelector('.js-search-form');
submit.addEventListener('submit', getResults);

async function getResults(event){
    event.preventDefault();
    const inputValue = document.querySelector('.js-search-input').value;
    const searchQuery = inputValue.trim();
    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('hidden');
    try{
        const result = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`);
        if (!result.ok) throw Error(result.statusText);
        const resJSON = await result.json();
        displayQueries(resJSON);}
    catch(error){
        console.log(`Error - ${error}`);}
    finally{
        spinner.classList.add('hidden');}
    
    }

function displayQueries(resJSON){
    const searchResults = document.querySelector('.js-search-results');
    searchResults.innerHTML = '';
    const arr = resJSON.query.search;
    if (arr.length==0){
        alert("No results found!");
        return;}
    arr.forEach(element => {
        const url = `https://en.wikipedia.org/?curid=${element.pageid}`;
        searchResults.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
            <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${element.title}</a>
            </h3>
            <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
            <span class="result-snippet">${element.snippet}</span><br>
        </div>`)});}