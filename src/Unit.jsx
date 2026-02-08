/**
 * File to fetch the API calls to retireve the JSON data for Units and Lessons
 *
 * Makes an API Fetch call to (`localhost:3001/units/${unitId}`)
 * and (`localhost:3001/units/${unitId}/lesson`)
 *
 * This makes the code reuseable as more units and lessons are added to the JSON API data
 *
 * Please note that React pre-17 required the import React from "react"
 * This enabled it to compile down to React.createElement() calls
 * Meaning React variable had to be in scope
 *
 * In React 17+ CRA uses a new jsx transform that handles this automatically at build time
 * Therefore, we only need to use import { useState, useEffect } from "react"
 * as we call them directly.
 * If we used React.memo or React.createRef, we would need React imported again
 */

import { useState, useEffect } from "react";

// Function to fetch the API data and handle loading state and error state gracefully
function Unit({ unitId }) {
  const [unit, setUnit] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResponse, lessonsResponse] = await Promise.all([
          fetch(`http://localhost:3001/units/${unitId}`),
          fetch(`http://localhost:3001/units/${unitId}/lessons`),
        ]);

        if (!unitResponse.ok || !lessonsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const unitData = await unitResponse.json();
        const lessonsData = await lessonsResponse.json();

        setUnit(unitData);
        setLessons(lessonsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [unitId]);

  if (loading) {
    return <div role="status">Loading unit information...</div>;
  }

  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  return (
    <main>
      <h1>{unit.title}</h1>
      {lessons.map((lesson) => (
        <p key={lesson.recommendedOrderInUnit}>{lesson.title}</p>
      ))}
    </main>
  );
}

export default Unit;
