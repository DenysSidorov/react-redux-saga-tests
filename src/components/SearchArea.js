import React from 'react';
import PropTypes from 'prop-types';

const SearchArea = ({handleChangeSearch, searchHandlerEnter, searchValue}) => (
  <div className="zipCodeCont_body_list_search_container">
    <input
      type="text"
      placeholder="Search by zip code... example - 85001, 72217, 94203"
      onChange={e => {
        handleChangeSearch(e);
      }}
      onKeyPress={searchHandlerEnter}
      value={searchValue}
      className="zipCodeCont_body_list_search"
    />
    <img src="/static-files/search-Black.png" className="zipCodeCont_body_list_search_img" />
  </div>
);

SearchArea.propTypes = {
  handleChangeSearch: PropTypes.func,
  searchHandlerEnter: PropTypes.func,
  searchValue: PropTypes.string,
};

SearchArea.defaultProps = {
  handleChangeSearch: () => {},
  searchHandlerEnter: () => {},
  searchValue: '',
};

export default SearchArea;
