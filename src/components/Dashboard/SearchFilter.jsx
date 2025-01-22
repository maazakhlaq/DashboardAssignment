import React, { useState } from "react";
import CommonRadioButton from "../CommonComponents/Button";

const SearchFilter = ({ data, showFilters }) => {
  const [state, setState] = useState({
    searchQuery: "",
    selectedGenres: [],
    selectedYear: "",
    selectedCard: null,
    isModalOpen: false,
  });

  const uniqueGenres = [...new Set(data.flatMap((item) => item.genre))];
  const uniqueYears = [...new Set(data.map((item) => item.year))];

  const handleSearchChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      searchQuery: e.target.value,
    }));
  };

  const handleGenreChange = (genre) => {
    setState((prevState) => ({
      ...prevState,
      selectedGenres: prevState.selectedGenres.includes(genre)
        ? prevState.selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
        : [...prevState.selectedGenres, genre],
    }));
  };

  const handleYearChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedYear: e.target.value,
    }));
  };

  const handleCardClick = (item) => {
    setState((prevState) => ({
      ...prevState,
      selectedCard: item,
      isModalOpen: true,
    }));
  };

  const handleCloseModal = () => {
    setState({
      ...state,
      isModalOpen: false,
    });
  };

  const filteredData = data.filter((item) => {
    const title = item.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    const Genre = state.selectedGenres.length
      ? item.genre.some((genre) => state.selectedGenres.includes(genre))
      : true;
    const Year = state.selectedYear ? item.year === state.selectedYear : true;

    return title && Genre && Year;
  });

  return (
    <div className="bg-white px-4" data-test="search-filter">
      {state.isModalOpen && state.selectedCard && (
        <div className="absolute inset-0 top-[1%]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full h-[484px] overflow-y-auto">
            <div className="flex justify-between items-center mb-2 border-b-2">
              <div className="text-xl font-bold text-gray-800">More Details</div>
              <button
                onClick={handleCloseModal}
                className="text-gray-700 flex justify-center rounded-full w-7 h-7 bg-gray-200"
                data-test="close-modal"
              >
                x
              </button>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Title:</strong> {state.selectedCard.title}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Year:</strong> {state.selectedCard.year}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Genre:</strong> {state.selectedCard.genre.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Country:</strong> {state.selectedCard.country.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>IMDB Rating:</strong> {state.selectedCard.imdb_rating}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Oscar Nominations:</strong> {state.selectedCard.oscar_nominations}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Oscar Winning:</strong> {state.selectedCard.oscar_winning}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Cast:</strong> {state.selectedCard.cast.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Language:</strong> {state.selectedCard.language.join(", ")}
            </p>

            <div>
              <h6 className="text-sm font-bold text-gray-800">Oscar Nominations List</h6>
              <ul className="text-sm text-gray-600">
                {state.selectedCard.oscar_nominations_list.map((nomination, index) => (
                  <li key={index}>{nomination}</li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="text-sm font-bold text-gray-800">Oscar Winning List</h6>
              {state.selectedCard.oscar_winning_list.length > 0 ? (
                <ul className="text-sm text-gray-600">
                  {state.selectedCard.oscar_winning_list.map((win, index) => (
                    <li key={index}>{win}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No Oscars won.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showFilters && (
        <>
          <div className="mb-4 grid lg:grid-cols-2 sm:grid-cols-1 gap-2" data-test="filters-section">
            <div data-test="search-title">
              <label htmlFor="search-title" className="block text-sm text-gray-600 mb-2 font-bold">
                Search by Title
              </label>
              <input
                id="search-title"
                type="text"
                value={state.searchQuery}
                onChange={handleSearchChange}
                className="w-full px-2 py-[2px] border outline-none border-borderInput rounded-lg"
                placeholder="Search by title"
                data-test="search-input"
              />
            </div>
            <div data-test="filter-year">
              <label htmlFor="filter-year" className="block text-sm text-gray-600 mb-1 font-bold flex justify-between">
                <span>Filter by Year</span>
              </label>
              <select
                id="filter-year"
                value={state.selectedYear}
                onChange={handleYearChange}
                className="w-full px-2 py-[2px] border outline-none border-borderInput rounded-lg"
                data-test="year-select"
              >
                <option value="">Select Year</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year} data-test="year-option">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4" data-test="filter-genre">
            <label className="block text-sm text-gray-600 mb-2 font-bold">Filter by Genre</label>
            <div className="flex flex-wrap gap-2">
              {uniqueGenres.map((genre) => (
                <CommonRadioButton
                  key={genre}
                  label={genre}
                  name="genre"
                  value={genre}
                  checked={state.selectedGenres.includes(genre)}
                  onClick={() => handleGenreChange(genre)}
                  data-test={`genre-checkbox-${genre}`}
                />
              ))}
            </div>
          </div>
          <button
            className="px-2 py-1 mb-2 text-xs bg-red-400 text-white rounded-lg hover:bg-red-600"
            onClick={() =>
              setState({
                searchQuery: "",
                selectedGenres: [],
                selectedYear: "",
                selectedCard: null,
                isModalOpen: false,
              })
            }
            data-test="clear-filters"
          >
            Clear All Filters
          </button>
        </>
      )}

      <div className={`mt-6 grid overflow-y-auto ${showFilters ? 'h-[230px]' : 'h-[404px]'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={item.title}
              className="bg-gray-200 p-4 h-[200px] overflow-y-auto rounded-lg shadow-md cursor-pointer"
              onClick={() => handleCardClick(item)}
              data-test={`card-${item.title}`}
            >
              <h4 className="text-md font-bold text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600">
                <strong>Year:</strong> {item.year}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Genre:</strong> {item.genre.join(", ")}
              </p>
              <button
                onClick={() =>
                  handleCardClick(
                    state.selectedCard && state.selectedCard.index === index
                      ? null
                      : { ...item, index }
                  )
                }
                data-test={`see-more-details-${item.title}`}
              >
                See More Details
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm">No Data</div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
