// TODO: Write a component class with render, state and update methods
// TODO: There are side effects in almost every function call, would want to explore a more functional approach.

//
// Initialize App, set up app state and global app control
//

// App state
const state = {
  stopWatchInstances: 1
};

// Render first stopwatch
renderStopWatch(1);

// Bind to AddButton and define event handler
const addButton = document.getElementById("addButton");
addButton.onclick = () => {
  const instanceCount = state.stopWatchInstances;

  // Increment number of instances
  state.stopWatchInstances++;

  // If only one instance hide subtractButton
  instanceCount === 1 ? subtractButton.classList.remove("__shrink") : null;

  // Render new instance
  renderStopWatch(instanceCount + 1);
};

// Bind to SubtractButton and define event handler
const subtractButton = document.getElementById("subtractButton");
subtractButton.onclick = () => {
  const instanceCount = state.stopWatchInstances;

  // If more than one instance decrement instanceCount
  instanceCount > 1 ? state.stopWatchInstances-- : null;

  // If less than or equal to 2 hide SubtractButton
  instanceCount <= 2 ? subtractButton.classList.add("__shrink") : null;

  // Get last instance and remove it
  const stopWatch = document.getElementById(`stopwatch${instanceCount}`);
  stopWatch.remove();
};

//
// Build StopWatch component
//

// Define Icon templates
function resetIcon() {
  return `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>`;
}

function playIcon() {
  return `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>`;
}

function pauseIcon() {
  return `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
    </svg>`;
}

// Define StopWatch template function
function StopWatchTemplate(key) {
  // Create new element
  const root = document.createElement("div");

  // Setup root attributes
  root.classList.add("Stopwatch");
  root.id = `stopwatch${key}`;

  // Inject template string
  root.innerHTML += `
        <div class="TimeDisplay">
        <span
            aria-label="Stopwatch ${key} time display"
            id="counter${key}"
            class="TimeDisplay_counter"
        >
            00
        </span>
        <button aria-label="Reset stopwatch"
            id="button-reset${key}"
            class="Button Button--default Button--sm ButtonReset __shrink"
        >
            ${resetIcon()}
        </button>
    </div>
        <button aria-label="Toggle start pause"
            id="button-toggle${key}"
            class="Button Button--default Button--lg ButtonToggleStart"
        >
                ${playIcon()}
        </button>`;

  // Return root node
  return root;
}

// StopWatch render function, renders template and binds event handlers and local state.
// TODO: Make a class
function renderStopWatch(key) {
  // Define State
  // TODO: State should have a getter and setter
  let state = {
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    Iterval: 0,
    running: false
  };

  // Bind to app node and append an instance of StopWatch
  const app = document
    .getElementById("app")
    .appendChild(StopWatchTemplate(key));

  // Bind to elemnts that need to be injected
  const counterEl = document.getElementById("counter" + key);

  // Bind to inputs for event listeners
  const buttonToggle = document.getElementById("button-toggle" + key);
  const buttonReset = document.getElementById("button-reset" + key);

  // Start the timer
  const onStart = () => {
    // Show ResetButton
    buttonReset.classList.remove("__shrink");

    // ??
    clearInterval(state.Interval);

    // Start timer
    state.Interval = setInterval(startTimer, 10);

    // Button content for when running
    buttonToggle.innerHTML = `${pauseIcon()}`;
  };
  // Stop the timer
  const onStop = () => {
    // ??
    clearInterval(state.Interval);

    // Button content for when stopped
    buttonToggle.innerHTML = `${playIcon()}`;
  };

  // Event handler for when play / stop is toggled
  buttonToggle.onclick = function() {
    // If was running stop else start
    state.running ? onStop() : onStart();

    // Show reset button
    buttonReset.classList.remove("__shrink");

    // Toggle running state
    state.running = !state.running;
  };

  // Event handler for ResetButton
  buttonReset.onclick = function() {
    // Hide ResetButton
    buttonReset.classList.add("__shrink");

    // ??
    clearInterval(state.Interval);

    // Set time values to 00
    state.milliseconds = "00";
    state.seconds = "";
    state.minutes = "";

    // Inject 00 time values to DOM
    counterEl.innerHTML = state.milliseconds;

    // Set running to false
    state.running = false;

    // A bit redundent, but also renders the start contents into ToggleButton
    buttonToggle.innerHTML = `${playIcon()}`;
  };

  // Increment columns and renders TimerDisplay
  function startTimer() {
    // Increment milliseconds
    state.milliseconds++;

    // Increment seconds and reset milliseconds every 100ms
    if (state.milliseconds >= 100) {
      state.milliseconds = 0;
      state.seconds++;
    }

    // Increment minutes and reset seconds every 60s
    if (state.seconds >= 60) {
      state.seconds = 0;
      state.minutes++;
    }

    // Build strings as cleanest information for current values
    const millisecondStr =
      state.milliseconds < 10 && state.seconds > 0
        ? "0" + state.milliseconds.toString()
        : state.milliseconds;
    const secondsStr =
      state.seconds < 10 && state.minutes > 0
        ? "0" + state.seconds.toString()
        : state.seconds;
    const minutesStr = state.minutes > 0 ? state.minutes.toString() + ":" : "";

    // Define full counter string
    const string = `<span aria-label="${minutesStr ? minutesStr : "0"} Minutes ${secondsStr} Seconds and ${millisecondStr} Milliseconds">${minutesStr}${secondsStr}:${millisecondStr}</span>`;

    // Render counter string to counter Element
    counterEl.innerHTML = string;
  }
}
