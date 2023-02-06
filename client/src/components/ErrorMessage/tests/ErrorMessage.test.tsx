import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import ErrorMessage from "..";

describe("ErrorMessage", () => {
  it("should render error message", () => {
    const message = "Error message";
    render(<ErrorMessage message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should render request id", () => {
    const message = "Error message";
    const requestId = "Request id";
    render(<ErrorMessage message={message} requestId={requestId} />);
    expect(screen.getByText(requestId)).toBeInTheDocument();
  });
});
