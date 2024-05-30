// Add a click event listener to the button with the ID 'fetchButton'
document.getElementById('fetchButton').addEventListener('click', () => {
    // Get the div element with the ID 'result' and indicate loading
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    // Create a new Promise to fetch data
    const fetchData = new Promise((resolve, reject) => {
        // Set a timeout to reject the promise if it takes longer than 5 seconds
        const timeout = setTimeout(() => {
            reject('Operation timed out.');
        }, 5000);

        // Fetch data from the JSONPlaceholder API
        fetch('https://dummyjson.com/posts')
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                clearTimeout(timeout); // Clear the timeout if the fetch is successful
                resolve(data); // Resolve the promise with the fetched data
            })
            .catch(error => {
                clearTimeout(timeout); // Clear the timeout if there is an error
                reject('Error fetching data.'); // Reject the promise with an error message
            });
    });

    // Handle the resolved or rejected state of the promise
    fetchData
        .then(data => {
            // Clear the 'Loading...' text and replace it with 'Fetched Data:-'
            resultDiv.innerHTML = 'Fetched Data:-';
            // Hide the 'fetchButton' element
            document.getElementById("fetchButton").style.display = "none";
            // Loop through each post in the fetched data
            data.posts.forEach(post => {
                // Create a new div element for each post
                const postDiv = document.createElement('div');
                postDiv.className = 'post';

                // Create and set the text content for post title and body
                const postTitle = document.createElement('h3');
                postTitle.textContent = post.title;

                const postBody = document.createElement('p');
                postBody.textContent = post.body;

                // Append the post title and body to the post div
                postDiv.appendChild(postTitle);
                postDiv.appendChild(postBody);
                // Append the post div to the result div
                resultDiv.appendChild(postDiv);
            });
        })
        .catch(error => {
            // Display the error message if the promise is rejected
            resultDiv.textContent = error;
        });

});
