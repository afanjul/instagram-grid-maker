// app/scripts/script.js

// Vanilla JavaScript example to demonstrate functionality

// Function to initialize event listeners
function init() {
    // Select the navbar and the target elements
    var $navbar = document.querySelector(".nav-menu");
    var appScrollPosition = 0;
    var scheduledAnimationFrame = false;
    var appScroll = appScrollForward; // Initialize with the forward scroll function


    // Function to handle app scroll reverse
    function appScrollReverse() {
        scheduledAnimationFrame = false;
        if (appScrollPosition >= 50)
            return;
        $navbar.classList.remove("is-scrolling");
        $navbar.classList.add("is-not-scrolling");
        appScroll = appScrollForward;
    }

    // Function to handle app scroll forward
    function appScrollForward() {
        scheduledAnimationFrame = false;
        if (appScrollPosition < 50)
            return;
        $navbar.classList.add("is-scrolling");
        $navbar.classList.remove("is-not-scrolling");
        appScroll = appScrollReverse;
    }

    // Function to handle app scroll
    function appScrollHandler() {
        appScrollPosition = window.pageYOffset;
        if (scheduledAnimationFrame)
            return;
        scheduledAnimationFrame = true;
        requestAnimationFrame(appScroll);
    };

    // Initialize app scroll
    appScrollHandler();
    window.addEventListener('scroll', appScrollHandler);

    // Select the navbar links and add event listeners
    var navbarLinks = document.querySelectorAll('.navbar-nav > li:not(.dropdown) > a');
    navbarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            var navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.remove('show');
        });
    });

    // Select the site nav and add event listeners
    var siteNav = document.querySelector('#navbar');
    siteNav.addEventListener('show.bs.collapse', function(e) {
        siteNav.parentNode.classList.add('menu-is-open');
        siteNav.parentNode.classList.remove('menu-is-closed');
    });
    siteNav.addEventListener('hide.bs.collapse', function(e) {
        siteNav.parentNode.classList.remove('menu-is-open');
        siteNav.parentNode.classList.add('menu-is-closed');
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', init);

// Function to initialize tooltips and popovers
function initTooltipsAndPopovers() {
    // Select the tooltip and popover elements
    var tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    var popovers = document.querySelectorAll('[data-toggle="popover"]');

    // Initialize tooltips
    tooltips.forEach(function(tooltip) {
        tooltip.addEventListener('mouseover', function() {
            var tooltipText = tooltip.getAttribute('data-tooltip');
            var tooltipElement = document.createElement('div');
            tooltipElement.classList.add('tooltip');
            tooltipElement.innerHTML = tooltipText;
            tooltip.appendChild(tooltipElement);
        });
        tooltip.addEventListener('mouseout', function() {
            var tooltipElement = tooltip.querySelector('.tooltip');
            if (tooltipElement) {
                tooltip.removeChild(tooltipElement);
            }
        });
    });

    // Initialize popovers
    popovers.forEach(function(popover) {
        popover.addEventListener('focus', function() {
            var popoverText = popover.getAttribute('data-popover');
            var popoverElement = document.createElement('div');
            popoverElement.classList.add('popover');
            popoverElement.innerHTML = popoverText;
            popover.appendChild(popoverElement);
        });
        popover.addEventListener('blur', function() {
            var popoverElement = popover.querySelector('.popover');
            if (popoverElement) {
                popover.removeChild(popoverElement);
            }
        });
    });
}

// Ensure the window is fully loaded before running the script
window.addEventListener('load', initTooltipsAndPopovers);

// Function to open a new window
function poptastic(url, windowName, width, height) {
    var newWindow;
    if (width === undefined)
        width = window.innerWidth > 1000 ? 1000 : window.innerWidth - 80;
    if (height === undefined)
        height = window.innerHeight > 768 ? 768 : window.innerHeight - 80;
    newWindow = window.open(url, windowName, "width=" + width + "," + "height=" + height);
    if (window.focus)
        newWindow.focus()
}