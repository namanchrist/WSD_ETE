document.addEventListener("DOMContentLoaded", () => {
    const breedList = document.getElementById("breed-list");
    const filterSelect = document.getElementById("breed-size");
    const paginationContainer = document.getElementById("pagination-container");
    
    const breedsPerPage = 2; // Number of breeds to show per page
    let currentPage = 1;
    let filteredBreeds = [];
    let allBreeds = [];

    // Fetch breeds data from JSON file
    fetch('breeds.json')
        .then(response => response.json())
        .then(data => {
            allBreeds = data;
            filteredBreeds = allBreeds;
            displayBreeds();
            createPaginationControls();  // Create pagination controls
        })
        .catch(error => console.error('Error fetching breeds data:', error));

    // Display breeds with pagination
    function displayBreeds() {
        breedList.innerHTML = ""; // Clear the list

        const startIndex = (currentPage - 1) * breedsPerPage;
        const endIndex = startIndex + breedsPerPage;
        const breedsToShow = filteredBreeds.slice(startIndex, endIndex);

        breedsToShow.forEach(breed => {
            const breedCard = document.createElement("div");
            breedCard.className = "breed-card";

            // Image element
            const breedImage = document.createElement("img");
            breedImage.src = breed.image; // Local image path
            breedImage.alt = breed.breedName;
            breedImage.className = "breed-image";

            breedCard.innerHTML = `
                <h3>${breed.breedName}</h3>
                <p>${breed.description}</p>
                <p><strong>Size:</strong> ${breed.size}</p>
                <p><strong>Lifespan:</strong> ${breed.lifespan}</p>
                <p><strong>Origin:</strong> ${breed.origin}</p>
            `;

            breedCard.prepend(breedImage); // Add image at the top
            breedList.appendChild(breedCard);
        });

        updatePaginationControls();
    }

    // Filter breeds by size
    filterSelect.addEventListener("change", () => {
        const selectedSize = filterSelect.value;
        if (selectedSize === "all") {
            filteredBreeds = allBreeds;
        } else {
            filteredBreeds = allBreeds.filter(breed => breed.size.includes(selectedSize));
        }
        currentPage = 1; // Reset to the first page after filter change
        displayBreeds();
    });

    // Create pagination controls dynamically
    function createPaginationControls() {
        const prevButton = document.createElement("button");
        prevButton.id = "prev-button";
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                displayBreeds();
            }
        });

        const nextButton = document.createElement("button");
        nextButton.id = "next-button";
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => {
            if (currentPage * breedsPerPage < filteredBreeds.length) {
                currentPage++;
                displayBreeds();
            }
        });

        const pageIndicator = document.createElement("span");
        pageIndicator.id = "current-page";
        pageIndicator.textContent = `Page ${currentPage}`;

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageIndicator);
        paginationContainer.appendChild(nextButton);
    }

    // Update pagination controls
    function updatePaginationControls() {
        document.getElementById("current-page").textContent = `Page ${currentPage}`;
    }
});
