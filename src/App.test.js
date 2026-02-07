/**
 * Due to changes in React 17+ this file needed editing to handle
 * the fact we used useEffect and useState instead of React when importing
 */

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app with a loading state", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
