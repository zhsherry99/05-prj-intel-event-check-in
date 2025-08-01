// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const counter = document.getElementById("attendeeCount");
const progress = document.getElementById("progressBar");

// Track attendance
let count = 0;
const maxCount = 50;

// Hide greeting initially
greeting.style.display = "none";

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment count
  count++;
  counter.textContent = count;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progress.style.width = percentage;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  greeting.textContent = `🎉 Welcome, ${name} from ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  // Reset form
  form.reset();
});
