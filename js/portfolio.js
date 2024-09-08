const Navbar = document.getElementById("navbar");
let lastScrollY = window.scrollY;
let isNavHidden = false;
let scrollTimeout;
let isManualScroll = false;  // Flag to detect if scroll was triggered by the button

// Function to hide the navbar
function hideNavBar() {
    Navbar.style.transition = "transform 0.3s ease";
    Navbar.style.transform = "translateY(-100px)";  // Move it up
    isNavHidden = true;
}

// Function to show the navbar
function showNavBar() {
    Navbar.style.transition = "transform 0.3s ease";
    Navbar.style.transform = "translateY(0)";  // Move it back to original position
    isNavHidden = false;
}

// Function to handle scroll events
function handleScroll() {
    if (isManualScroll) return;  // Skip scroll events triggered by anchor link/button

    const currentScrollY = window.scrollY;

    // Check scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 25 && !isNavHidden) {
        // Scrolling down and passed a threshold, hide navbar
        hideNavBar();
    } else if (currentScrollY < lastScrollY && isNavHidden) {
        // Scrolling up, show navbar
        showNavBar();
    }

    lastScrollY = currentScrollY;
}

// Function to detect manual scroll via button
function manualScroll() {
    isManualScroll = true;

    // Allow some time for the scroll to finish, then reset the flag
    setTimeout(() => {
        isManualScroll = false;
    }, 400);  // Adjust time based on expected scroll duration
}

// Debounced scroll event handler
window.addEventListener('scroll', function () {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 100);  // Debounce by 100ms
});

var nav_buttons = Navbar.getElementsByClassName("nav-link")

for(let i=0; i < nav_buttons.length; i++){
    nav_buttons[i].addEventListener("click", function () {
        hideNavBar()
    })
}

