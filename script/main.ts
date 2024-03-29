/*
    File: home.js
    Author: Maryam Heidary (100868524), Masooma Haidari (100868525)
    Description: JavaScript file for the main homepage of the Harmony Hub website showcasing community engagement,
    personal development, and connections.
    Date: 2024/27/01
*/
//import Chart from 'chart.js/auto';


(function()
{

    function createChartFromJSON(): void {
        // Fetch data from JSON file
        $.getJSON('../data/statistics.json', function(data) {
            // Configuration for the chart using the fetched data
            const config: any = {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Sales',
                        data: data.data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };

            // Get the canvas element
            const canvasElement = document.getElementById('myChart') as HTMLCanvasElement;

            // Ensure canvas element exists before creating the chart
            if (canvasElement) {
                // Create the chart
                const myChart = new Chart(canvasElement, config);
            } else {
                console.error('Canvas element "myChart" not found.');
            }
        });
    }

// Call the function after the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Call the function after a delay
        setTimeout(createChartFromJSON, 1000); // Delay execution for 1 second (adjust as needed)
    });





    /**
     * Sets up event listeners for navigation links found within list items or the unordered list
     * Removes any existing clicks and mouseover events before re-establishing new ones to control
     * navigation behaviour and visual cues.
     * @constructor
     */
    function AddNavigationEvents():void{
        let navLinksExtra = $(".navbar-brand");
        let navlinks = $("ul>li>a");

        navLinksExtra.off("click");
        navLinksExtra.off("mouseover");

        navlinks.off("click");
        navlinks.off("mouseover");

        navlinks.on("click",function(){
            LoadLink($(this).attr("data") as string);
        });

        navLinksExtra.on("click",function(){
            LoadLink($(this).attr("data") as string);
        });

        navlinks.on("mouseover",function(){
            $(this).css("cursor","pointer")
        });

        navLinksExtra.on("mouseover",function(){
            $(this).css("cursor","pointer")
        });

    }

    /**
     * Updates the application current active link,manages authentication and updates browser history
     * It also updates the navigation UI to reflect the current active link and loads the corresponding content
     * @param link
     * @param data
     * @constructor
     */
    function LoadLink(link:string, data:string = ""):void{

        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data;

        history.pushState({},"",router.ActiveLink);

        document.title = CapitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each(function(){
            $(this).removeClass("active");
        });

        $(".navbar-brand").each(function(){
            $(this).removeClass("active");
        });

        $("li>a:contains(${document.title})").addClass("active");

        LoadContent();

    }

    function AuthGuard(){
        let protected_routes = ["contact-list"];

        if(protected_routes.indexOf(router.ActiveLink) >- 1) {

            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }

    // function CheckLogin(){
    //     if(sessionStorage.getItem("user")){
    //         $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-undo"></i> Logout</a>`)
    //     }
    //
    //     $("#logout").on("click",function(){
    //
    //         sessionStorage.clear();
    //         $("#login").html(`<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`)
    //         LoadLink("home");
    //     });
    // }

    /**
     *
     *
     */
    function ContactFormValidation(){
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid First and Last Name." )
        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a contact number." )
        ValidateField("#email",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid email address." )

    }

    /**
     * Test Regular Expression for Full Name Input
     *
     */
    function ValidateField(input_field_id:string,regular_expression:RegExp,error_message:string){

        let messageArea = $("#messageArea").hide();
        // let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;

        $(input_field_id).on("blur",function (){
            console.log("test");
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
                //fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else{
                messageArea.removeClass("class").hide();
            }
        });
    }






//
//
// // Project details array
// const projectDetails = [
//     {
//         title: "Community Learning Platform",
//         description: "Developed an online learning platform for the community hub, offering a variety of classes, workshops, and educational resources for people of all ages and backgrounds.",
//         technologies: "React, Node.js, MongoDB, WebRTC",
//         role: "Full Stack Developer",
//         image: './file/img_1.png'
//     },
//     {
//         title: "Volunteer Management System",
//         description: "Created a volunteer management system to streamline the process of organizing and coordinating community events, projects, and activities with the help of dedicated volunteers.",
//         technologies: "Django, PostgreSQL, Bootstrap, AWS",
//         role: "Backend Developer",
//         image: './file/img_4.png'
//     },
//     {
//         title: "Community Social Network",
//         description: "Designed and implemented a social networking platform for the community hub, fostering communication, collaboration, and the sharing of ideas among community members.",
//         technologies: "Vue.js, Firebase, Real-time Database, Authentication",
//         role: "Frontend Developer",
//         image: './file/img_3.png'
//     },
//
// ];

// Dynamically create and append the video element
    document.addEventListener('DOMContentLoaded', function () {
        // This assumes that the URL is correct and the image file is in the specified location
        document.body.style.backgroundImage = 'url(./file/img_8.png)';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    });

//
//
//
// // Function to generate a project card
// Define an interface for the Project type
    interface Project {
        title: string;
        description: string;
        technologies: string;
        role: string;
        image: string;
    }

    // Function to generate a project card
    // function createProjectCard(project: Project) {
    //     const card = document.createElement('div');
    //     card.classList.add('project-card');
    //
    //     const titleElement = document.createElement('h2');
    //     titleElement.textContent = project.title;
    //
    //     const descriptionElement = document.createElement('p');
    //     descriptionElement.textContent = `Project Description: ${project.description}`;
    //
    //     const technologiesElement = document.createElement('p');
    //     technologiesElement.textContent = `Key Technologies Used: ${project.technologies}`;
    //
    //     const roleElement = document.createElement('p');
    //     roleElement.textContent = `Role: ${project.role}`;
    //
    //     const imageElement = document.createElement('img');
    //     imageElement.src = project.image;
    //     imageElement.alt = project.title;
    //
    //     // Make only the first image smaller
    //     if (project.image === projectDetails[0].image) {
    //         imageElement.style.maxWidth = '50%';
    //         imageElement.style.height = 'auto';
    //     }
    //
    //     card.appendChild(titleElement);
    //     card.appendChild(descriptionElement);
    //     card.appendChild(technologiesElement);
    //     card.appendChild(roleElement);
    //     card.appendChild(imageElement);
    //
    //     return card;
    // }

//
//
// // Define variables
// let projectsPerLoad = 1;
// let currentProjects = projectDetails.slice(0, projectsPerLoad);
//
// const loadMoreBtn = document.getElementById('load-more-btn');
//
// // Display projects function
// // Make sure this variable is initialized correctly, pointing to the container in your HTML
//     const projectContainer: HTMLElement = document.getElementById('projectContainer') as HTMLElement;
//
//     function displayProjects(projects: Project[]) {
//         // Clear the container
//         projectContainer.innerHTML = '';
//
//         // Iterate through the projects and display them
//         projects.forEach((project) => {
//             const card = createProjectCard(project);
//             projectContainer.appendChild(card);
//         });
//     }
//
//
// // Load more projects function
//
//
//     function loadMoreProjects() {
//         if (!loadMoreBtn) return; // Check if loadMoreBtn exists
//
//         projectsPerLoad += 1;
//         const currentProjects = projectDetails.slice(0, projectsPerLoad);
//         displayProjects(currentProjects);
//
//         // Hide 'Load More' button if all projects are displayed
//         if (projectsPerLoad >= projectDetails.length) {
//             if (loadMoreBtn) {
//                 loadMoreBtn.style.display = 'none';
//             }
//         }
//     }
    function generateFooter() {
        // Create footer element
        const footer = document.createElement('div');
        footer.id = 'footer';

        // Create paragraph element for footer text
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('footer-text');

        // Create copyright text
        const copyrightText = document.createTextNode('\u00A9 2024 Harmony Hub. All rights reserved. | ');
        paragraphElement.appendChild(copyrightText);

        // Create Privacy Policy link
        const privacyLink = document.createElement('a');
        privacyLink.href = '../view/content/privacy.html';
        privacyLink.textContent = 'Privacy Policy';
        paragraphElement.appendChild(privacyLink);

        // Append separator
        paragraphElement.appendChild(document.createTextNode(' | '));

        // Create Terms of Service link
        const termsLink = document.createElement('a');
        termsLink.href = '../view/content/terms.html';
        termsLink.textContent = 'Terms of Service';
        paragraphElement.appendChild(termsLink);

        // Append separator
        paragraphElement.appendChild(document.createTextNode(' | '));

        // Create Contact page link
        const contactLink = document.createElement('a');
        contactLink.href = '../view/content/contact.html';
        contactLink.textContent = 'Contact';
        paragraphElement.appendChild(contactLink);

        // Append paragraph element to footer
        footer.appendChild(paragraphElement);

        // Append footer to the body of the document
        document.body.appendChild(footer);
    }

    document.addEventListener('DOMContentLoaded', function() {
        generateFooter();
    });


// Function to create individual footer links
    function createFooterLink(text: string | null, link: string) {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');

        const navLink = document.createElement('a');
        navLink.classList.add('nav-link');
        navLink.href = link;
        navLink.textContent = text;


        navItem.appendChild(navLink);

        return navItem;
    }


//     let paragraphElement = document.createElement('p');
//     paragraphElement.style.color = 'white'; // Set text color to white
//
// // Create copyright text
//     let copyrightText = document.createTextNode('\u00A9 2024 Harmony Hub. All rights reserved. | ');
//
// // Append copyright text to paragraph element
//     paragraphElement.appendChild(copyrightText);
//
// // Append paragraph element to footer
//     footerElement.appendChild(paragraphElement);
//
//
//     // Create Privacy Policy link
//     // Create Privacy Policy link
//     let privacyLink = document.createElement('a');
//     privacyLink.href = 'privacy.html';
//     privacyLink.textContent = 'Privacy Policy';
//     privacyLink.style.color = 'white'; // Set color to white
//
// // Create Terms of Service link
//     let termsLink = document.createElement('a');
//     termsLink.href = 'terms.html';
//     termsLink.textContent = 'Terms of Service';
//     termsLink.style.color = 'white'; // Set color to white
//
// // Create Contact page link
//     let contactLink = document.createElement('a');
//     contactLink.href = 'contact.html';
//     contactLink.textContent = 'Contact';
//     contactLink.style.color = 'white'; // Set color to white
//
//
//     // Append elements
//     paragraphElement.appendChild(copyrightText);
//     paragraphElement.appendChild(privacyLink);
//     paragraphElement.appendChild(document.createTextNode(' | ')); // Pipe separator
//     paragraphElement.appendChild(termsLink);
//     paragraphElement.appendChild(document.createTextNode(' | ')); // Pipe separator
//     paragraphElement.appendChild(contactLink);
//
//     footerElement.appendChild(paragraphElement);
//
//     // Append footer to the body
//     document.body.appendChild(footerElement);
// });


    // document.addEventListener('DOMContentLoaded', function () {
    //     // Create a new list item element
    //     const listItem = document.createElement('li');
    //     listItem.classList.add('nav-item');
    //
    //     // Create a new anchor element
    //     const anchor = document.createElement('a');
    //     anchor.classList.add('nav-link');
    //     anchor.href = "career.html"; // Set the href attribute to the desired URL
    //     anchor.textContent = "Careers"; // Set the text content of the link
    //
    //     // Append the anchor element to the list item
    //     listItem.appendChild(anchor);
    //
    //     // Get the navbar list and append the new list item to it
    //     const navbarList = document.querySelector('.navbar-nav') as HTMLUListElement; // Cast it to the specific element type you expect
    //
    //     // Ensure that navbarList is not null before trying to append to it
    //     if (navbarList) {
    //         navbarList.appendChild(listItem);
    //     } else {
    //         console.error('The navbar list was not found in the document.');
    //     }
    // });

    function loadBlogPosts() {
        $.ajax({
            url: './data/news.json', // URL of your JSON file containing blog posts
            method: 'GET',
            success: function (response: any[]) {
                // Display all posts
                response.forEach(function(post) {
                    $('#blog-container').append('<div class="blog-article"><h2>' + post.title + '</h2><p>' + post.content + '</p><a href="' + post.readMoreLink + '" class="read-more-link">Read More</a></div>');
                });
            },
            error: function (xhr: JQuery.jqXHR, status: string, error: string) {
                console.error('Error loading posts:', error);
            }
        });
    }





// Function to fetch weather data based on user location
    // main.ts

    function getWeather() {
        console.log("get weather called");
        const locationElement = document.getElementById('location') as HTMLInputElement;

        if (!locationElement) {
            console.error('Location input element not found');
            return;
        }

        const location = locationElement.value;
        const apiKey = '9GrRSOw4pQcNJ7LXvS3ClYDavhOtfJ84';
        const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${encodeURIComponent(location)}&fields=temperature,weatherCode&timesteps=current&units=metric&apikey=${apiKey}`;
        console.log("Location Element:", locationElement);
        console.log("Location Value:", location);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data.data || !data.data.timelines || !data.data.timelines[0] || !data.data.timelines[0].intervals || !data.data.timelines[0].intervals[0] || !data.data.timelines[0].intervals[0].values || !data.data.timelines[0].intervals[0].values.temperature || !data.data.timelines[0].intervals[0].values.weatherCode) {
                    throw new Error('Unexpected response format');
                }
                const currentWeather = data.data.timelines[0].intervals[0].values.temperature;
                const weatherCode = data.data.timelines[0].intervals[0].values.weatherCode;

                const weatherInfo = document.getElementById('weather-info');
                if (weatherInfo) {
                    weatherInfo.innerHTML = `Weather in ${location}: Temperature ${currentWeather}°C, Weather Code ${weatherCode}`;
                } else {
                    console.error('Weather info element not found');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }




// Function to fetch image data from a JSON file and populate the gallery
// Assuming BaguetteBox is already loaded and available


    // First, define the expected structure of your image data
    interface Image {
        src: string;
        alt: string;
        'data-title': string;
        'data-lightbox': string;
        caption?: string; // Assuming caption is optional
    }

// Then, define the AJAX request to fetch the images
    function fetchAndDisplayImages(): void {
        // Define AJAX request to fetch images
        $.ajax({
            url: './data/image.json',
            dataType: 'json',
            success: function (data) {
                // Type assertion for the data structure
                if (!Array.isArray(data.images)) {
                    console.error('Images property is missing or not an array');
                    return;
                }

                let images: Image[] = data.images;
                let desiredWidth = 200;
                let desiredHeight = 150;

                // Iterate over each image and dynamically create HTML elements
                images.forEach((image) => {
                    // Check if required properties exist on the image object
                    if (typeof image.src !== 'string' || typeof image.alt !== 'string') {
                        console.error('Image source or alt text is missing');
                        return;
                    }

                    // Combine title and caption for display in the gallery
                    const titleAndCaption = (image['data-title'] ? image['data-title'] + ' - ' : '') + (image.caption || '');

                    // Append image HTML elements to the gallery
                    $('#gallery').append(`
                    <a href="${image.src}" data-lightbox="${image['data-lightbox']}" data-title="${titleAndCaption}">
                        <img src="${image.src}" alt="${image.alt}" style="width: ${desiredWidth}px; height: ${desiredHeight}px;">
                        <div class="caption">${image['data-title']}</div>
                    </a>
                `);
                });

                // Initialize the lightbox gallery
                (window as any).baguetteBox.run('#gallery', {
                    overlayBackgroundColor: 'rgba(0,0,0,0.8)',
                    captions: function (element: any) { // Explicitly typed as any
                        if (element.getAttribute('data-opened') === 'true') {
                            const titleAndCaption = element.dataset.title || 'No title';
                            return '<div class="caption">' + titleAndCaption + '</div>';
                        } else {
                            const title = element.dataset.title || 'No title';
                            return '<div class="caption">' + title + '</div>';
                        }
                    },
                    afterShow: function (imageIndex: any, element: any) { // Explicitly typed as any
                        element.setAttribute('data-opened', 'true');
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error('Error loading images:', error);
            }
        });
    }




    function displayEventsPage() {
        fetchEventData();
        // @ts-ignore
        displayEvents();
    }

    function displayGallerysPage() {
        console.error('Gallery Page');
    }

// Function to fetch event data from JSON file
function fetchEventData() {
    $.ajax({
        url: './data/event.json',
        dataType: 'json',
        success: function (data) {
            // On success, call displayEvents function with the fetched data
            let events = data.events;
            displayEvents(events);
        },
        error: function (xhr, status, error) {
            // Handle errors that occur during fetching event data
            console.error('Error fetching event data:', status, error);
        }
    });
}

// Function to display events on the page
// Define an interface to describe the structure of an event object
    interface Event {
        title: string;
        date: string;
        time: string;
        location: string;
        description: string;
        image?: string; // The question mark indicates that this property is optional
    }

    function displayEvents(events: Event[]) {
        // Get reference to the event list container
        let eventList = $('#event-list');
        // Clear previous event items
        eventList.empty();

        // Iterate over each event and create event items
        events.forEach((event) => {
            let eventItem = $('<div class="event-item"></div>');
            // Append event details to the event item
            eventItem.append('<h2>' + event.title + '</h2>');
            eventItem.append('<p>Date: ' + event.date + '</p>');
            eventItem.append('<p>Time: ' + event.time + '</p>');
            eventItem.append('<p>Location: ' + event.location + '</p>');
            eventItem.append('<p>Description: ' + event.description + '</p>');

            // If event has an image, append it to the event item
            if (event.image) {
                eventItem.append('<img src="' + event.image + '" alt="' + event.title + '">');
            }

            // Append the event item to the event list container
            eventList.append(eventItem);
        });
    }




// Function to display weather information
    function displayWeather(location: string, temperature: number, weatherCode: number) {
        console.log('Weather Code:', weatherCode);

        const weatherInfoContainer = document.getElementById('weather-info');

        // Check if weatherInfoContainer is not null before setting its innerHTML
        if (weatherInfoContainer) {
            weatherInfoContainer.innerHTML = `
        <h2>Current Weather in ${location}</h2>
        <p>Temperature: ${temperature}°C</p>
        `;
        } else {
            console.error('Weather info container not found.');
        }
    }




// Define a function to be executed when the DOM is fully loaded

    interface Service {
        id: string;
        title: string;
        description: string;
        image: string;
    }


    function fetchAndDisplayServices() {
        console.error('service loaded');
        $.getJSON('../../data/service.json', function (data: Service[]) {
            const serviceContainer = $('#serviceDataPlaceholder');
            serviceContainer.empty(); // Clear existing content

            data.forEach(function (service) {
                const serviceTab = $('<div>').addClass('service-tab');
                const serviceName = $('<span>').text(service.title).appendTo(serviceTab);
                const chevronIcon = $('<i>').addClass('fa-solid fa-chevron-down').appendTo(serviceTab);
                serviceTab.appendTo(serviceContainer);

                const serviceContent = $('<div>').addClass('service-content').attr('id', service.id);
                $('<h3>').text(service.title).appendTo(serviceContent);
                $('<p>').text(service.description).appendTo(serviceContent);
                $('<img>').attr('src', service.image).attr('alt', service.title)
                    .css({'max-width': '50%', 'height': 'auto', 'display': 'block', 'margin': '0 auto'})
                    .appendTo(serviceContent);
                serviceContent.appendTo(serviceContainer);

                // Add click event listener to service tab
                serviceTab.on('click', function() {
                    // Toggle service content visibility
                    serviceContent.slideToggle();
                    // Toggle chevron icon direction
                    chevronIcon.toggleClass('fa-chevron-down fa-chevron-up');
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        fetchAndDisplayServices(); // Call the function when the document is ready
    });


    function fetchAndDisplayPortfolio() {
        $.getJSON('./data/portfolio.json', function (data: any[]) {
            const projectContainer = $('#projectContainer');
            projectContainer.empty(); // Clear existing content

            data.forEach(function (project: any) {
                // Create HTML elements for project details
                const projectDetails = $('<div>').addClass('project-details');
                $('<h2>').text(project.title).appendTo(projectDetails);
                $('<p>').text('Description: ' + project.description).appendTo(projectDetails);
                $('<p>').text('Technologies: ' + project.technologies).appendTo(projectDetails);
                $('<p>').text('Role: ' + project.role).appendTo(projectDetails);
                $('<img>').attr('src', project.image).attr('alt', project.title).appendTo(projectDetails);

                // Append project details to project container
                projectDetails.appendTo(projectContainer);
            });
        });
    }


    document.addEventListener('DOMContentLoaded', function() {
        fetchAndDisplayPortfolio(); // Call the function when the document is ready
    });



//Function to load header content dynamically
function LoadHeader() {
    console.log('LoadHeader called');
    // Load header content from header.html
    updateNavigation();
    $.get("header.html", function (html_data) {
        $("header").html(html_data); // Replace header content with loaded HTML

        // Check if user is logged in
        // if (sessionStorage.getItem("user")) {
        //     // If logged in, update navbar link to "Logout"
        //     $("#loginLink").text("Logout");
        //     $("#loginLink").attr("href", "login.html"); // Set logout page link
        //
        //     // Add click event handler for logout
        //     $("#loginLink").on("click", function () {
        //         sessionStorage.clear(); // Clear user session
        //         location.href = "index.html"; // Redirect to index page after logout
        //     });
        // } else {
        //     // If not logged in, update navbar link to "Login"
        //     $("#loginLink").text("Login");
        //     $("#loginLink").attr("href", "login.html"); // Set login page link
        // }
    });
}
//
//
//
    document.addEventListener("DOMContentLoaded", () => {
        LoadHeader();
    });



    function DisplayRegistrationPage() {

        // Validate Registration Form
        const validateRegistrationForm = (): boolean => {
            $(".form-control").removeClass("is-invalid");
            $(".invalid-feedback").empty();
            let isValid: boolean = true;

            const displayName: string = $("#displayName").val() as string;
            if (!displayName.match(/^[A-Za-z\s]+$/)) {
                $("#displayName").addClass("is-invalid");
                $("#displayName").siblings(".invalid-feedback").text("Please enter a valid display name (only letters and spaces).");
                isValid = false;
            }

            const emailAddress: string = $("#emailAddress").val() as string;
            if (!emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                $("#emailAddress").addClass("is-invalid");
                $("#emailAddress").siblings(".invalid-feedback").text("Please enter a valid email address.");
                isValid = false;
            }

            const phoneNumber: string = $("#phoneNumber").val() as string;
            if (!phoneNumber.match(/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/)) {
                $("#phoneNumber").addClass("is-invalid");
                $("#phoneNumber").siblings(".invalid-feedback").text("Please enter a valid phone number.");
                isValid = false;
            }

            const address: string = $("#address").val() as string;
            if (!address) {
                $("#address").addClass("is-invalid");
                $("#address").siblings(".invalid-feedback").text("Please enter your address.");
                isValid = false;
            }

            return isValid;
        }


        document.addEventListener("DOMContentLoaded", function () {
            const currentPage: string = location.pathname.split("/").pop() as string;
            const navLinks = document.querySelectorAll("header nav ul.navbar-nav li a");

            navLinks.forEach((navLinkElement) => {
                const navLink = navLinkElement as HTMLElement; // Type assertion
                const navItemLink: string | null = navLink.getAttribute("href");

                if (navItemLink && (navItemLink === currentPage || navItemLink === "../view/" + currentPage)) {
                    navLink.classList.add("active");
                    navLink.style.fontWeight = "bold";
                }
            });
        });


        // Event listener for register button click
        $("#registerButton").click(function (event) {
            event.preventDefault(); // Prevent default form submission behavior

            // Validate the registration form
            if (validateRegistrationForm()) {
                // Form is valid, proceed with registration process
                // You can submit the form data to the server or perform other actions here
                alert("Registration successful!");

                // Reset the form fields
                const form = $("#registrationForm").get(0) as HTMLFormElement;
                form.reset();
            }

        });
        registerLinkHandler();

    }
// Event listener for DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", function () {
        const currentPage: string = location.pathname.split("/").pop() as string;
        const navLinks = document.querySelectorAll("header nav ul.navbar-nav li a");

        navLinks.forEach((navLink) => {
            const navItemLink: string = navLink.getAttribute("href") as string;
            if (navItemLink && (navItemLink === currentPage || navItemLink === "../view/" + currentPage)) {
                navLink.classList.add("active");
                (navLink as HTMLElement).style.fontWeight = "bold";
            }
        });
    });




// Function to validate email format
    function validateEmail(email: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


// Function to show confirmation modal and populate with user input
    function showConfirmationModal() {
        // Safely get user input from form fields with TypeScript assertions
        const nameElement = document.getElementById('name') as HTMLInputElement | null;
        const emailElement = document.getElementById('email') as HTMLInputElement | null;
        const subjectElement = document.getElementById('subject') as HTMLInputElement | null;
        const messageElement = document.getElementById('message') as HTMLTextAreaElement | null; // Assuming it's a textarea
        const ratingElement = document.getElementById('ratingSelect') as HTMLSelectElement | null; // Assuming it's a select element

        // Check if all elements are found
        if (!nameElement || !emailElement || !subjectElement || !messageElement || !ratingElement) {
            alert('Some form elements could not be found.');
            return;
        }

        // Trim the values from the form elements
        const name = nameElement.value.trim();
        const email = emailElement.value.trim();
        const subject = subjectElement.value.trim();
        const message = messageElement.value.trim();
        const rating = ratingElement.value; // .trim() is not necessary for a select element

        // Validate form fields
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Display confirmation modal
        const modal = document.getElementById('confirmationModal');
        if (modal) {
            modal.style.display = 'block';

            // Populate confirmation modal with user input
            const confirmName = document.getElementById('confirmName');
            const confirmEmail = document.getElementById('confirmEmail');
            const confirmSubject = document.getElementById('confirmSubject');
            const confirmMessage = document.getElementById('confirmMessage');
            const confirmRating = document.getElementById('confirmRating');

            if (confirmName) confirmName.textContent = name;
            if (confirmEmail) confirmEmail.textContent = email;
            if (confirmSubject) confirmSubject.textContent = subject;
            if (confirmMessage) confirmMessage.textContent = message;
            if (confirmRating) confirmRating.textContent = getRatingText(rating); // Assuming getRatingText is defined elsewhere
        } else {
            console.error('Confirmation modal not found.');
        }
    }

    function hideConfirmationModal() {
        const modal = document.getElementById('confirmationModal');
        if (modal) {
            modal.style.display = 'none';
        } else {
            console.error('Confirmation modal not found.');
        }
    }


// Function to convert rating value to text
    function getRatingText(ratingValue: string): string {
        switch (ratingValue) {
            case '5':
                return 'Excellent';
            case '4':
                return 'Good';
            case '3':
                return 'Fair';
            case '2':
                return 'Poor';
            case '1':
                return 'Very Poor';
            default:
                return '';
        }
    }


// Function to submit form and display modal
    function submitForm() {
        hideConfirmationModal();

        // Display modal for form submission confirmation
        const modal = document.getElementById("myModal");
        if (!modal) {
            console.error("Modal element not found.");
            return; // Exit the function if modal isn't found
        }
        modal.style.display = "block";

        // Countdown timer before redirecting to home page
        let seconds: number = 5;
        let countdownElement: HTMLElement | null = document.getElementById("countdown");
        if (!countdownElement) {
            console.error("Countdown element not found.");
            return; // Exit the function if countdownElement isn't found
        }

        let countdownInterval = setInterval(function () {
            seconds--;
            const element = countdownElement; // Use a temporary variable
            element && (element.textContent = seconds.toString()); // Assign using the temporary variable
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                window.location.href = "home.html"; // Redirect to home page
            }
        }, 1000);
    }

    function DisplayCareerPage() {
    console.error('Gallery Page');
}

function DisplayLoginPage() {
    console.error('Gallery Page');
}

    function DisplayServicePage()
    {
        console.log("Called DisplayServicePage")
    }

function DisplayContactPage() {
    console.error('contact Page');
}
function DisplayHomePage() {
    console.error('home Page');
}
function DisplayAboutPage() {
    console.error('about Page');
}
    // Function to update navigation link
    // Function to update navigation links based on user login status
    // Function to update the login/logout link and visibility of "Statistics" and "Planning" links
    function updateNavigation(): void {
        const displayName: string | null = sessionStorage.getItem("displayName");
        const loginLink: JQuery<HTMLElement> = $("#loginLink");
        const statisticsLink: JQuery<HTMLElement> = $("#statisticsLink");
        const planningLink: JQuery<HTMLElement> = $("#PlanningLink");

        if (displayName) {
            // If user is logged in
            loginLink.text("Logout").data("action", "logout");
            statisticsLink.show();
            planningLink.show();
        } else {
            // If user is not logged in
            loginLink.text("Login").data("action", "login");
            statisticsLink.hide();
            planningLink.hide();
        }
    }

// Event listener for login/logout link
    $("#loginLink").on("click", function () {
        const action: string | undefined = $(this).data("action");

        if (action === "logout") {
            // Remove user from session storage
            sessionStorage.removeItem("displayName");
        }

        // Update navigation links after login/logout
        updateNavigation();
    });





// Function to display the login page
    function displayLoginPage(): void {
        console.log("Displaying login page...");
        registerLinkHandler();

        // Event listener for login button
        $("#loginButton").on("click", function () {
            // Get username and password from input fields
            let username: string = $("#username").val() as string;
            let password: string = $("#password").val() as string;

            // Load user data from JSON file
            $.getJSON("./data/users.json", function (data: { users: { Username: string, Password: string, DisplayName: string }[] }) {
                // Loop through user data
                for (const user of data.users) {
                    // Check if entered username and password match
                    if (username === user.Username && password === user.Password) {
                        // Store display name in session storage
                        sessionStorage.setItem("displayName", user.DisplayName);
                        // Redirect to index page
                        location.href = "index.html";
                        // Update navigation links after login
                        updateNavigation();
                        return; // Exit loop since match is found
                    }
                }

                // If login failed, display error message
                $("#username").trigger("focus").trigger("select");
                $("#messageArea")
                    .addClass("alert alert-danger")
                    .text("Error: Invalid Credentials")
                    .show();
            });
        });

        // Event listener for cancel button
        $("#cancelButton").on("click", function () {
            // Reset form and redirect to index page
            document.forms[0].reset();
            location.href = "index.html";
        });
    }




    // Define the interface for event data
    interface EventData {
        id: number;
        title: string;
        description: string;
        location: string;
        date: string;
        time: string;
        organizer: string;
        participants: string[];
        image: string;
    }

// Function to display event planning data
    function displayEventPlanningData(): void {
        // Fetch event planning data from JSON file
        fetch('../data/planning.json')
            .then(response => response.json())
            .then((data: { events: EventData[] }) => {
                // Iterate over each event item
                data.events.forEach(eventItem => {
                    // Create HTML elements to display event information
                    const eventPlanningContainer = document.createElement('div');
                    eventPlanningContainer.classList.add('event-planning-item');

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = eventItem.title;

                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = eventItem.description;

                    const organizerElement = document.createElement('p');
                    organizerElement.innerHTML = `<strong>Organizer:</strong> ${eventItem.organizer}`;

                    const dateElement = document.createElement('p');
                    dateElement.innerHTML = `<strong>Date:</strong> ${eventItem.date}`;

                    const timeElement = document.createElement('p');
                    timeElement.innerHTML = `<strong>Time:</strong> ${eventItem.time}`;

                    // Append event elements to the event planning container
                    eventPlanningContainer.appendChild(titleElement);
                    eventPlanningContainer.appendChild(descriptionElement);
                    eventPlanningContainer.appendChild(organizerElement);
                    eventPlanningContainer.appendChild(dateElement);
                    eventPlanningContainer.appendChild(timeElement);

                    // Append the event planning container to the main container in the HTML page
                    const mainContainer = document.querySelector('.container');
                    if (mainContainer) {
                        mainContainer.appendChild(eventPlanningContainer);
                    } else {
                        console.error('Main container not found');
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching event planning data:', error);
            });
    }

    function registerLinkHandler() {
        // Event listener for registration link
        $('a[data="register"]').on('click', () => {
            // Redirect to the registration page
            window.location.href = '../view/content/register.html'; // Replace 'register.html' with the actual URL of your registration page
        });
    }


// Call the function to attach the event listener to the registration link
    registerLinkHandler();

    function ActiveLinkCallback(){
    switch(router.ActiveLink){
        case "home": return LoadHeader;
        case "blog": return loadBlogPosts;
        case "service": return fetchAndDisplayServices;
        case "contact": return DisplayContactPage;
        case "events": return displayEventsPage;
        case "register": return DisplayRegistrationPage;
        case "portfolio": return fetchAndDisplayPortfolio;
        case "weather": return  getWeather;
        case "gallery": return fetchAndDisplayImages;
        case "career": return DisplayCareerPage;
        case "login": return displayLoginPage;
        case "statistics": return createChartFromJSON;
        case "events-planning": return displayEventPlanningData;
        default:
            console.error("Error callback function does not exist" + router._activeLink);
            return new Function();
    }
}
    function CapitalizeFirstCharacter(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    ActiveLinkCallback();

    function LoadHeaderone(){
        console.log("header");
        $.get("./view/components/header.html", function(html_data)
        {
            $("header").html(html_data);
            document.title = CapitalizeFirstCharacter(router.ActiveLink);

            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current","page");
            updateNavigation();
            AddNavigationEvents();
            //CheckLogin();
        });
    }

    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./view/content/${page_name}.html`,function(html_data){
            $("main").html(html_data);
            //CheckLogin();
            callback();

        });
    }
    LoadContent();

    ActiveLinkCallback();
    function LoadFooter(){
        $.get("./view/components/footer.html", function(html_data){
            $("footer").html(html_data);
        });
    }

    function Start(){
        console.log("App Started...");
        updateNavigation();
        LoadHeaderone();
        LoadLink("home");

        ActiveLinkCallback();



    }
    window.addEventListener("load", Start)



})()