# Implementation for the Acceptance Criteria

## Overview

This document provides and overview of what has been achieved for the React App Take Home Interview Task.

## Implementation

### Planning Phase

To start with I wrote a phased plan as to what to carry out and implement to achieve the [acceptance criteria](README.md#acceptance-criteria).

This can be accessed in [Trig 1 Unit Plan](TRIG_1_UNIT_PLAN.md)

There were 5 phases written and I managed to achieve 4 of them in the process. I did not manage to get around to implemnenting the styling and polishing for a nice UI and UX.

### Testing Guides

For each of the steps to implement I wrote tests to carry out to allow for red phase TDD and green phase TDD.

All the tests I wrote can be found in the `src/__tests__/*.test.jsx` folder. All of them are passing.

### Phase 1 - Data Fetching

To implement the data fetching from the `db.json` data as a JSON API.

This entailed:

- `Unit.jsx` uses useState and useEffect to fetch from both API endpoints (`/units/${unitid}` and `/units/${unitid}/lessons`) in parallel using `Promise.all`
- Having three render states to handle each one gracefully:
  - Loading (`role="status"`)
  - Error (`role="alert`)
  - Success
- The `unitId` prop makes the component reusable for any unit, not just this particular unit, following DRY principles and allowing for ease of maintanability

`Promise.all` was chosen over sequential `fetch` calls to allow for speedy calling of both API endpoints at the same time. This is achievable because neight endpoint relies on the other. Therefore, calling them in parallel sppeds the process up. Giving a better UX.

The use of `useEffect` with an inner `async` function keeps the logic contained within the effect lifecycle while respecting React's API contract. This avoids the `async` function returning a promise instead.

The use of `useState` over `useReducer` was because this task handled four pieces of state (`unit`, `lessons`, `loading`, `error`). `useState` therefore keeps things simple and readable in comparison to `useReducer`. If the state transitions were more complex or interdependent I could have used `useReducer` instead. But going with `useState` allows the usage of `setState` calls in the try/catch/finally block are clear and easy to follow.

### Phase 2 - Unit Information Display

I implemented a reuseable component to display the Unit Information properly again allowing for reuseability for any unit following DRY principles and allowing for ease of maintanability

- `UnitHeader.jsx` recevies the unit object as a prop and renders the title, key stage and subject
- To follow proper accessibility and use of screen readers:
  - `<header>` to wrap the element for semantic structuring
  - Proper heading hierarchy: `<h1>` for unit title and `<h2>` for key stage and subject

Passing `unit` as a whole prop rather than each component as individual props allows for easier readability, maintainability and reuseability of the props. For example, I can call `unit.title` anywhere that uses the `unit` prop.

### Phase 3 - Lesson Information Display

I implemented two reuseable components to display the Lesson Information properly again allowing for reuseability for any unit following DRY principles and allowing for ease of maintanability

- `LessonList.jsx` sorting lessons using the recommendedOrderInUnit before rendering, displays the lesson count, and maps each lesson to a `LessonCard`.
- `LessonCard.jsx` renders the lesson title as an `<h3>` and learning objectives as a `<ul>` with `<li>` items, following proper semantic structure and allowing accessibility and screen readers to easily read the page because of the semantic structure.
- Handles the edge case when a lesson has no learning objectives and displays a fallback message to inform the user that there is no learning objectives.
- Due to duplicate `id` values set in the API endpoint data a choice was made to use the `recommendedOrderInUnit` to properly order the lessons in a unit without a conflict.

### Special Note - Rendering and tests

To enable the reuseable components to be rendered `Unit.jsx` calls `UnitHeader.jsx` and `LessonList.jsx` while `LessonCard.jsx` is called in `LessonList.jsx`.

To make sure the tests actually passed as there was a conflict using `<ol>` and `<ul>` in the two lesson component files, there needed to be a change in how the test for `LessonList.test.jsx` in how it checked for the lists. Therefore, I aimed to specifically target the `<ol>` in `LessonList.test.jsx` instead of targeting all lists. The ordering test focuses on the headings and finding the `<h3>` and the list test then finds the `<OL>` by tag name instead of finding all lists avoiding the conflict of finding the `<ol>` and `<ul>` at the same time.

### Phase 4 - Accessibility

I implemented a reuseable component to display the Unit Information properly again allowing for reuseability for any unit following DRY principles and allowing for ease of maintanability

- Proper semantic HTML structure used trhoughout: `<main>`, `<header>`, `<section>`, `<article>`, `<ol>`, `<ul>`, `<h1>`, `<h2>` and `<h3>`. Only used `<div>`s where necessary not all over the place. This makes it easier for screen readers to process the page and ensure those who use them can access and use the page.
- Proper usage of ARIA roles throughout the HTML which again allows the screen readers to read the page properly.
- Heading hierarchy is correct and sequential with no skipping of heading classes.
- Usage of `aria-labels` for screen readers to pick up the context for the `<section>` it is on. For example, `<aria-label="Lessons">` to help screen readers know they are on the lessons section of the page.
- `role="staus"` on loading state and `role="alert"` on error state both help screen readers inform the user of the state the page is in
- Tested the page reads logically without CSS and checking the accessibility in the DevTools to ensure it passes.
- Provides a button to skip to the lessons section for screen readers and keyboard users

Due to not getting around to CSS implementation there is some accessibility features not implemented.

## Next Steps

### Phase 5 - Polish and Review

I did not manage to get around to phase 5. Meaning CSS has not been implemented. Below is a list of what could have been done with more time:

- Add focus styles, e.g. `:focus-visible` outlines for keyboard navigation on any interactive elemnts like the Skip to Lessons button.
- Proper component styling for clean typography, spacing and visual hierarchy. For example each lesson card being styled using Tailwind or Bootstrap components for speedier CSS implementation.
- Implement CSS utilities to hide components that are only for screen-readers.
- Use `prefers-reduced-motion`, `prefers-color-scheme` and `prefers-contrast` to allow users to have their browser implement their preferences

For implementing better Code Quality I could also have done the below:

- Use proptypes to validate all components and allow catching of prop errors during development
- Use React error boundary component to catch render errors gracefully
- Move the API endpoint to be an environment variable to allow for deployment flexibility
- Move the data fetching logic into a custom hook for reuseability and testability
