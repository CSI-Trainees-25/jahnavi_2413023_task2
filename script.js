
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCard = document.getElementById("taskCard");
const setTimerBtn = document.getElementById("setTimerBtn");

let currentSelectedTask = null;
let countdownInterval = null;

addBtn.addEventListener("click", () => {
  // reCreate a task card
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  // Card inner inp tht will overshadow each time 
  taskCard.innerHTML = `

  <input type="text" placeholder="Enter task name" class="task-name">

  <div class="select-row">
    <select class="priority">
      <option value="" disabled selected>Priority</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>

    <select class="status">
      <option value="" disabled selected>Status</option>
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  </div>

  <div class="date-row">
    <label for="due-date" class="date-label">Due Date:</label>
    <input type="date" class="due-date">
  </div>

  <input type="number" placeholder="Duration (minutes)" class="duration" min="1">
`;


  // When a card is choosed ..also helps for the do now function
  taskCard.addEventListener("click", () => {
    const name = taskCard.querySelector(".task-name").value || "(Unnamed Task)";
    const priority = taskCard.querySelector(".priority").value || "-";
    const status = taskCard.querySelector(".status").value || "-";
    const date = taskCard.querySelector(".due-date").value || "-";
    const duration = taskCard.querySelector(".duration").value || "-";
//obj
    currentSelectedTask = { name, priority, status, date, duration };

    Defaultval.innerHTML = `
      <p><strong>Task:</strong> ${name}</p>
      <p><strong>Priority:</strong> ${priority}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Due Date:</strong> ${date}</p>
      <p><strong>Duration:</strong> ${duration} (min)</p>
      <div id="timerDisplay"></div>
      <button id="taskCompletedBtn">Task Completed ✅</button>
    `;
  });

  taskList.appendChild(taskCard);
  // Adding color change for the Priority opt
const prioritySelect = taskCard.querySelector(".priority");
prioritySelect.addEventListener("change", () => {
  const value = prioritySelect.value;
  // Removes previously applied color
  prioritySelect.classList.remove("priority-high", "priority-medium", "priority-low");

 
  if (value === "High") {
    prioritySelect.classList.add("priority-high");
  } else if (value === "Medium") {
    prioritySelect.classList.add("priority-medium");
  } else if (value === "Low") {
    prioritySelect.classList.add("priority-low");
  }
});

// Add color change for the Status select box
const statusSelect = taskCard.querySelector(".status");
statusSelect.addEventListener("change", () => {
  const value = statusSelect.value;
  statusSelect.classList.remove("status-done", "status-progress", "status-not");

  if (value === "Done") {
    statusSelect.classList.add("status-done");
  } else if (value === "In Progress") {
    statusSelect.classList.add("status-progress");
  } else if (value === "Not Started") {
    statusSelect.classList.add("status-not");
  }
});

});

// 🕒set timer fnc
setTimerBtn.addEventListener("click", () => {
  if (!currentSelectedTask) {
    alert("Please select a task first!");
    return;
  }

  const duration = parseInt(currentSelectedTask.duration);
  if (!duration || duration <= 0) {
    alert("Please enter a valid duration (in minutes) for this task!");
    return;
  }

  const timerDisplay = document.getElementById("timerDisplay");
  const completeBtn = document.getElementById("taskCompletedBtn");

  // Stop the previous timer running
  if (countdownInterval) clearInterval(countdownInterval);

  // Converting min to  sec
  let totalSeconds = duration * 60;

  // Show timer immediately on screen
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return (
      String(hrs).padStart(2, "0") +
      ":" +
      String(mins).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    );
  }

  function updateTimer() {
    if (totalSeconds >= 0) {
      timerDisplay.textContent = `⏳ ${formatTime(totalSeconds)}`;
      totalSeconds--;
    } else {
      clearInterval(countdownInterval);
      timerDisplay.textContent = "⏰ Time’s up!";
      completeBtn.style.display = "block";
    }
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);

  completeBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    timerDisplay.textContent = "✅ Task Completed!";
    completeBtn.style.display = "none";
  });
});

