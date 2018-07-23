# Stopwatch Project

[View Demo](https://tharon-c.github.com/stopwatch)

_Note: This is using newer CSS features that are not supported or consistent across all browsers. For best results use latest versions of Chrome, Firefox, or MS Edge._

## Project Goal

The goal of this project is to build a modular Stopwatch that can be rendered many times on one page and still work independently of each other using plain Javascript and no libraries.

The user needs to be able to:

- Start
- Pause
- Resume
- Reset

## Approach

### Functionality

For the core timer functionality we use `setInterval()` to call a function that increments milliseconds, seconds, and minutes appropriately. Then format the units for best readability as a string to be rendered to the DOM.

To create a modular stopwatch that can be rendered many times on one the page, we scope all of stopwatch's functionality to a render function. The function takes a `key` argument that is used to namespace the rendered DOM elements and element selectors. Each time the render function is called with a unique key, we create a new instance of the stopwatch.

`element.appendChild()` is used to keep the current instance DOM nodes and respective event listeners mounted. I discovered using `element.innerHTML += <element>` loses our event listeners when the content of our element is rewritten such that only the last instance rendered is working. This was a bit difficult to debug and find a solution for. I eventually had to look to stack overflow to read about the problem.

#### Improvements

Move the call to App.appendChild out of the Stopwatch component to the App function.

Create a base component class that has methods like `setState` and `render` so that the render function can be called automatically when data changes.

### UX / UI Design

The design approach aims to be mobile first, minimal, and clean. To simplify the UI and create a better user experience, only actions that can be taken at any given point in time are displayed. This means that the user never sees "Start" and "Pause" together, "Reset" is only seen when time is on the counter, and the remove button doesn't show when there is only one instance of Stopwatch.

"Reset" is smaller and on a plane next to the time. This is both to limit accidentally pressing it and to indicate its control over time by proximity to the display.

To demonstrate that multiple instances of Stopwatch can work independently on the same page there is the ability to add and remove them.

#### Improvements

- Optionally voice the clock for blind users
- Add the ability to record times with date, title, and notes.
- Ability to mark laps without stopping the clock.
- Adding other modes like a Timer and Clock.
- Light and Dark theme

## Some Takeaways

### Functionality

I have been using React so much these days I had forgotten what it was like to "touch the DOM". While in some ways it is nice to just grab an element from anywhere and do whatever we want, it is also procedural, hard to test, and produces side effects. This exercise made me consider how we might take a functional approach to managing the DOM from the ground up. By moving all the actual DOM manipulation to a single point outside the render tree, we can build an object representation of the DOM tree to be rendered with composable, pure functions. I now feel like I better understand and appreciate what libraries like React do for us.

### Design

Accessibility is an interesting thing to think about with regards to a stopwatch. I really think it is a tool that should be accessible, so I tested for it by moving around the app with a screen reader. Although I was able to move around and understand what the buttons do, it isn't clear, without assuming, what the number I was inspecting represented. Even knowing the numbers were the time on the clock, the units weren't defined so it isn't clear what the units are and again have to assume meaning. After adding aria labels I could reasonably start the timer and after stopping it, move to the display to get the final time and understand its meaning.
