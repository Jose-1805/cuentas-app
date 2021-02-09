import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("cuentasapp");

const init = () => {
	db.transaction(tx => {
		tx.executeSql(
			"create table if not exists user (id integer primary key not null, pin int, auth int);"
		);
		tx.executeSql(
			"create table if not exists income (id integer primary key not null, name text, value float, state boolean);"
		);
		tx.executeSql(
			"create table if not exists expenses (id integer primary key not null, name text, value float, state boolean);"
		);
    },
    (success) => {
    	//console.log("Success", success)
    },
    (error) => {
    	//console.log("Success", error)
    });
}

const getUser = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select * from user", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const setPin = (pin) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("delete from user where id > 0", []);

	            tx.executeSql("insert into user (pin, auth) values (?, 1)", [pin], (_, response) => {
            		success("Success");
            	});	
	        },
	        null,
	        (error) => fail(error)
	    )
	});
}



const authenticate = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update user set auth = 1 where id > 0", [], () => {
	            	success("Success");
	            });
	        },
	        null,
	        (error) => fail(error)
	    )
	});
}

const logout = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update user set auth = 0 where id > 0", [], () => {
	            	success("Success");
	            });
	        },
	        null,
	        (error) => fail(error)
	    )
	});
}

const insertIncome = (data) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("insert into income (name, value, state) values (?, ?, ?)", [data.name, data.value, data.state?1:0], (_, response) => {
            		success(response);
            	});	
	        },
	        null,
	        (error) => fail(error)
	    )
	});
}

const getIncome = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select * from income order by id DESC", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const getTotalIncomeExecuted = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select SUM(value) as total from income where state = 1", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const getTotalIncomeNotExecuted = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select SUM(value) as total from income where state = 0", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const incomeExecuted = (id) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update income set state = 1 where id = ?", [id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const incomeNotExecuted = (id) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update income set state = 0 where id = ?", [id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const deleteAllIncome = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("delete from income where id > 0", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const deleteIncome = (id) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("delete from income where id = ?", [id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const updateIncome = (data) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update income set name = ?, value = ?, state = ? where id = ?", [data.name, data.value, data.state?1:0, data.id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const insertExpenses = (data) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("insert into expenses (name, value, state) values (?, ?, ?)", [data.name, data.value, data.state?1:0], (_, response) => {
            		success(response);
            	});	
	        },
	        null,
	        (error) => fail(error)
	    )
	});
}

const getExpenses = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select * from expenses order by id desc", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const getTotalExpensesExecuted = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select SUM(value) as total from expenses where state = 1", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const getTotalExpensesNotExecuted = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("select SUM(value) as total from expenses where state = 0", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const expensesExecuted = (id) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update expenses set state = 1 where id = ?", [id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const expensesNotExecuted = (id) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update expenses set state = 0 where id = ?", [id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const deleteAllExpenses = () => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("delete from expenses where id > 0", [], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const deleteExpenses = (id) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("delete from expenses where id = ?", [id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

const updateExpenses = (data) => {
	return new Promise((success, fail) => {
		db.transaction(
	        tx => {
	            tx.executeSql("update expenses set name = ?, value = ?, state = ? where id = ?", [data.name, data.value, data.state?1:0, data.id], (_, response) => {
	            	success(response);
	            });
	        },
	        null,
	        () => fail()
	    )
	});
}

export default {
	init,
	getUser,
	setPin,
	logout,
	authenticate,

	insertIncome,
	getIncome,
	getTotalIncomeExecuted,
	getTotalIncomeNotExecuted,
	incomeExecuted,
	incomeNotExecuted,
	deleteAllIncome,
	deleteIncome,
	updateIncome,

	insertExpenses,
	getExpenses,
	getTotalExpensesExecuted,
	getTotalExpensesNotExecuted,
	expensesExecuted,
	expensesNotExecuted,
	deleteAllExpenses,
	deleteExpenses,
	updateExpenses
}