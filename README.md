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
This approach for the core timer functionallity uses `setInterval()` to call a function that increments milliseconds, seconds, and minutes appropriatly. Then format the units for best readability as a string to be rendered to the DOM.

To create a modular Stopwatch that can be rendered many times on one the page, The element ids are namespaced with an instance key. We use `element.appendChild()` to keep the current instance DOM nodes mounted, as with `element.innerHTML += <node>` we would lose our event handlers when the contents are rewritten.

#### Improvements
Would be cool to write a component class that had a render method to be called when state or properties change. This way we could hold onto state in the component while rerendering. These components could have a `children` prop that would allow them to be composible. We could mostly abstact touching the DOM away by generating a unique hash to a special attribute like `data-app="<hash>"` on the element instance. Then event handlers could attach to `this.element` or something. (Or we could use a library!)

### UX / UI Design
The design approach is mobile first, minimal, and clean.
To limit the cognitive overhead for the user, only the actions that can be taken at any given point time are shown. This means that play and pause never show at the same time, the reset button only shows when time is on the counter, and the remove button doesn't show when there is only one instance of Stopwatch.

The reset button is on its own plane to limit accidentally pressing it.

To demonstate that multiple instances of Stopwatch can work independently on the same page there is the ability to add and remove them.

