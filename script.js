const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const resetAllBtn = document.getElementById("resetAllBtn");

const maxCount = 10;
let counts = {
  total: 0,
  water: 0,
  zero: 0,
  power: 0
};
let attendees = [];

function loadCounts() {
  const saved = localStorage.getItem("attendanceCounts");
  if (saved) {
    counts = JSON.parse(saved);
  } else {
    counts = { total: 0, water: 0, zero: 0, power: 0 };
  }
  const savedAttendees = localStorage.getItem("attendeeList");
  if (savedAttendees) {
    attendees = JSON.parse(savedAttendees);
  } else {
    attendees = [];
  }
  updateUI();
}

function saveCounts() {
  localStorage.setItem("attendanceCounts", JSON.stringify(counts));
  localStorage.setItem("attendeeList", JSON.stringify(attendees));
}

function updateUI() {
  document.getElementById("attendeeCount").textContent = counts.total;
  document.getElementById("waterCount").textContent = counts.water;
  document.getElementById("zeroCount").textContent = counts.zero;
  document.getElementById("powerCount").textContent = counts.power;
  const percent = `${Math.round((counts.total / maxCount) * 100)}%`;
  document.getElementById("progressBar").style.width = percent;
  renderAttendeeList();
}

function renderAttendeeList() {
  document.getElementById("waterAttendees").innerHTML = "";
  document.getElementById("zeroAttendees").innerHTML = "";
  document.getElementById("powerAttendees").innerHTML = "";
  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const li = document.createElement("li");
    li.textContent = attendee.name;
    if (attendee.team === "water") {
      document.getElementById("waterAttendees").appendChild(li);
    } else if (attendee.team === "zero") {
      document.getElementById("zeroAttendees").appendChild(li);
    } else if (attendee.team === "power") {
      document.getElementById("powerAttendees").appendChild(li);
    }
  }
}

window.addEventListener("DOMContentLoaded", loadCounts);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  counts.total++;
  counts[team]++;
  attendees.push({ name: name, team: team });

  updateUI();
  saveCounts();

  if (counts.total >= maxCount) {
    let winner = "";
    let winnerCount = 0;
    const teamNames = {
      water: "Water Wise",
      zero: "Net Zero",
      power: "Renewables"
    };
    for (let t of ["water", "zero", "power"]) {
      if (counts[t] > winnerCount) {
        winner = t;
        winnerCount = counts[t];
      }
    }
    const greeting = document.getElementById("greeting");
    greeting.innerHTML = `🎉 Goal reached! The winning team is <b>${teamNames[winner]}</b>! 🎉`;
    greeting.style.display = "block";
    form.querySelector("button[type='submit']").disabled = true;
    nameInput.disabled = true;
    teamSelect.disabled = true;
    return;
  }

  const message = `Welcome, ${name} from ${teamName}!`;
  const greeting = document.getElementById("greeting");
  greeting.textContent = message;
  greeting.style.display = "block";
  form.reset();
});

if (resetAllBtn) {
  resetAllBtn.addEventListener("click", function () {
    localStorage.removeItem("attendanceCounts");
    localStorage.removeItem("attendeeList");
    counts = { total: 0, water: 0, zero: 0, power: 0 };
    attendees = [];
    updateUI();
    form.querySelector("button[type='submit']").disabled = false;
    nameInput.disabled = false;
    teamSelect.disabled = false;
    const greeting = document.getElementById("greeting");
    greeting.textContent = "";
    greeting.style.display = "none";
    form.reset();
  });
}
