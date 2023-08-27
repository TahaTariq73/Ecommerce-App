import { 
    SET_ALERT
} from "./alertConstants";

// SNACKBAR IS ACTUALLY ALERT

export const setAlert = (
    snackbarOpen,
    snackbarType = "success",
    snackbarMessage = ""
) => ({
    type: SET_ALERT,
    snackbarOpen,
    snackbarType,
    snackbarMessage
})