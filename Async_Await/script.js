// Attaching an event listener to the button with id 'fetchButton' 
// that triggers the fetchData function when clicked
document.getElementById('fetchButton').addEventListener('click', fetchData);

// Function to asynchronously fetch data from a dummy API
async function fetchData() {
    // Accessing the content div and displaying a loading message
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = 'Loading...';

    try {
        // Fetching data from a dummy API endpoint
        const response = await fetch('https://dummyjson.com/posts');
        // Checking if the response is not okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parsing the response as JSON
        const data = await response.json();
        // Displaying the fetched Data
        displayData(data);
    } catch (error) {
        // Handling errors
        handleError(error);
    }
}

// Function to display the fetched Data on the webpage
function displayData(data) {
    const contentDiv = document.getElementById('content');
    // Clearing previous content
    contentDiv.innerHTML = '';

    // Setting heading for the fetched data
    const heading = document.getElementById('head');
    heading.innerHTML = 'Fetched Data :-';
    heading.style = "font-size: 2em;text-align: start;padding: 3px;";

    // Hiding the fetch button after data is fetched
    document.getElementById("fetchButton").style.display = "none";

    // Looping through each post in the data and creating HTML elements to display them
    data.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        contentDiv.appendChild(postElement);
    });
}

// Function to handle errors
function handleError(error) {
    const contentDiv = document.getElementById('content');
    // Displaying error message
    contentDiv.innerHTML = `Error: ${error.message}`;
}
