import {
  UPDATE_CHAPTER_LIST,
  UPDATE_EVENT_LIST,
  UPDATE_SELECTED_CHAPTER,
  UPDATE_SELECTED_EVENT,
  CHANGE_DATA_FETCHING,
} from "./applicationTypes";

const initialState: {} = {
  chapterList: null,
  eventList: null,
  chapter: null,
  event: null,
};

const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_CHAPTER_LIST:
      return {
        ...state,
        chapterList: action.chapterList,
      };
    case UPDATE_EVENT_LIST:
      return {
        ...state,
        eventList: action.eventList,
      };
    case UPDATE_SELECTED_CHAPTER:
      return {
        ...state,
        chapter: action.chapter,
      };
    case UPDATE_SELECTED_EVENT:
      return {
        ...state,
        event: action.event,
      };
    case CHANGE_DATA_FETCHING:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default applicationReducer;
