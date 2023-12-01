// Function to fetch data from an API using promises
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to display Lucifer quotes
// Function to create and append elements for Lucifer quotes
function displayLuciferQuotes() {
    const appContainer = document.getElementById('app');

    // Create main heading
    const mainHeading = document.createElement('h1');
    mainHeading.textContent = 'Quotes & Authors';
    mainHeading.classList.add('text-center', 'mb-4');
    appContainer.appendChild(mainHeading);

    // Create unordered list for quotes
    const luciferQuotesList = document.createElement('ul');
    luciferQuotesList.id = 'lucifer-quotes-list';
    appContainer.appendChild(luciferQuotesList);

    fetchData('https://lucifer-quotes.vercel.app/api/quotes/30')
        .then(quotes => {
            if (quotes && quotes.length > 0) {
                quotes.forEach(quote => {
                    // Create list item for each quote and author
                    const listItem = document.createElement('li');
                    listItem.className = 'list-item';

                    const quoteText = document.createElement('p');
                    quoteText.textContent = quote.quote;
                    quoteText.classList.add('quote-text');
                    listItem.appendChild(quoteText);

                    const authorText = document.createElement('p');
                    authorText.textContent = `- ${quote.author}`;
                    authorText.classList.add('author-text');
                    listItem.appendChild(authorText);

                    luciferQuotesList.appendChild(listItem);
                });
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Empty or invalid data received from the API.';
                luciferQuotesList.appendChild(errorMessage);
            }
        })
        .catch(error => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Error fetching Lucifer quotes: ${error}`;
            luciferQuotesList.appendChild(errorMessage);
        });
}


// Execute function to display Lucifer quotes on page load
document.addEventListener('DOMContentLoaded', () => {
    displayLuciferQuotes();
});
