import { expenses } from "../scripts/manage-expenses.js";


function findExpense(expenseId) {
    let matchingExpense;

    expenses.forEach(expense => {
        if (expense.expenseId === Number(expenseId)) {
            matchingExpense = expense;
        }
    });
    

    return matchingExpense;
}

export default findExpense;