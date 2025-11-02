import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NavBar", () => {
  it("renders the logo", () => {
    render(<NavBar />);
    expect(screen.getByText(/Orion Academy/i)).toBeInTheDocument();
  });

  it("shows dashboard button for student", () => {
    localStorage.setItem("role", "student");
    render(<NavBar />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it("navigates to dashboard on click", () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    localStorage.setItem("role", "teacher");

    render(<NavBar />);
    fireEvent.click(screen.getByText(/Dashboard/i));
    expect(push).toHaveBeenCalledWith("/uploadAttendance");
  });
});
