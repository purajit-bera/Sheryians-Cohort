# Task Manager – DOM, Events, and Browser Rendering Concepts

This project is a Task Manager application built with HTML, CSS, and Vanilla JavaScript. It is designed to practice DOM manipulation, event handling (including bubbling, capturing, and delegation), attributes vs properties, and the browser rendering pipeline.

---

## Browser Concepts Used in This Project

### Parsing

Parsing is the process where the browser reads raw HTML or CSS text and converts it into a structured representation it can work with.  
For HTML, the parser walks through the document and creates nodes for elements, attributes, and text in a tree‑like form.

**In this project:**  
The browser parses `index.html` to create the initial DOM for the main layout (header, search bar, task section, form overlay), before any JavaScript runs.

---

### Tokenization

Tokenization happens before or during parsing: the browser takes the raw text and breaks it into smaller “tokens” like start tags, end tags, attribute names, and values.  
These tokens are then used by the parser to build the actual tree structures such as the DOM or CSSOM.

**In this project:**  
The HTML for the task cards (titles, buttons, icons, data attributes) is first tokenized and then turned into DOM nodes that JavaScript later selects and updates.

---

### DOM Tree

The DOM (Document Object Model) Tree is a tree structure that represents the HTML document in memory.  
Each HTML element becomes a node, and the parent–child relationships in the HTML turn into branches in this tree.

**In this project:**  
JavaScript reads and updates the DOM Tree using methods like `querySelector`, `createElement`, `append`, and `closest` to build and manage task cards inside the `.task-section`.

---

### CSSOM Tree

The CSSOM (CSS Object Model) Tree is a separate tree that represents all the CSS rules and how they apply to elements.  
It is built by parsing CSS files and style tags into a structure that the browser can use to compute styles for each DOM node.

**In this project:**  
The browser parses `style.css` into a CSSOM that defines how elements like the main card, task cards, and dark theme classes look, including colors, shadows, and layout.

---

### Render Tree

The Render Tree is created by combining the DOM Tree and CSSOM Tree.  
It contains only the visible nodes and their computed styles, and it is the structure the browser uses to perform layout and paint pixels on the screen.

**In this project:**  
When new tasks are added or completed, the DOM changes and the Render Tree is updated so the UI immediately reflects new cards, line‑through styles for completed tasks, and dark/light theme changes.

---

## Event System Concepts

### Event Bubbling

Event bubbling is the phase where an event starts at the target element and then moves upward through its ancestors in the DOM tree.  
For example, when a button is clicked, the click event first runs the button’s handler, then its parent’s handler, then the grandparent’s handler, and so on, unless propagation is stopped.

**In this project:**  
A click on a task’s delete icon bubbles up from the icon to the task card and then to the `.task-section` container, where a single event listener decides which task to delete.

---

### Event Capturing

Event capturing is the opposite direction: the event travels from the top of the DOM tree down to the target before the bubbling phase.  
If listeners are added in capture mode, the ancestor elements receive the event first, then it reaches the actual target element.

**In this project:**  
There is a small demo where click listeners are added in capture mode on `body`, `main`, and a top section, so the console shows that the outer elements log first before the inner button when capturing is enabled.

---

### Event Delegation

Event delegation is a pattern where instead of adding a listener to many child elements, a single listener is attached to a common ancestor.  
Inside that listener, the code checks `event.target` (or walks up with `closest`) to decide which specific child element triggered the event and what action to perform.

**In this project:**  
Only one `click` listener is attached to `.task-section`, and it handles delete and complete actions for any task card by inspecting `event.target` and finding the corresponding `.task-card` with `closest`.

---

## Attributes vs Properties – Example From the Project

The assignment also requires demonstrating the difference between DOM properties and HTML attributes using an input.

**Concept:**  
- `input.value` reads or writes the current live value in the DOM object.  
- `input.getAttribute("value")` reads the initial value from the HTML attribute, not the live user‑typed value.

**In this project:**  
For the search input, `searchTaskInput.value` reflects what the user is currently typing, which is used to filter tasks in real time.  
If `searchTaskInput.getAttribute("value")` is called, it returns the initial `value` attribute from the HTML (which is `null` here because no default value is set).
