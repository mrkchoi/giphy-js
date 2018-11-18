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

// Add event listener on submit
searchForm.addEventListener('submit', userInput);

// Listen for user input [search query]
function userInput(e) {
    e.preventDefault();
    // Change search term string to the correct string+string format
    let newTerm = searchTerm.value;
    // To lowercase & replace ' ' with '+'
    term = newTerm.split(' ').join('+');
    // Push searchTerm into our API fetch
    getData(term);
}

// Fetch data from GIPHY API
async function getData(term) {
    await fetch(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${apiKey}&limit=48`)
        .then(blob => {
            return blob.json();
        })
        .then(response => {
            data = response.data;
            return data;
        });
        updateGrid(data);
}

// Update the DOM with our returned data
function updateGrid(data) {
    // Loop through the JSON data, grab the correct URL
    let outputTemplate = '';
    data.forEach(item => {
        // Create a template literal variable of each img with the updated src
        outputTemplate += `
        <img src="${item.images.original.url}" alt="GIF from GIPHY API" class="search__img grid-item">
        `;
    });
    // Set the template string as DOM output
    output.innerHTML = outputTemplate;
}

// Sticky Nav
window.addEventListener('scroll', stickyNav);

function stickyNav(e) {
    if(scrollY >= 25) {
        document.querySelector('.wrapper__main').classList.add('sticky');
        document.querySelector('.content__main').classList.add('sticky');
        document.querySelector('.header__wrapper').classList.add('sticky');
        document.querySelector('.search__input').classList.add('sticky');
        document.querySelector('.search__btn').classList.add('sticky');
        document.querySelector('.wrapper__output').classList.add('sticky');
        document.querySelector('.container__header').classList.add('sticky');
        document.querySelector('.header__main').classList.add('sticky');
    } else {
        document.querySelector('.wrapper__main').classList.remove('sticky');
        document.querySelector('.content__main').classList.remove('sticky');
        document.querySelector('.header__wrapper').classList.remove('sticky');
        document.querySelector('.search__input').classList.remove('sticky');
        document.querySelector('.search__btn').classList.remove('sticky');
        document.querySelector('.wrapper__output').classList.remove('sticky');
        document.querySelector('.container__header').classList.remove('sticky');
        document.querySelector('.header__main').classList.remove('sticky');
    }
}
