/**
 * Reuseable component list for Lesson
 *
 * This follows DRY principles and helps with maintainability
 *
 * It displays the lesson information in an ordered list sorted by recommendedOrderInUnit
 *
 * Receives lessons array as a prop from Unit.jsx
 */
import { useState } from "react";
import LessonCard from "./LessonCard";

function LessonList({ lessons }) {
  const [useRecommendedOrder, setUseRecommendedOrder] = useState(true);

  const displayedLessons = useRecommendedOrder
    ? [...lessons].sort(
        (a, b) => a.recommendedOrderInUnit - b.recommendedOrderInUnit
      )
    : lessons;

  const toggleOrder = () => {
    setUseRecommendedOrder((prev) => !prev);
  };

  return (
    <section id="lessons" aria-label="Lessons">
      <p>This unit has {lessons.length} lessons</p>
      <button onClick={toggleOrder} aria-live="polite">
        {useRecommendedOrder
          ? "Show in API Order"
          : "Show in recommended order"}
      </button>
      <ol>
        {displayedLessons.map((lesson) => (
          <li key={lesson.recommendedOrderInUnit}>
            <LessonCard lesson={lesson} />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default LessonList;
