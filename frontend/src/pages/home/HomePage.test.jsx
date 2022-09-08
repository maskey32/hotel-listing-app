import { render, screen } from "@testing-library/react";
import { HomePage } from ".";

test("renders home page without crashing", () => {
  render(<HomePage />);
  const welcomeElement = screen.getByText(/Welcome to Double X web app./i);
  expect(welcomeElement).toBeInTheDocument();
});