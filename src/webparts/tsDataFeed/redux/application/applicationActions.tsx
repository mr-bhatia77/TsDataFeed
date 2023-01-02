import { UPDATE_CHAPTER_LIST,UPDATE_EVENT_LIST,UPDATE_SELECTED_CHAPTER,UPDATE_SELECTED_EVENT,CHANGE_DATA_FETCHING } from './applicationTypes';

export const updateChapterList = (chapterList:any) => {
    return {
        type: UPDATE_CHAPTER_LIST,
        page: chapterList
    }
}

export const updateSelectedChapter = (chapter:any) => {
    console.log(chapter)
    return {
        type: UPDATE_SELECTED_CHAPTER,
        chapter: chapter
    }
}

export const updateEventList = (eventList:any) => {
    // console.log(chapter)
    return {
        type: UPDATE_EVENT_LIST,
        eventList: eventList
    }
}

export const updateSelectedEvent = (event:any) => {
     console.log(event)
    return {
        type: UPDATE_SELECTED_EVENT,
        event: event
    }
}

export const changeDataFetching = () => {
    // console.log(chapter)
    return {
        type: CHANGE_DATA_FETCHING,
    }
}