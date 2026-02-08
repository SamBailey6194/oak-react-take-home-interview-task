/**
 * Reuseable component card for Lesson
 *
 * This follows DRY principles and helps with maintainability
 *
 * It displays the individual lessons information in an card.
 *
 * Showing each lesson with title and learning objectives
 *
 * Receives lessons as a prop from LessonList.jsx
 */

function LessonCard({ lesson }) {
  return (
    <article>
      <h3>{lesson.title}</h3>
      {lesson.learningObjectives.length > 0 ? (
        <ul>
          {lesson.learningObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      ) : (
        <p>No learning objectives listed</p>
      )}
    </article>
  );
}

export default LessonCard;
