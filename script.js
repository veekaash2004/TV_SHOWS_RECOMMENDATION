document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display movie data for a specific genre
    function fetchAndDisplayGenre(genre) {
        const genreJsonPath = genre ? `Genre_data/${genre.toLowerCase()}.json` : 'Genre_data/data.json';

        fetch(genreJsonPath)
            .then(response => response.json())
            .then(movieData => {
                const movieContainer = document.getElementById("movieContainer");
                movieContainer.innerHTML = ""; // Clear existing content

                let movieRow;

                movieData.forEach((movie, index) => {
                    if (index % 6 === 0) {
                        movieRow = document.createElement("div");
                        movieRow.classList.add("movie-row");
                        movieContainer.appendChild(movieRow);
                    }

                    const movieCard = document.createElement("div");
                    movieCard.classList.add("movie-card");

                    const posterImg = document.createElement("img");
                    posterImg.classList.add("movie-poster");
                    posterImg.src = movie.poster_path;
                    posterImg.alt = `${movie.name} Poster`;

                    const movieName = document.createElement("div");
                    movieName.classList.add("movie-name");
                    movieName.textContent = movie.name;

                    movieCard.appendChild(posterImg);
                    movieCard.appendChild(movieName);
                    movieRow.appendChild(movieCard);
                    movieCard.addEventListener("click", function () {
                        openMovieModal(movie);
                    });
                });

                // Additional code for search functionality
                const searchInput = document.getElementById("searchInput");

                // Event listener for search input
                searchInput.addEventListener("input", function () {
                    const searchTerm = searchInput.value.trim().toLowerCase();
                    const matchingMovies = movieData.filter(movie => {
                        // Check if movie has a valid name and it's a string
                        return movie.name && typeof movie.name === 'string' &&
                               movie.name.toLowerCase().includes(searchTerm);
                    });
                

                    // Clear existing movies
                    movieContainer.innerHTML = '';

                    // Display matching movies or all movies if query is empty
                    let movieRow;

                    matchingMovies.forEach((movie, index) => {
                        if (index % 6 === 0) {
                            movieRow = document.createElement("div");
                            movieRow.classList.add("movie-row");
                            movieContainer.appendChild(movieRow);
                        }

                        const movieCard = document.createElement("div");
                        movieCard.classList.add("movie-card");

                        const posterImg = document.createElement("img");
                        posterImg.classList.add("movie-poster");
                        posterImg.src = movie.poster_path;
                        posterImg.alt = `${movie.name} Poster`;

                        const movieName = document.createElement("div");
                        movieName.classList.add("movie-name");
                        movieName.textContent = movie.name;

                        movieCard.appendChild(posterImg);
                        movieCard.appendChild(movieName);
                        movieRow.appendChild(movieCard);
                        movieCard.addEventListener("click", function () {
                            openMovieModal(movie);
                        });
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Event listener for genre dropdown
    document.getElementById("myDropdown").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            const selectedGenre = event.target.textContent;
            fetchAndDisplayGenre(selectedGenre);
        }
    });
    document.getElementById("movieContainer").addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains("movie-card")) {
            const movieName = clickedElement.querySelector(".movie-name").textContent;
            // You can get more details about the movie using the movieName and open a modal
            openMovieModal({ name: movieName });
        }
    });

    // Initial fetch and display with no specific genre (using data.json)
    fetchAndDisplayGenre(null);
});

function openMovieModal(movie) {
    // You can customize this function to display detailed information about the clicked movie
    openMovieDetailsPage(movie)
}


function openMovieDetailsPage(movie) {
    // Construct the URL for the movie details page, passing both the movie name and poster path as parameters
    const detailsPageUrl = `movie_details.html?name=${encodeURIComponent(movie.name)}&posterPath=${encodeURIComponent(movie.poster_path)}&genre=${encodeURIComponent(movie.genres)}&detail=${encodeURIComponent(movie.overview)}&id=${encodeURIComponent(movie.id)}&link=${encodeURIComponent(movie.trailer)}`;
    // Open the details page in a new tab or window
    window.open(detailsPageUrl, '_blank');
}


// Open modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function sendVerificationEmail() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (email) {
        // Initialize Email.js with your user ID
        emailjs.init("hMLFEHBysEGYN5imm");

        // Specify the email service, template, and parameters
        var service_id = "service_f0fdnhc";
        var template_id = "template_8rjkos9";

        var template_params = {
            to_name: ", Welcome to MovieFlix!",
            message: `Your password is : ${password}`,
            from_name: "Harsh raj",
            reply_to: email,
        };

        // Send the email
        emailjs.send(service_id, template_id, template_params)
            .then(function(response) {
                console.log("Email sent successfully:", response);
                alert("Verification email sent. Please check your email to complete the signup process.");
            }, function(error) {
                console.error("Error sending email:", error);
                alert("Error sending verification email. Please try again later.");
            });
    } else {
        alert("Please enter a valid email address.");
    }
}

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBolOKHf7T09_ExaLMqahlt_l-Mf8zp2ls",
    authDomain: "acoustic-spot-404923.firebaseapp.com",
    databaseURL: "https://acoustic-spot-404923-default-rtdb.firebaseio.com",
    projectId: "acoustic-spot-404923",
    storageBucket: "acoustic-spot-404923.appspot.com",
    messagingSenderId: "848903097492",
    appId: "1:848903097492:web:1ee90cfdca29848c9af881",
    measurementId: "G-YYLFERQZ07"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const signUp = () => {
    var email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    sendVerificationEmail();
   
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            alert("You are Signed Up")
            console.log(result);
            window.location.href = 'index2.html';
            // ...
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
            // ..
        });
}


// Login function (dummy function)
const login = () => {
    var email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    // firebase code
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            console.log(result)
            localStorage.setItem("userEmail", email);
            alert("you are logged in")
            window.location.href = 'index3.html';
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
        });
}