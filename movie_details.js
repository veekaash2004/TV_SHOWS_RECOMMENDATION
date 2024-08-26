document.addEventListener("DOMContentLoaded", function () {
    // Retrieve parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieName = urlParams.get('name');
    const posterPath = urlParams.get('posterPath');
    const genre = urlParams.get('genre');
    const detail = urlParams.get('detail');
    const id = urlParams.get('id');
    const trailer = urlParams.get('link')
    console.log('params : ', urlParams)
    console.log('Movie Name:', movieName);
    console.log('Poster Path:', posterPath);
    console.log('Overview:', detail);
    console.log('trailer: ', trailer)
    const movieNameElement = document.getElementById('movieName');
    movieNameElement.textContent = movieName;
    const posterImgElement = document.getElementById('posterImg');
    posterImgElement.src = posterPath;
    posterImgElement.alt = `${movieName} Poster`;
    const genreElement = document.getElementById('genre');
    genreElement.textContent = genre;
    const detailElement = document.getElementById('detail');
    detailElement.textContent = detail;
    document.getElementById("watchTrailerBtn").setAttribute("onclick", "window.open('" + trailer + "', '_blank')");


    // Fetch data from 'similar.csv' using the ID
    fetch('similar.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data into an array of objects
            const dataArray = Papa.parse(data, { header: true }).data;

            // Find the row with the specified ID
            const movieData = dataArray.find(row => row.id === id);

            // Check if the movie data is found
            if (movieData) {
                console.log('Movie Data:', movieData);

                // Assuming 'movieData' is the object obtained from 'similar.csv'
                const idsFromMovieData = Object.values(movieData).slice(1, 30); // Extract the first 30 values

                // Fetch data from 'data.csv'
                fetch('data.csv')
                    .then(response => response.text())
                    .then(data => {
                        // Parse CSV data into an array of objects
                        const dataArray = Papa.parse(data, { header: true }).data;

                        // Filter rows based on IDs from 'similar.csv'
                        const selectedRows = dataArray.filter(row => idsFromMovieData.includes(row.id));

                        // Create a container element
                        const containerElement = document.getElementById('container');

                        // Loop through the selected rows and create elements
                        selectedRows.forEach(row => {
                            // Create a div element for each movie
                            const movieElement = document.createElement('div');

                            // Create an image element for the poster
                            const posterElement = document.createElement('img');
                            posterElement.src = row.poster_path;
                            posterElement.alt = `${row.name} Poster`;

                            // Create a paragraph element for the name
                            const nameElement = document.createElement('p');
                            nameElement.textContent = row.name;

                            // Append poster and name elements to the movie element
                            movieElement.appendChild(posterElement);
                            movieElement.appendChild(nameElement);

                            // Append the movie element to the container
                            containerElement.appendChild(movieElement);
                            movieElement.addEventListener("click", function () {
                                openMovieDetailsPage(row);
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching or processing data.csv:', error);
                    });
            } else {
                console.log('Movie data not found for ID:', id);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function openMovieDetailsPage(movie) {
    // Construct the URL for the movie details page, passing both the movie name and poster path as parameters
    const detailsPageUrl = `movie_details.html?name=${encodeURIComponent(movie.name)}&posterPath=${encodeURIComponent(movie.poster_path)}&genre=${encodeURIComponent(movie.genres)}&detail=${encodeURIComponent(movie.overview)}&id=${encodeURIComponent(movie.id)}&link=${encodeURIComponent(movie.trailer)}`;
    // Open the details page in a new tab or window
    window.location.href = detailsPageUrl;
}
