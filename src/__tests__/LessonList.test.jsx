/**
 * Tests for LessonList component
 *
 * Phase 3: Lesson information display
 *
 * It tests for:
 * - Lesson count for the unit
 * - Lesson titles for the given unit
 */

import { render, screen } from "@testing-library/react";
import LessonList from "../components/LessonList";

// Mock data matching the API response shapes from db.json
const mockLessons = [
  {
    unitId: 1,
    id: 1,
    title: "Use tangent to find a length",
    recommendedOrderInUnit: 2,
    learningObjectives: [
      "In this lesson we'll learn how to correctly label a right-angled triangle",
    ],
  },
  {
    unitId: 1,
    id: 1,
    title: "Use sine and cosine to find a length",
    recommendedOrderInUnit: 3,
    learningObjectives: [
      "In this lesson, we will calculate missing lengths using sine and cosine trigonometric ratios.",
    ],
  },
  {
    unitId: 1,
    id: 1,
    title: "Know tangent, sine and cosine",
    recommendedOrderInUnit: 4,
    learningObjectives: [
      "In this lesson, we will learn how to correctly label a right-angled triangle, and identify the correct trigonometric ratio to use.",
    ],
  },
  {
    unitId: 1,
    id: 1,
    title: "Applying trigonometry",
    recommendedOrderInUnit: 1,
    learningObjectives: [],
  },
];

const renderLessonList = () => render(<LessonList lessons={mockLessons} />);

describe("LessonList - Phase 3: Lesson Information Display", () => {
  describe("Lesson count", () => {
    it("displays the number of lessons", () => {
      renderLessonList();
      expect(screen.getByText(/4 lessons/i)).toBeInTheDocument();
    });
  });

  describe("Lesson titles", () => {
    it("displays all lesson titles", () => {
      renderLessonList();
      expect(screen.getByText("Applying trigonometry")).toBeInTheDocument();
      expect(
        screen.getByText("Use tangent to find a length")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Use sine and cosine to find a length")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Know tangent, sine and cosine")
      ).toBeInTheDocument();
    });
  });

  describe("Lesson ordering", () => {
    it("renders lessons sorted by recommendedOrderInUnit", () => {
      renderLessonList();
      const headings = screen.getAllByRole("heading", {
        level: 3,
      });

      // First lesson should be "Applying trigonometry" (order: 1)
      expect(headings[0]).toHaveTextContent("Applying trigonometry");

      // Second lesson should be "Use tangent to find a length" (order: 2)
      expect(headings[1]).toHaveTextContent("Use tangent to find a length");

      // Third lesson should be "Use sine and cosine to find a length" (order: 3)
      expect(headings[2]).toHaveTextContent(
        "Use sine and cosine to find a length"
      );

      // Fourth lesson should be "Know tangent, sine and cosine" (order: 4)
      expect(headings[3]).toHaveTextContent("Know tangent, sine and cosine");
    });
  });

  describe("Accessibility", () => {
    it("renders lessons in an ordered list", () => {
      renderLessonList();
      const lists = screen.getAllByRole("list");
      const orderedList = lists.find((list) => list.tagName === "OL");
      expect(orderedList).toBeInTheDocument();
    });

    it("wraps section with accessible lable", () => {
      renderLessonList();
      expect(
        screen.getByRole("region", { name: /lessons/i })
      ).toBeInTheDocument();
    });
  });
});
