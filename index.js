import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searchForm.addEventListener('submit', e => {
    //Get search term
    const searchTerm = searchInput.value;
    //Get sort
    const sortBy = document.querySelector('input[name = "sortby"]:checked').value;
    //Get limit
    const searchLimit = document.getElementById('limit').value;
    
    //Check input
    if(searchTerm === ''){
        //Show message
        showMessage('Please add a search term', 'alert-danger');
    }

    //Clear input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        let output = '<div class = "card-columns">';
        //Loop through posts
        results.forEach(post => {
            //Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Reddit_logo_and_wordmark.svg/1200px-Reddit_logo_and_wordmark.svg.png'

            output += `
            <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" target = "_blank "class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-darl">Score: ${post.score}</span>
            </div>
          </div>
            `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
});

//Show Message
function showMessage(message, className){
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent container
    const searchContainer = document.getElementById('search-container');
    //Get search
    const search = document.getElementById('search');

    //Insert message
    searchContainer.insertBefore(div, search);

    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//Truncate Text
function truncateText (text, limit){
    const shortended = text.indexOf(' ', limit);
    if(shortended == -1) return text;
    return text.substring(0, shortended);
}