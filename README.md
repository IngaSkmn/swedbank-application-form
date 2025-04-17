# Swedbank Credit Card Application Form

A responsive, accessible multi-step form for applying for a Gold Credit Card with a grace period. Built using plain HTML, CSS, and vanilla JavaScript.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Accessibility](#accessibility)
- [Technologies](#technologies)
- [License](#license)

## Features

- **Multi-step form** with progress navigation and validation
- **Custom-styled** buttons, sliders, radio buttons, and checkboxes
- **Accessible**: semantic HTML, ARIA attributes, keyboard navigation
- **Responsive** layout for desktop and mobile
- **Live summary** table at the end with user inputs

## Demo

Open `index.html` in your browser:

```bash
open index.html
```

## Installation

1. **Clone** the repository:
   ```bash
   git clone https://github.com/IngaSkmn/swedbank-application-form.git
   cd swedbank-application-form
   ```
2. **Install** dependencies (none required).
3. **Run** locally by opening `index.html` in a browser.

## Usage

- Navigate through steps with **Forward** and **Back** buttons.
- Click on step labels to revisit completed sections.
- Hover and focus states are styled for visual feedback.
- After completing all steps, view the **Summary** and submit.

## Accessibility

- **Semantic HTML**: proper use of `<label>`, `<fieldset>`, `<legend>`, and ARIA roles
- **Keyboard support**: tab navigation, focus-visible outlines, skip invalid steps
- **Screen reader friendly**: `aria-label`, `aria-current`, `aria-live`, `aria-describedby`

## Technologies

- HTML5
- CSS3 (Custom properties, Flexbox, Grid, Transitions)
- JavaScript (ES6+) for DOM manipulation and form logic

## License

Distributed under the MIT License. See `LICENSE` for details.
