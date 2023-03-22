import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../reduxConstants/notesConstants";

//for viewing all  his notes by  any user
export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTES_LIST_SUCCESS:
      return {
        loading: false,
        notes: action.payload,
        error: "",
      };
    case NOTES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//for Creating a new note by  any user
export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTES_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: "",
      };
    case NOTES_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//for UPDATing any note by  any user
export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTES_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: "",
      };
    case NOTES_UPDATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
//for DELETING a  note by  any user
export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTES_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: "",
      };
    case NOTES_DELETE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
