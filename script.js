// grabs elements to interact with in javascript
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
const maxCount = 50;
let counts = {
  total: 0,
  water: 0,
  zero: 0,
  power: 0,
};
// Store attendees as array of objects: { name, team }
let attendees = [];

// Load counts and attendees from localStorage or set to 0/empty
function loadCounts() {
  const saved = localStorage.getItem("attendanceCounts");
  if (saved) {
    counts = JSON.parse(saved);
  }
  const savedAttendees = localStorage.getItem("attendeeList");
  if (savedAttendees) {
    attendees = JSON.parse(savedAttendees);
  }
  // Update UI
  document.getElementById("attendeeCount").textContent = counts.total;
  document.getElementById("waterCount").textContent = counts.water;
  document.getElementById("zeroCount").textContent = counts.zero;
  document.getElementById("powerCount").textContent = counts.power;
  // Progress bar
  const percent = Math.round((counts.total / maxCount) * 100) + "%";
  document.getElementById("progressBar").style.width = percent;
  // Render attendee list
  renderAttendeeList();
}

// Save counts and attendees to localStorage
function saveCounts() {
  localStorage.setItem("attendanceCounts", JSON.stringify(counts));
  localStorage.setItem("attendeeList", JSON.stringify(attendees));
}

// Render attendee lists below each team counter
function renderAttendeeList() {
  // Clear all lists
  document.getElementById("waterAttendees").innerHTML = "";
  document.getElementById("zeroAttendees").innerHTML = "";
  document.getElementById("powerAttendees").innerHTML = "";

  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const li = document.createElement("li");
    li.textContent = attendee.name;
    // Only show team label if you want, but not needed since list is under team
    // const teamSpan = document.createElement("span");
    // teamSpan.className = "attendee-team";
    // teamSpan.textContent = attendee.team;
    // li.appendChild(teamSpan);
    if (attendee.team === "water") {
      document.getElementById("waterAttendees").appendChild(li);
    } else if (attendee.team === "zero") {
      document.getElementById("zeroAttendees").appendChild(li);
    } else if (attendee.team === "power") {
      document.getElementById("powerAttendees").appendChild(li);
    }
  }
}

// Load counts on page load
window.addEventListener("DOMContentLoaded", loadCounts);

// form submission what is e
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // get the values from the form
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment counts
  counts.total++;
  counts[team]++;

  // Add attendee to list
  attendees.push({ name: name, team: team });

  // Update UI
  document.getElementById("attendeeCount").textContent = counts.total;
  document.getElementById(team + "Count").textContent = counts[team];
  const percent = Math.round((counts.total / maxCount) * 100) + "%";
  document.getElementById("progressBar").style.width = percent;
  renderAttendeeList();

  // Save all counts and attendees
  saveCounts();

  // Check for celebration
  if (counts.total >= maxCount) {
    // Find the winning team (highest count)
    let winner = "";
    let winnerCount = 0;
    const teamNames = {
      water: "Water Wise",
      zero: "Net Zero",
      power: "Renewables",
    };
    for (let t of ["water", "zero", "power"]) {
      if (counts[t] > winnerCount) {
        winner = t;
        winnerCount = counts[t];
      }
    }
    let celebration = `🎉 Goal reached! The winning team is <b>${teamNames[winner]}</b>! 🎉`;
    const greeting = document.getElementById("greeting");
    greeting.innerHTML = celebration;
    greeting.style.display = "block";
    // // Optionally, disable the form
    // form.querySelector("button[type='submit']").disabled = true;
    // nameInput.disabled = true;
    // teamSelect.disabled = true;
    // return;
  }

  // Welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  // Display the message on the page
  const greeting = document.getElementById("greeting");
  greeting.textContent = message; // displays the welcome message on the webpage
  greeting.style.display = "block"; // Make sure the message is visible
  console.log(message);

  form.reset();
});
