const toggleLink = document.querySelector('.toggle');
const dropdown = document.querySelector('.dropdown');

// Toggle dropdown when clicking on the "Maintenance" link
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('active');
});

// Hide dropdown if clicking outside
document.addEventListener('click', (e) => {
  // If the click is outside the toggle link and dropdown, retract it
  if (!dropdown.contains(e.target) && !toggleLink.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});







