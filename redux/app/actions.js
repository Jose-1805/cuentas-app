import types from './const';
import DB from '../../constants/DB';

const actLogin = () => {
    return {
        type:types.LOGIN
    }
    /*return dispatch => {
        return axios.post(params.URL+'/api/login',{
            'username':user.username,
            'password':user.password,
            'rememberMe':user.remember,
        })
        .then((response) => {
            dispatch({
                    type:types.LOGIN,
                    rememberMe:user.remember,
                    user:response.data.user
                });
        })
        .catch((error) => {
            return error.response.data;
        });
    }*/
}


/**
 * Acción para cerrar la sesión de un usuario con llamado a sevidor
 */
const actLogout = () => {
    return dispatch => {
        return DB.logout()
            .then(
                () => {
                    dispatch({type:types.LOGOUT});
                }
            )
    }
}

const actUpdateAccountData = () => {
    return dispatch => {
        return DB.getTotalIncomeExecuted()
        .then(
            (incomeExecuted) => {
                DB.getTotalIncomeNotExecuted()
                    .then(
                        (incomeNotExecuted) => {
                            DB.getTotalExpensesExecuted()
                            .then(
                                (expensesExecuted) => {
                                    DB.getTotalExpensesNotExecuted()
                                    .then(
                                        (expensesNotExecuted) => {
                                            DB.getIncome()
                                            .then(
                                                (income) => {
                                                    DB.getExpenses()
                                                    .then(
                                                        (expenses) => {
                                                            dispatch({
                                                                type:types.UPDATE_ACCOUNT_DATA,
                                                                totalIncomeExecuted:incomeExecuted.rows._array[0].total,
                                                                totalIncomeNotExecuted:incomeNotExecuted.rows._array[0].total,
                                                                totalExpensesExecuted:expensesExecuted.rows._array[0].total,
                                                                totalExpensesNotExecuted:expensesNotExecuted.rows._array[0].total,
                                                                income:income.rows._array,
                                                                expenses:expenses.rows._array,
                                                            })
                                                        });
                                                }); 
                                        });
                                }); 
                        });
            });
    }
    
}

export {actLogin, actLogout, actUpdateAccountData};
