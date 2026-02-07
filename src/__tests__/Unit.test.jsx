/**
 * This file is focused on testing the Unit.jsx file for the API fetch calls.
 *
 * It tests for:
 * - Loading State
 * - Successful fetches
 * - Error state
 */

import { render, screen, waitFor } from "@testing-library/react";
import Unit from "../Unit";

// Mock data matching the API response shapes from db.json
const mockUnit = {
  id: 1,
  title: "Trigonometry 1",
  unitInfo: {
    subject: "maths",
    keyStage: "Key Stage 4",
  },
};

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

// Helper to set up fetch mock for both API calls
const mockFetchSuccess = () => {
  global.fetch = jest.fn((url) => {
    if (url.includes("/units/1/lessons")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLessons),
      });
    }
    if (url.includes("/units/1")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUnit),
      });
    }
    return Promise.reject(new Error("Unknown endpoint"));
  });
};

const mockFetchFailure = () => {
  global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));
};

// App.js renders <Unit unitId={1} /> so all tests pass unitId Prop
const renderUnit = () => render(<Unit unitId={1} />);

describe("Unit - Phase 1: Data Fetching", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Loading state", () => {
    it("displays a loading message while data is being fetched", () => {
      global.fetch = jest.fn(() => new Promise(() => {}));

      renderUnit();

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("loading message is within an aria-live region for screen readers", () => {
      global.fetch = jest.fn(() => new Promise(() => {}));

      renderUnit();

      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("Successful data fetching", () => {
    beforeEach(() => {
      mockFetchSuccess();
    });

    it("fetches unit data from the correct endpoint", async () => {
      renderUnit();

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/units/1")
        );
      });
    });

    it("fetches lesson data from the correct endpoint", async () => {
      renderUnit();

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/units/1/lessons")
        );
      });
    });

    it("removes loading message once data is loaded", async () => {
      renderUnit();

      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });

    it("renders the unit title after fetching", async () => {
      renderUnit();

      await waitFor(() => {
        expect(screen.getByText("Trigonometry 1")).toBeInTheDocument();
      });
    });

    it("renders the lesson title after fetching", async () => {
      renderUnit();

      await waitFor(() => {
        expect(screen.getByText("Applying trigonometry")).toBeInTheDocument();
      });
    });
  });

  describe("Error state", () => {
    beforeEach(() => {
      mockFetchFailure();
    });

    it("displays an error message when fetch fails", async () => {
      renderUnit();

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    it("does not display loading message when in error state", async () => {
      renderUnit();

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });

      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it("error message has role alert for screen readers", async () => {
      renderUnit();

      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
      });
    });
  });
});
