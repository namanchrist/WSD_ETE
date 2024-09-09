window.onload = async () => {
    // Fetch and display a random dog image on page load
    await fetchDogImage();

    // Set up event listener for the "Get New Dog" button
    const dogButton = document.getElementById("dogButton");
    dogButton.addEventListener('click', async () => {
        document.getElementById("container").innerHTML = null;
        await fetchDogImage();
    });

    // Add event listener for form submission
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate form inputs
        let isValid = validateForm();
        if (isValid) {
            alert('Form submitted successfully!');
            signupForm.reset(); // Reset form after successful submission
        }
    });
};

// Fetch a random dog image from the API
async function fetchDogImage() {
    await fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            let dogimg = document.createElement("img");
            dogimg.src = data.message;
            document.getElementById("container").appendChild(dogimg);
        })
        .catch(error => console.error('Error fetching dog image:', error));
}

// Form validation function
function validateForm() {
    let isValid = true;

    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (email.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Checkbox validation
    const dogLover = document.getElementById('dogLover');
    const dogLoverError = document.getElementById('dogLoverError');
    if (!dogLover.checked) {
        dogLoverError.textContent = 'You must confirm you are a dog lover.';
        isValid = false;
    } else {
        dogLoverError.textContent = '';
    }

    return isValid;
}
