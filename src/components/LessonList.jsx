/**
 * Reuseable component list for Lesson
 *
 * This follows DRY principles and helps with maintainability
 *
 * It displays the lesson information in an ordered list sorted by recommendedOrderInUnit
 *
 * Receives lessons array as a prop from Unit.jsx
 */

function LessonList({ lessons }) {
  const sortedLessons = [...lessons].sort(
    (a, b) => a.recommendedOrderInUnit - b.recommendedOrderInUnit
  );

  return (
    <section aria-label="Lessons">
      <p>This unit has {lessons.length} lessons</p>
      <ol>
        {sortedLessons.map((lesson) => (
          <li key={lesson.recommendedOrderInUnit}>{lesson.title}</li>
        ))}
      </ol>
    </section>
  );
}

export default LessonList;
