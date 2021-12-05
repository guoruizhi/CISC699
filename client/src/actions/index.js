import axios from 'axios';

/*
    Actions to set employee to edit
 */
export const setEmployeeToEdit = (obj) => {
    return {
        type: "SET_EMPLOYEE_TO_EDIT",
        employee: obj
    }
};
export const resetEmployeeToEdit = () => {
    return {
        type: "RESET_EMPLOYEE_TO_EDIT",
    }
};

/*
    Actions to get all employees.
 */
const getAllEmployeesStart = () =>{
    return {
        type: 'GET_ALL_EMPLOYEES_START'
    };
};

const getAllEmployeesSuccess = (response) =>{
    return {
        type: 'GET_ALL_EMPLOYEES_SUCCESS',
        data: response.data
    };
};

const getAllEmployeesFail = (error) =>{
    return {
        type: 'GET_ALL_EMPLOYEES_FAIL',
        error
    };
};

export const getAllEmployees = () => {
    return (dispatch, store) => {
        dispatch(getAllEmployeesStart());
        axios
            .get('/employees')
            .then(response => {
                dispatch(getAllEmployeesSuccess(response));
            })
            .catch(err => {
                dispatch(getAllEmployeesFail(err));
            });
    };
};
/*
    Actions to add new employee.
 */

const addEmployeeStart = () =>{
    return {
        type: 'ADD_EMPLOYEE_START'
    };
};

const addEmployeeSuccess = (response) =>{
    return {
        type: 'ADD_EMPLOYEE_SUCCESS',
        response
    };
};

const addEmployeeFail = (error) =>{
    return {
        type: 'ADD_EMPLOYEE_FAIL',
        error
    };
};

export const createNewEmployee = (newEmployee) => {
    return (dispatch, store) => {
        dispatch(addEmployeeStart());
        axios
            .post('/employees', newEmployee)
            .then(response => {
                dispatch(addEmployeeSuccess(response));
                dispatch(getAllEmployees());
            })
            .catch(err => {
                dispatch(addEmployeeFail(err));
                console.log(err);
            });
    };
};

/*
    Action to edit employee
 */
const editEmployeeStart = () =>{
    return {
        type: 'EDIT_EMPLOYEE_START'
    };
};

const editEmployeeSuccess = (response) =>{
    return {
        type: 'EDIT_EMPLOYEE_SUCCESS',
        response
    };
};

const editEmployeeFail = (error) =>{
    return {
        type: 'EDIT_EMPLOYEE_FAIL',
        error
    };
};

export const updateEmployee = (obj) => {
    return (dispatch, store) => {
        dispatch(editEmployeeStart());
        axios
            .put(`/employees/${obj._id}`, obj)
            .then(response => {
                dispatch(editEmployeeSuccess(response));
                dispatch(getAllEmployees());
            })
            .catch(err => {
                dispatch(editEmployeeFail(err));
                console.log(err);
            });
    };
};

/*
    Actions to delete employee
 */
const deleteEmployeeSuccess = (response) =>{
    return {
        type: 'DELETE_EMPLOYEE_SUCCESS',
        response
    };
};

const deleteEmployeeFail = (error) =>{
    return {
        type: 'DELETE_EMPLOYEE_FAIL',
        error
    };
};

export const deleteEmployee = (id) => {
    return (dispatch, store) => {
        axios
            .delete('/employees/'+ id)
            .then(response => {
                dispatch(deleteEmployeeSuccess(response));
                dispatch(getAllEmployees());
            })
            .catch(err => {
                dispatch(deleteEmployeeFail(err));
            });
    };
};

/*
    Actions to get one employee
 */
const getOneEmployeeStart = () =>{
    return {
        type: 'GET_ONE_EMPLOYEE_START'
    };
};

const getOneEmployeeSuccess = (response) =>{
    return {
        type: 'GET_ONE_EMPLOYEE_SUCCESS',
        response
    };
};

const getOneEmployeeFail = (error) =>{
    return {
        type: 'GET_ONE_EMPLOYEE_FAIL',
        error
    };
};

export const resetOneEmployee = () =>{
    return {
        type: 'RESET_ONE_EMPLOYEE'
    };
};

export const getOneEmployee = (id) => {
    return (dispatch, store) => {
        dispatch(getOneEmployeeStart());
        axios
            .get(`/employees/${id}`)
            .then(response => {
                dispatch(getOneEmployeeSuccess(response.data));
                dispatch(getAllEmployees());
            })
            .catch(err => {
                dispatch(getOneEmployeeFail(err));
                console.log(err);
            });
    };
};



/*
    Actions about search
 */
export const setAndUseSearch = (text) => {
    return {
        type: "SET_AND_USE_SEARCH",
        text
    }
};

export const resetSearch = () => {
    return {
        type: "RESET_SEARCH"
    }
};