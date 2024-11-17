// Start of home section
// Toggle dropdown visibility
function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById("userDropdown");
    dropdown.style.display = dropdown.style.display === "none" || dropdown.style.display === "" ? "block" : "none";
}

// Open and Close Modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Login and Sign Up Functions
function signUp() {
    const username = document.getElementById("signUpUsername").value;
    const password = document.getElementById("signUpPassword").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Registration successful!");
        closeModal('signUpModal');
    } else {
        alert("Please fill in all fields.");
    }
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Welcome!");
        closeModal('loginModal');
    } else {
        alert("Invalid username or password.");
    }
}

// Theme Toggle
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        body.classList.add(storedTheme);
        navbar.classList.add(storedTheme === 'dark-theme' ? 'navbar-dark' : 'navbar-light');
        themeToggleButton.innerHTML = storedTheme === 'dark-theme' ? 'Light Mode' : 'Dark Mode';
    } else {
        body.classList.add('light-theme');
        navbar.classList.add('navbar-light');
        themeToggleButton.innerHTML = 'Dark Mode';
    }

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            navbar.classList.replace('navbar-light', 'navbar-dark');
            themeToggleButton.innerHTML = 'Light Mode';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            navbar.classList.replace('navbar-dark', 'navbar-light');
            themeToggleButton.innerHTML = 'Dark Mode';
            localStorage.setItem('theme', 'light-theme');
        }
    });
});
// End of home section


// Start of about section
// Event listener for the contact form submission
document.addEventListener('DOMContentLoaded', function() {

    // Handle navbar toggle on smaller screens
    const navbarToggle = document.querySelector('#about-navbar .navbar-toggle');
    const navbarLinks = document.querySelector('.about-nav-links');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
        });
    }

    // Contact form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');
            
            // Basic form validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // If validation passes
            alert('Thank you for your message!');
            contactForm.reset(); // Clear form fields after submission
        });
    }

});



// Start of products section
// Sample product data
const products = [
    {
        id: 1,
        name: 'Combo Set 1',
        category: 'combo',
        price: 50.00,
        image: 'path_to_image1.jpg',
        discount: 10,
    },
    {
        id: 2,
        name: 'Rose Bouquet',
        category: 'roses',
        price: 30.00,
        image: 'path_to_image2.jpg',
        discount: 5,
    },
    {
        id: 3,
        name: 'Peony Arrangement',
        category: 'peonies',
        price: 40.00,
        image: 'path_to_image3.jpg',
        discount: 0,
    },
    {
        id: 4,
        name: 'Hydrangea Collection',
        category: 'hydrangeas',
        price: 60.00,
        image: 'path_to_image4.jpg',
        discount: 15,
    },
    {
        id: 5,
        name: 'Combo Set 2',
        category: 'combo',
        price: 55.00,
        image: 'path_to_image5.jpg',
        discount: 10,
    },
    {
        id: 6,
        name: 'Rose and Peony Mix',
        category: 'roses',
        price: 45.00,
        image: 'path_to_image6.jpg',
        discount: 0,
    }
];

// DOM elements
const boxContainer = document.getElementById('products-box-container');
const filterButtons = document.querySelectorAll('.products-filter-btn');
const themeToggle = document.getElementById('themeToggle');
const cartCount = document.getElementById('cartCount');

// To hold the cart items
let cart = [];

// Function to render products dynamically
function renderProducts(filter = 'all') {
    // Clear current products
    boxContainer.innerHTML = '';

    // Filter products based on selected category
    const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);

    // Create product cards
    filteredProducts.forEach(product => {
        const productBox = document.createElement('div');
        productBox.classList.add('products-box');

        // Create the discount label
        const discount = product.discount > 0 ? `<div class="products-discount">${product.discount}% OFF</div>` : '';

        // Create the product image and icons
        const productImage = `
            <div class="products-image">
                ${discount}
                <img src="${product.image}" alt="${product.name}">
                <div class="products-icons">
                    <a href="#" class="products-cart-btn" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></a>
                    <a href="#" class="products-heart-btn"><i class="fas fa-heart"></i></a>
                </div>
            </div>
        `;

        // Create the content area
        const productContent = `
            <div class="products-content">
                <h3>${product.name}</h3>
                <div class="products-price">
                    $${product.price}
                    ${product.discount > 0 ? `<span>$${(product.price + (product.price * product.discount / 100)).toFixed(2)}</span>` : ''}
                </div>
            </div>
        `;

        // Append the product box with image and content
        productBox.innerHTML = productImage + productContent;
        boxContainer.appendChild(productBox);
    });
}

// Function to handle filter button clicks
function applyFilter(category) {
    // Update the active class on buttons
    filterButtons.forEach(button => {
        if (button.textContent.toLowerCase() === category || category === 'all') {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Render products based on the selected filter
    renderProducts(category);
}

// Function to add items to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        cartCount.textContent = cart.length;  // Update cart count
    }
}

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.classList.toggle('btn-light');
    themeToggle.classList.toggle('btn-dark');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Login/Sign Up functionality
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    // Implement actual login logic here
    alert(`Login Successful: ${username}`);
    closeModal('loginModal');
}

function signUpUser() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    // Implement actual sign-up logic here
    alert(`Sign Up Successful: ${username}`);
    closeModal('signUpModal');
}

// Initialize by rendering all products
renderProducts('all');


// Start of review section


// Start of explore section


// Start of contact section
// Play sound on button click
const audio = new Audio("select-click.mp3");
document.getElementById('contactSubmitBtn').addEventListener('click', function(event) {
    audio.play();
});

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    fetch('our-server-url', { 
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        handleSuccess(data.message || "Message sent successfully!");
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        alert('There was an error sending your message. Please try again.');
    });
});

function handleSuccess(successMessage) {
    alert(successMessage); 
    document.getElementById('contactForm').reset(); 
}

// FAQ Accordion functionality
let li = document.querySelectorAll(".faq-text li");
for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", (e) => {
        let clickedLi;
        if (e.target.classList.contains("question-arrow")) {
            clickedLi = e.target.parentElement;
        } else {
            clickedLi = e.target.parentElement.parentElement;
        }
        clickedLi.classList.toggle("showAnswer");
    });
}

// Theme toggle functionality (same as before)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;
    const navbar = document.getElementById('navbar');

    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        body.classList.add(storedTheme);
        navbar.classList.add(storedTheme === 'dark-theme' ? 'navbar-dark' : 'navbar-light');
        themeToggleButton.innerHTML = storedTheme === 'dark-theme' ? 'Light Mode' : 'Dark Mode';
    } else {
        body.classList.add('light-theme');
        navbar.classList.add('navbar-light');
        themeToggleButton.innerHTML = 'Dark Mode';
    }

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            navbar.classList.replace('navbar-light', 'navbar-dark');
            themeToggleButton.innerHTML = 'Light Mode';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            navbar.classList.replace('navbar-dark', 'navbar-light');
            themeToggleButton.innerHTML = 'Dark Mode';
            localStorage.setItem('theme', 'light-theme');
        }
    });
});
