# Trigonometry Unit 1 Plan Implementation

## Overview

Build in `Units.jsx` a page that fetches data from two local endpoints and displays the unit information and lessons. Accessibility is crucial to be baked in throughout.

| Phase                           | Goal                                                                              | Completed |
| ------------------------------- | --------------------------------------------------------------------------------- | --------- |
| 1 - Data Fetching               | Fetch Unit and lesson data from the JSON server                                   | N         |
| 2 - Unit Information Display    | Meet the "Units Information" acceptance criteria                                  | N         |
| 3 - Lessons Information Display | Meet the "Lessons Information" acceptance criteria                                |
| 4 - Accessibility               | Ensure page is readable by someone with visual impairment                         | N         |
| 5 - Polish & Review             | Check Styling, Error Handling, Code Quality, Automated Tests Pass, Manual Testing | N         |

## Steps to follow

Each phase should follow the below steps:

1. TDD and BDD red phase
2. Write enough code to pass tests
3. TDD and BDD green phase
4. Manual testing passes

## Phase 1 - Data Fetching

**Goal:** Fetch unit and lesson data from the JSON server.

1. `Unit.jsk` to use `useEffect` and `useState` to fetch from both endpoints on mount:

- `GET http://localhost:3001/units/1` -> unit title, subject, key stage
- `GET http://localhost:3001/units/1/lessons` -> array of lessons

2. Store both responses in state (e.g. `unit` and `lessons`).
3. Add basic loading and error states to ensure the page doesn't render empty or broken links while waiting.
4. Render loading test (e.g. `"Loading unit information..."`) rather than leaving the page blank - allowing for a good UX and to inform those who are visually impaired there is a loading state.

## Phase 2 - Unit Information Display

**Goal:** Meet the ["Units Information"](README.md#units-information) acceptance criteria

- `Unit.jsx` - Owns the state and data fetching. Passes data down as props to child components. Handling loading/error states.
- `UnitHeader.jsx` - Receives unit as a prop. Renders the three headings (Units Information).
  - Wrap in a `<header>` element:
    - Unit Title - `<h1>{unit.title}</h1>`
    - Key Stage - `<h2>{unit.unitInfo.keyStage}</h2>`
    - Subject - `<h2>{unit.unitInfo.subject}</h2>`

## Phase 3 - Lesson Information Display

**Goal:** Meet the ["Lessons Information"](README.md#lessons-information) acceptance criteria

- `LessonList.jsx` - Receives `lessons` as a prop. Sorts by `recommendedOrderInUnit`, renders the count and maps over lessons.
  - Display the lesson count: `"This unit has {lessons.length} lessons"`.
  - Sort the `lessons` array by `recommendedOrderInUnit` before rendering.
  - Render a `<ol>` and map each lesson to a `<LessonCard/>`.
- `LessonCard.jsx` - Receives a single `lesson` as a prop. Renders the title and learning objectives list.
  - Each lesson renders with:
    - The lesson header as `<h3>` element
    - `<ul>` of the learning objectives as `<li>` bullet points
    - Handle edge cases where `learningObjectives` is an empty array - either skip the list or show a fallback like `"No learning objectives listed"`
- Due to the data lesson `id` values alone are not unique. This is why we will use `recommendedOrderInUnit` as the key since it's unique per lesson within a unit.

## Phase 4 - Accessibility

**Goal:** Ensure page is readable by someone with visual impairment.

Throughout all phases this should be achieved, this phase is checking the code uses proper WCAG guidance and principles.

- Semantic HTML is used properly, e.g. `<main>`, `<header>`, `<section>`, `<h1>`, `<h2>`, `<h3>`, `<ol>`, `<ul>`, `<li>`. Rather than generic `<div>` and `<span>`, only use `<div>` and `<span>` where necessary.
- Heading hierarchy is used, the levels are not skipped.
- Using `aria-labels` throughout on elements that require the labels.
- Use meaningful loading/error states, e.g. `aria-live="polite"` so screen readers announce state changes.
- Test pages without the CSS so the page makes sense using just HTML
- Use Accessibility in the DevTools tab to check the accessibility rating and once on a live URL use [Page Speed Insights](https://pagespeed.web.dev/) to check the accessibility rating.

## Phase 5 - Polish and Review

**Goal:** Check Styling, Error Handling, Code Quality, Automated Tests Pass, Manual Testing.

- Styling - Check and update proper styling that is consistent, UI & UX friendly, and accessible.
- Error handling - Ensure all errors are handled gracefully, especially API calls
- Code Quality - Check for: prop types or TypeScript types, consistent naming, no console messages, clean imports, and DRY principles
- Automatic Tests Pass - Final run of all tests to ensure they are still passing
- Manual Testing - Walk through each phase from above and the acceptance criteria to ensure all of it is met
