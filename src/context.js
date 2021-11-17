import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

import reducer from "./reducer";
//? api url
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

//? initial reducer state
const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  numPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //* states
  //? reducer setup
  const [state, dispatch] = useReducer(reducer, initialState);

  //* get data
  const fetchStories = async (url) => {
    //? if want to affect a state we need to use the dispatch
    //? and pass the data to reducer
    dispatch({ type: SET_LOADING });

    try {
      const response = await fetch(url);
      const data = await response.json();
      //* using the reducer change the value
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, numPages: data.nbPages },
      });
    } catch (error) {
      console.log(`ERROR => ${error}`);
    }
  };
  //? when app loads invoke the get data function
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query,state.page]);
  //* remove story
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };
  //* handle search
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };
  //* handle page
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  //! main return
  return (
    //* we pass in the whole state so we can acces it
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
