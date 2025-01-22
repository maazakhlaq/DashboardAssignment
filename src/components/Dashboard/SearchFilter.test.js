import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilter from "./SearchFilter";


jest.mock("../CommonComponents/Button", () => ({ label, checked, onClick }) => (
  <button onClick={onClick} data-testid={`genre-${label}`}>
    {label} {checked ? "(Selected)" : ""}
  </button>
));

describe("SearchFilter Component", () => {
  const mockData = [
    {
      title: "Movie A",
      year: "2021",
      genre: ["Action", "Drama"],
      country: ["USA"],
      imdb_rating: 8.5,
      oscar_nominations: 2,
      oscar_winning: 1,
      oscar_nominations_list: ["Best Picture", "Best Actor"],
      oscar_winning_list: ["Best Actor"],
      cast: ["Actor A", "Actor B"],
      language: ["English"],
    },
    {
      title: "Movie B",
      year: "2022",
      genre: ["Comedy"],
      country: ["UK"],
      imdb_rating: 7.8,
      oscar_nominations: 1,
      oscar_winning: 0,
      oscar_nominations_list: ["Best Original Screenplay"],
      oscar_winning_list: [],
      cast: ["Actor C", "Actor D"],
      language: ["English"],
    },
  ];

  it("renders the SearchFilter component", () => {
    render(<SearchFilter data={mockData} showFilters={true} />);
    expect(screen.getByText("Search by Title")).toBeInTheDocument();
    expect(screen.getByText("Filter by Year")).toBeInTheDocument();
    expect(screen.getByText("Filter by Genre")).toBeInTheDocument();
  });

  it("filters data based on search input", () => {
    render(<SearchFilter data={mockData} showFilters={true} />);
    const searchInput = screen.getByPlaceholderText("Search by title");

    fireEvent.change(searchInput, { target: { value: "Movie A" } });
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.queryByText("Movie B")).not.toBeInTheDocument();
  });

  it("filters data by genre", () => {
    render(<SearchFilter data={mockData} showFilters={true} />);
    const actionButton = screen.getByTestId("genre-Action");

    fireEvent.click(actionButton);
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.queryByText("Movie B")).not.toBeInTheDocument();
  });

  it("filters data by year", () => {
    render(<SearchFilter data={mockData} showFilters={true} />);
    const yearSelect = screen.getByLabelText("Filter by Year");

    fireEvent.change(yearSelect, { target: { value: "2022" } });
    expect(screen.getByText("Movie B")).toBeInTheDocument();
    expect(screen.queryByText("Movie A")).not.toBeInTheDocument();
  });

  it("clears all filters", () => {
    render(<SearchFilter data={mockData} showFilters={true} />);
    const clearButton = screen.getByText("Clear All Filters");

    fireEvent.click(clearButton);
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
  });

  
  it("displays 'No Data' when there are no results", () => {
    render(<SearchFilter data={mockData} showFilters={true} />);
    const searchInput = screen.getByPlaceholderText("Search by title");

    fireEvent.change(searchInput, { target: { value: "Non-existent Movie" } });
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });
});
