const initState = { isFetching: false, data: [], err: null};

const reducer = (state = initState, action) => {
    switch (action.type) {
        // Actions to get all
        case 'GET_ALL_EMPLOYEES_START':
            return {
                ...state,
                isFetching: true
            };
        case 'GET_ALL_EMPLOYEES_FAIL':
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        case 'GET_ALL_EMPLOYEES_SUCCESS':
            return {
                ...state,
                isFetching: false,
                err: null,
                data: action.data
            };
        // Actions to post one
        case "ADD_EMPLOYEE_START":
            return {
                ...state,
                isFetching: true
            };
        case "ADD_EMPLOYEE_FAIL":
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        case "ADD_EMPLOYEE_SUCCESS":
            return {
                ...state,
                isFetching: false,
                response: action.response
            };
        case "SET_EMPLOYEE_TO_EDIT":
            return {
                ...state,
                employee: action.employee
            };
        case "RESET_EMPLOYEE_TO_EDIT":
            return {
                ...state,
                employee: ""
            };

        // Actions to put one
        case "EDIT_EMPLOYEE_START":
            return {
                ...state,
                isFetching: true
            };
        case "EDIT_EMPLOYEE_FAIL":
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        case "EDIT_EMPLOYEE_SUCCESS":
            return {
                ...state,
                isFetching: false,
                response: action.response
            };
        // Actions to delete one
        case "DELETE_EMPLOYEE_FAIL":
            return {
                ...state,
                error: action.error
            };
        case "DELETE_EMPLOYEE_SUCCESS":
            return {
                ...state,
                response: action.response
            };
        // Actions to get one
        case 'GET_ONE_EMPLOYEE_START':
            return {
                ...state,
                isFetching: true
            };
        case 'GET_ONE_EMPLOYEE_FAIL':
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        case 'GET_ONE_EMPLOYEE_SUCCESS':
            return {
                ...state,
                isFetching: false,
                err: null,
                profile: action.response
            };
        case 'RESET_ONE_EMPLOYEE':
            return {
                ...state,
                profile: {}
            }
        default:
            return state;
    }
};

export default reducer;