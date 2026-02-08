/**
 * Tests for UnitHeader component
 *
 * Phase 2: Unit information display
 *
 * It tests for:
 * - Heading of the Unit
 * - Heading of the Key Stage
 * - Heading of the given subject
 */

import { render, screen } from "@testing-library/react";
import UnitHeader from "../components/UnitHeader";

// Mock data matching the API response shapes from db.json
const mockUnit = {
  id: 1,
  title: "Trigonometry 1",
  unitInfo: {
    subject: "maths",
    keyStage: "Key Stage 4",
  },
};

const renderUnitHeader = () => render(<UnitHeader unit={mockUnit} />);

describe("Unit title", () => {
  it("displays the unit title as a heading", () => {
    renderUnitHeader();
    const heading = screen.getByRole("heading", {
      name: "Trigonometry 1",
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the unit title as a h1", () => {
    renderUnitHeader();
    const heading = screen.getByRole("heading", {
      name: "Trigonometry 1",
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe("Key Stage", () => {
  it("displays the key stage as a heading", () => {
    renderUnitHeader();
    const heading = screen.getByRole("heading", {
      name: /key stage 4/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the key stage as a h2", () => {
    renderUnitHeader();
    const heading = screen.getByRole("heading", {
      name: /key stage 4/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe("Subject", () => {
  it("displays the subject as a heading", () => {
    renderUnitHeader();
    const heading = screen.getByRole("heading", {
      name: /maths/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the subject as a h2", () => {
    renderUnitHeader();
    const heading = screen.getByRole("heading", {
      name: /maths/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe("Accessibility", () => {
  it("wraps unit information in a header element", () => {
    renderUnitHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
