import { 
    SET_ALERT
} from "./alertConstants";

const initialState = {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: ""
}

// SNACKBAR IS ACTUALLY ALERT

const alertBar = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            const { snackbarOpen, snackbarMessage, snackbarType } = action;
            return {
                ...state,
                snackbarOpen,
                snackbarType,
                snackbarMessage
            }
        default:
            return state;
    }
}

export default alertBar;