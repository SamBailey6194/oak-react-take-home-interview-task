/**
 * Tests for LessonCard component
 *
 * Phase 3: Lesson information display
 *
 * It tests for:
 * - Lesson displaying title
 * - Lesson displaying a list of bullet points for each learning objective
 */

import { render, screen } from "@testing-library/react";
import LessonCard from "../components/LessonCard";

// Mock data matching the API response shapes from db.json
const mockLessonsWithObjectives = {
  unitId: 1,
  id: 1,
  title: "Use tangent to find a length",
  recommendedOrderInUnit: 2,
  learningObjectives: [
    "In this lesson we'll learn how to correctly label a right-angled triangle",
  ],
};

const mockLessonMultipleObjectives = {
  unitId: 1,
  id: 1,
  title: "Know tangent, sine and cosine",
  recommendedOrderInUnit: 4,
  learningObjectives: [
    "In this lesson, we will learn how to correctly label a right-angled triangle, and identify the correct trigonometric ratio to use.",
    "Students will understand the relationship between sides and angles.",
  ],
};

const mockLessonsNoObjectives = {
  unitId: 1,
  id: 1,
  title: "Applying trigonometry",
  recommendedOrderInUnit: 1,
  learningObjectives: [],
};

describe("LessonCard - Phase 3: Individual Lesson Information Display", () => {
  describe("Lesson title", () => {
    it("displays the lesson title as a heading", () => {
      render(<LessonCard lesson={mockLessonsWithObjectives} />);
      const heading = screen.getByRole("heading", {
        name: "Use tangent to find a length",
      });
      expect(heading).toBeInTheDocument();
    });

    it("displays the lesson title as a h3", () => {
      render(<LessonCard lesson={mockLessonsWithObjectives} />);
      const heading = screen.getByRole("heading", {
        name: "Use tangent to find a length",
        level: 3,
      });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Lesson objectives", () => {
    it("displays learning objectives as a list", () => {
      render(<LessonCard lesson={mockLessonsWithObjectives} />);
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("renders each learning objective as a list item", () => {
      render(<LessonCard lesson={mockLessonsWithObjectives} />);
      expect(
        screen.getByText(
          "In this lesson we'll learn how to correctly label a right-angled triangle"
        )
      ).toBeInTheDocument();
    });

    it("renders multiple learning objectives", () => {
      render(<LessonCard lesson={mockLessonMultipleObjectives} />);
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(2);
    });
  });

  describe("Empty learning objectives", () => {
    it("does not render a list when there are no learning objectives", () => {
      render(<LessonCard lesson={mockLessonsNoObjectives} />);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("displays a fallback message when there are no learning objectives", () => {
      render(<LessonCard lesson={mockLessonsNoObjectives} />);
      expect(screen.getByText(/no learning objectives/i)).toBeInTheDocument();
    });
  });
});
