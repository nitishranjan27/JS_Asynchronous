// Add event listener to the button with id 'executeCallback'
document.getElementById('executeCallback').addEventListener('click', function handleClick() {
    // Remove event listener to prevent multiple clicks
    document.getElementById('executeCallback').removeEventListener('click', handleClick);
    
    // Execute callback function with delay of 5 seconds
    executeCallbackWithDelay(function() {
        // Set text in result div
        document.getElementById('result').innerText = "Callback executed after 5 seconds";
        // Fetch data from API
        fetchData();
    });
});

// Function to execute a callback function after a delay
function executeCallbackWithDelay(callback) {
    setTimeout(callback, 5000);
}

// Function to fetch Data from the API
function fetchData() {
    fetch('https://dummyjson.com/posts') // Fetch Data from the specified API endpoint
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            const posts = data.posts;
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML += "<h2>Fetched Posts:</h2>";
            // Iterate through each post in the array
            posts.forEach(post => {    
                const postTitle = document.createElement('p');
                postTitle.innerText = post.title; // Set the text content of the paragraph to the title of the current post
                resultDiv.appendChild(postTitle);
            });
        })
        // If an error occurs during the fetch request or processing of the data, catch the error
        .catch(error => {
            document.getElementById('result').innerText = "Failed to fetch data";
            console.error('Error:', error);
        });
}
