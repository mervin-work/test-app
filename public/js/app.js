var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});
// document.addEventListener('DOMContentLoaded', function () {
//     var calendarEl = document.getElementById('calendar');
    
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         plugins: ['interaction', 'dayGrid', 'timeGrid'],
//         selectable: true,
//         editable: true,
//         eventStartEditable: true,
//         eventDurationEditable: true,
//         droppable: true,
//         eventOverlap: false,
//         // Add more configuration options as needed
        
//         // Define event drop and select callbacks
//         select: function (info) {
//             // Handle date selection logic here
//             // You can show a modal to create events via API
//         },
//         eventDrop: function (info) {
//             // Handle event drag-and-drop logic here
//             // Update the event via API
//         },
//     });

//     calendar.render();
// });
