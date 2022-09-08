import { render, screen } from "@testing-library/react";
import { SigninPage } from ".";

test("renders signin page without crashing", () => {
  render(<SigninPage />);
  const text = screen.getByText(/Please sign in to continue./i);
  expect(text).toBeInTheDocument();
});