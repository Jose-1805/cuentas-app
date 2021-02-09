import types from './const';

const initState = {
    userAuth:false,
    userRegister:false,
    pin:"",
    rememberMe:false,
    totalExpensesExecuted:0,
    totalExpensesNotExecuted:0,
    totalIncomeExecuted:0,
    totalIncomeNotExecuted:0,
    balance:0
}

const reducer = (state=initState, action) => {
    switch (action.type) {

        case types.LOGIN:
            return Object.assign({}, state, {userAuth:true});
            break;
        case types.LOGOUT:
            return Object.assign({}, state, {userAuth:false});
            break;
        case types.UPDATE_ACCOUNT_DATA:
            const totalIncomeExecuted = parseFloat(action.totalIncomeExecuted?action.totalIncomeExecuted:0);
            const totalIncomeNotExecuted = parseFloat(action.totalIncomeNotExecuted?action.totalIncomeNotExecuted:0);
            const totalExpensesExecuted = parseFloat(action.totalExpensesExecuted?action.totalExpensesExecuted:0);
            const totalExpensesNotExecuted = parseFloat(action.totalExpensesNotExecuted?action.totalExpensesNotExecuted:0);
            return Object.assign({}, state, {
                totalIncomeExecuted,
                totalIncomeNotExecuted,
                totalExpensesExecuted,
                totalExpensesNotExecuted,
                balance:totalIncomeExecuted - totalExpensesExecuted,
                income:action.income,
                expenses:action.expenses,
            });
            break;
        default:
    }

    return state;
}

export default reducer;
