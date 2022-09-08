import { render, screen } from "@testing-library/react";
import { SignupPage } from ".";

test("renders signup page without crashing", () => {
  render(<SignupPage />);
  const text = screen.getByText(/Please sign up to continue./i);
  expect(text).toBeInTheDocument();
});