import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {

    case SET_LOADING:
      return {
        ...state, isLoading: true
      };
      break;

    case SET_STORIES:
      //* received API data
      return {
        ...state,
        isLoading: false,
          hits: action.payload.hits,
          numPages: action.payload.numPages
      };
      break;

    case HANDLE_SEARCH:
      //* handle search input
      return {
        ...state,
        query: action.payload,
          page: 0
      }

      case REMOVE_STORY:
        //* remove story
        //? filter the array and return the stories that the id doesnt match to the one passed to the reducer
        return {
          ...state,
          hits: state.hits.filter((story) => story.objectID !== action.payload)
        }

        case HANDLE_PAGE:
          //* pagination
          if (action.payload === "increase") {
            let nextPage = state.page + 1;

            if (nextPage > (state.numPages - 1)) {
              nextPage = 0;
            }
            return {
              ...state,
              page: nextPage
            }
          }

            if (action.payload === "decrease") {
              let prevPage = state.page - 1;
              
              if (prevPage < 0) {
                prevPage = state.numPages - 1;
              }
              return {
                ...state,
                page: prevPage
              }
          }


          default:
            throw new Error(`No matching ${action.type} type.`);
            break;
  }
};
export default reducer;