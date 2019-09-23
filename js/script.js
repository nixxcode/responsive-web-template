/*  Document click handler, called on all body clicks. For now this is only 
    used to toggle dropdowns. */
function documentClick(event) {
    //var clickedElement = event.target;
    this.tryToggleDropdown(event);
}

/*  Collapses all dropdown menus except the specified exception. 
    Ensures only one dropdown is ever expanded at the same time. */
function collapseAllDropdownsExcept(except) {
    var dropdowns = document.getElementsByClassName("dropdown-container");

    for(var i = 0; i < dropdowns.length; i++) {
        var dropdown = dropdowns.item(i);
        if(dropdown !== except) dropdown.style.display = "none";
    }
}

// Toggles the expand/collapse of the clicked dropdown menu
function tryToggleDropdown(event) {
    var clicked = event.target;
    var element;

    /*  The dropdowns contain arrow icons, so we need to test both
        the clicked element, as well as the parent */
    if(clicked.getAttribute("name") != "dropdown") {
        
        // We didn't click a dropdown, so collapse all existing dropdown menus
        if(clicked.parentElement.getAttribute("name") != "dropdown") {
            collapseAllDropdownsExcept(null);
            return;
        } 
        // We clicked the arrow icon, so refer to the parent element
        else {
            element = clicked.parentElement;
        }
    } 
    // We clicked the parent element
    else {
        element = clicked;
    }

    // Collapse all dropdown-containers except the one currently being handled
    var container = element.nextElementSibling;
    collapseAllDropdownsExcept(container);

    // Toggle dropdown-container display
    if(container.style.display === "none") container.style.display = "block";
    else container.style.display = "none";
}

// Toggles the expand/collapse of the nav menu when the nav button is clicked
function toggleNav() {
    var nav = document.getElementById("navbar");

    if(nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
}

/*  Ensures the nav menu always starts out hidden when screen width is at or below 992px.
    The menu can then be toggled hidden or shown via the button
    
    When wider than 992px, we set the inline style to an empty string. This is so the external CSS file 
    can take over responsibility for nav menu display when a toggle button is no longer needed. */
function hideNav(query) {
    var nav = document.getElementById("navbar");
    
    if (query.matches) { // If media query matches                  
        nav.style.display = "none";
    } else {
        nav.style.display = "";    
    }
}

function test() {
    console.log("Clicked!");
}


var query = window.matchMedia("(max-width: 992px)");
hideNav(query); // Call listener function at run time
query.addListener(hideNav); // Attach listener function on state changes