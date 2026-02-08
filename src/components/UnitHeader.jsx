/**
 * Reuseable component for headers
 *
 * This follows DRY principles and helps with maintainability
 *
 * It displays the unit title, key stage, and subject as headings.
 *
 * Receives unit data as a prop from Unit.jsx
 */

function UnitHeader({ unit }) {
  return (
    <header>
      <h1>{unit.title}</h1>
      <h2>{unit.unitInfo.keyStage}</h2>
      <h2>{unit.unitInfo.subject}</h2>
    </header>
  );
}

export default UnitHeader;
