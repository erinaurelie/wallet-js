import handleUserName from "./header.js";
import * as expenseModule from "./manage-expenses.js";

handleUserName();


document.querySelectorAll('.js-expense-input')
    .forEach(expenseBox => {
        expenseBox.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                expenseModule.addExpense();
            }
        })
    });

// fix the delete buttns
document.querySelectorAll('.js-expense-delete')
    .forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            const { expenseId } = deleteBtn.dataset;

            expenseModule.deleteExpense(expenseId);
            console.log('X clicked'); 
        });
    });