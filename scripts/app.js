// GIPHY API - SAMPLE ENDPOINT
/*
http://api.giphy.com/v1/gifs/search?q=ufc+fight&api_key=oSjaViyrwpsBcwnhqjL2YhLjikQFF8EJ&limit=5
*/

// Set Variables
let output = document.querySelector('.search__output'),
    apiKey = 'oSjaViyrwpsBcwnhqjL2YhLjikQFF8EJ',
    searchTerm = document.querySelector('.search__input'),
    searchForm = document.querySelector('.search__form'),
    term,
    data;

// Change search term string to the correct string+string format
// Push searchTerm into our API fetch
// Add event listener on submit
// Update the DOM with our returned data

searchForm.addEventListener('submit', userInput);

function userInput(e) {
    e.preventDefault();
    let newTerm = searchTerm.value;
    // To lowercase & replace ' ' with '+'
    term = newTerm.split(' ').join('+');
    getData(term);
    updateGrid();
}

function getData(term) {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${apiKey}&limit=24`)
        .then(blob => {
            return blob.json();
        })
        .then(response => {
            data = response.data;
            return data;
        });
}

function updateGrid() {
    // Loop through the JSON data, grab the correct URL
    let outputTemplate = '';
    data.forEach(item => {
        // Create a template literal variable of each img with the updated src
        outputTemplate += `
        <img src="${item.images.original.url}" alt="GIF from GIPHY API" class="search__img grid-item">
        `;
    });

    output.innerHTML = outputTemplate;
}

