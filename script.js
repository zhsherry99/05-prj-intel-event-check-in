// grabs elements to interact with in javascript
const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');

// Track attendance
let count = 0;
const maxCount = 50;

// form submission what is e
form.addEventListener("submit", function(e) {
  e.preventDefault();
  // get the values from the form
  const name = nameInput.value; 
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  //Increment count
  count++
  console.log("Total check-ins: ", count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + '%';
  console.log(`Progress: ${percentage}`);

  // Update team count
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Welcome message
  const message = `Welcome, ${name} from ${teamName}! You are attendee number ${count}.`;
  console.log(message);

  form.reset();

  // const current = parseInt(teamCounter.textContent);
  // console.log("Previous team count:", current);

  // const newTotal = current + 1;
  // console.log("New team count:", newTotal);
});