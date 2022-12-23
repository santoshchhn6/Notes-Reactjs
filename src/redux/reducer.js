import { Actions } from "./actions";

export const notesInitialState = {
  notes: [],

  selectedNote: null,
};
export const appInitialState = {
  showAddNote: false,
  searchTerm: "",
};

export const notesReducer = (state = notesInitialState, action) => {
  switch (action.type) {
    case Actions.ADD_NOTE: {
      const n = { ...state, notes: [...state.notes, action.payload] };
      setLocalNote(n);
      return n;
    }
    case Actions.UPDATE_NOTE: {
      const n = {
        ...state,
        notes: [
          ...state.notes.filter((note) => note.id !== action.payload.id),
          action.payload,
        ],
      };
      setLocalNote(n);
      return n;
    }
    case Actions.DELETE_NOTE: {
      const n = {
        ...state,
        notes: [...state.notes.filter((note) => note.id !== action.payload)],
      };
      setLocalNote(n);
      return n;
    }
    case Actions.GET_NOTES: {
      return { ...state, notes: action.payload };
    }
    case Actions.EDIT_NOTE: {
      return { ...state, selectedNote: action.payload };
    }
    case Actions.RESET_SELECTED: {
      return { ...state, selectedNote: null };
    }

    default:
      return state;
  }
};

export const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case Actions.SHOW_ADD_NOTE:
    case Actions.HIDE_ADD_NOTE: {
      return { ...state, showAddNote: action.payload };
    }
    case Actions.SET_SEARCH_TERM: {
      return { ...state, searchTerm: action.payload };
    }

    default:
      return state;
  }
};

const setLocalNote = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
