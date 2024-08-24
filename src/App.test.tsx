import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("String Calculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const user = userEvent;

  test("should renders component", () => {
    render(<App />);
    const linkElement = screen.getByRole("heading", {
      level: 1,
      name: "String Calculator",
    });
    expect(linkElement).toBeInTheDocument();
  });

  test("should renders component and match snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test("should renders component and all loaded element", () => {
    render(<App />);
    const btnElement = screen.getByRole("button", { name: "Calculate" });
    const inputElement = screen.getByPlaceholderText(
      "Please enter string to calculate"
    );
    expect(inputElement).toBeInTheDocument();
    expect(btnElement).toBeInTheDocument();
  });

  test("should renders component and click calculate without enter value", async () => {
    render(<App />);
    await act(async () => {
      const btnElement = screen.getByRole("button", { name: "Calculate" });
      await user.click(btnElement);
    });
    const outputElement = screen.getByText("Output: 0");
    expect(outputElement).toBeInTheDocument();
  });

  test("should renders component and enter string and validate the output", async () => {
    render(<App />);
    await act(async () => {
      const btnElement = screen.getByRole("button", { name: "Calculate" });
      const inputElement = screen.getByPlaceholderText(
        "Please enter string to calculate"
      );
      await user.type(inputElement, "1,2,3");
      await user.click(btnElement);
    });

    const outputElement = screen.getByText("Output: 6");
    expect(outputElement).toBeInTheDocument();
  });

  test("should renders component and enter string with \n and other delimiter and validate the output", async () => {
    render(<App />);
    await act(async () => {
      const btnElement = screen.getByRole("button", { name: "Calculate" });
      const inputElement = screen.getByPlaceholderText(
        "Please enter string to calculate"
      );
      await user.type(inputElement, "//;\\n1;2\\n3;4\\n4;5");
      await user.click(btnElement);
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    const outputElement = await screen.findByText("Output: 19");
    expect(outputElement).toBeInTheDocument();
  });

  test("should renders component and enter string with negative number and validate the output", async () => {
    render(<App />);
    await act(async () => {
      const btnElement = screen.getByRole("button", { name: "Calculate" });
      const inputElement = screen.getByPlaceholderText(
        "Please enter string to calculate"
      );
      await user.type(inputElement, "//;\\n1;2\\n3;4\\n4;5;-4;-3");
      await user.click(btnElement);
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    const outputElement = await screen.findByText("Output: 19");
    expect(outputElement).toBeInTheDocument();
    const errorElement = await screen.findByText(
      "negative numbers not allowed -4, -3"
    );
    expect(errorElement).toBeInTheDocument();
  });
});
