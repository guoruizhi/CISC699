const initState = {useSearchData: false, searchWord: ""};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_AND_USE_SEARCH":
            return {
                useSearchData: true,
                searchWord: action.text
            };
        case "RESET_SEARCH":
            return initState;
        default:
            return state;
    }
};

export default reducer;