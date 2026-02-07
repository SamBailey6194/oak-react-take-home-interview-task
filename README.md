# Oak National Academy - React engineering interview task 🌳

Congratulations on making it through to the interview stage of Oak National Academy.

The following interview task has been designed for us to find out how you approach developing some basic features in a standard React project.

You should read through this document carefully before you start, you should ensure you setup your enviornment correctly as mentioned in the [getting started](#getting-started) section and that you test the endpoints and inspect the responses as mentioned in the [data](#data) section.

Once you have done this you should complete your implementation so that the [acceptance criteria](#acceptance-criteria) is met.

This task is very open-ended as we want to see how you approach the given problem and therefore there is no right or wrong answer - we're interested in finding out how you think and approach solving an open-ended problem!

## A note on AI

We are happy for you to refer to documentation and search for information online but in order to keep the test functional we'd prefer you not to use AI. Please make sure that Copilot or any other AI assistive tool are turned off. 

## Task requirements

In this task, you'll need to render a page for a maths unit called **Trigonometry 1**. A **unit** is a series of **lessons** that a teacher needs to follow in a specifc order. For example, we have a maths unit called "Trigonometry 1" and it consists of the following lessons:

1. Applying trigonometry
2. Use tangent to find a length
3. Use sine and cosine to find a length
4. Know tangent, sine and cosine

You will need to render a summary about this unit including a description of the unit and a list of all its lessons. 

You can find more detailed information in the [acceptance criteria](#acceptance-criteria) section below.

### Getting started

First off, run `npm i` in the root of this project to install all the necessary dependencies.

You can use the command `npm start` to start running the React app on port 3000.
You can visit the browser at `localhost:3000` and check you see the text "This page should display info for unit 1" on the page, to confirm the app is working as expected.

The `Unit.jsx` file has been set up as the starting point for your page and is already rendered when you visit `localhost:3000` in the browser.

### Data

You can head to `./src/db.json` where you'll find some data for the "Trigonometry 1" unit and lessons.

You can serve this data as an API locally by running the command `npm run serve` in the root of this project.
This command will start running a local server on port 3001 where you can access the data you'll need to build this page.

You can access the following endpoints:

- `localhost:3001/units/:unitId`

This endpoint will respond with a JSON response as below:

```json
{
  "id": 1,
  "title": "Trigonometry 1",
  "unitInfo": {
    "subject": "maths",
    "keyStage": "Key Stage 4"
  }
}
```

- `localhost:3001/units/:unitId/lessons`

This endpoint will respond with a JSON response containing all the lessons for a given unit and will respond with a JSON response as below:

```json
[
  {
    "unitId": 1,
    "id": 1,
    "title": "Use tangent to find a length",
    "recommendedOrderInUnit": 2,
    "learningObjectives": [
      "In this lesson we'll learn how to correctly label a right-angled triangle"
    ]
  },
  {
    "unitId": 1,
    "id": 1,
    "title": "Use sine and cosine to find a length",
    "recommendedOrderInUnit": 3,
    "learningObjectives": [
      "In this lesson, we will calculate missing lengths using sine and cosine trigonometric ratios."
    ]
  },
  {
    "unitId": 1,
    "id": 1,
    "title": "Know tangent, sine and cosine",
    "recommendedOrderInUnit": 4,
    "learningObjectives": [
      "In this lesson, we will learn how to correctly label a right-angled triangle, and identify the correct trigonometric ratio to use."
    ]
  },
  {
    "unitId": 1,
    "id": 1,
    "title": "Applying trigonometry",
    "recommendedOrderInUnit": 1,
    "learningObjectives": []
  }
]
```

❗ It is advised that you start the server first and visit these endpoints in order to familarise yourself with the responses from the different endpoints. ❗

### Acceptance criteria

An _acceptance criteria_ is a goal that needs to be completed for a particular feature/task to be considered complete.

The project manager has come up with the following **acceptance critera** for the units page:

#### Units information

- displays a heading with the title of the unit
- displays a heading with the keystage for the unit
- displays a heading with the subject of the given unit

#### Lessons information

- displays the number of lessons for a given unit
- displays a list of all the lesson titles for a given unit
- for each lesson displayed it renders the following:
  - title
  - list of bullet points for each learning objective

#### Non-functional

- the page can be read by someone with a visual impairment


