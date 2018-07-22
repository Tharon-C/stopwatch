# Stopwatch Project

## Project Goal
The goal of this project is to build a modular Stopwatch that can be rendered many times on one page and still work independently of eachother using plain Javascript and no libraries.

The user needs to be able to:
- Start
- Pause
- Resume
- Reset

## Approach

### Functionality
For the core timer functionality we use `setInterval()` to call a function that increments milliseconds, seconds, and minutes appropriatly. Then format the units for best readability as a string to be rendered to the DOM.

To create a modular stopwatch that can be rendered many times on one the page, we scope all of stopwatch's functionality to a render function. The function takes a `key` argument that is used to namespace the rendered DOM elements and element selectors. Each time the render function is called with a unique key, we create a new instance of the stopwatch.

We use `element.appendChild()` to keep the current instance DOM nodes mounted. I discovered using `element.innerHTML += <element>` loses our event handlers when the content of our element is rewritten.

#### Improvements
Would be cool to write a "Component" class that had a render method to be called when state or properties change. This way we could hold on to state in the component while re-rendering. These components could have a `children` property that would allow them to be composible. We could mostly abstract touching the DOM away by generating a unique hash to a special attribute like `data-app="<hash>"` on the elementinstance. Then event handlers could attach to `this.element` or something. By using create element within our components we can move control of the actual manipulation of the DOM to our most top level parent component. (Or, we could use a library like React!)

### UX / UI Design
The design approach is mobile first, minimal, and clean.
To simplify the UI and create a better user experience, only the actions that can be taken at any given point in time are shown. This means that "Play" and "Pause" never show at the same time, "Reset" only shows when time is on the counter, and the remove button doesn't show when there is only one instance of Stopwatch.

"Reset" is smaller and on a plane next to the time. This is both to limit accidentally pressing it and to indicate its control over time by proximity.

To demonstrate that multiple instances of Stopwatch can work independently on the same page there is the ability to add and remove them.

#### Improvements