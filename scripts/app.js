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


// Event listeners for generated HTML
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.js-expenses-grid').addEventListener('click', event => {
        if (event.target.classList.contains('js-expense-delete') || event.target.closest('.js-expense-delete')) {
            const { expenseId } = event.target.closest('.js-expense-delete').dataset; 
        
            expenseModule.deleteExpense(expenseId);
        } else if (event.target.classList.contains('js-edit-expense') || event.target.closest('.js-edit-expense')) {
            const { expenseId } = event.target.closest('.js-edit-expense').dataset;
            
            if (!document.getElementById('edit-expense-input')) {
                expenseModule.editExpense(expenseId);
            } else {
                console.error('Edit Input Box already created');
                return;
            }
        } else if (event.target.classList.contains('js-save-edit-button') || event.target.closest('.js-edit-expense')) {
            const { expenseId } = event.target.closest('.js-save-edit-button').dataset;
            
            expenseModule.saveNewExpense(expenseId);
        }
    });

    document.querySelector('.js-expenses-grid').addEventListener('keydown', event => {
        if (event.target.closest('#edit-expense-input')) {
            if (event.key === 'Enter') {
                const { expenseId } = event.target.closest('#edit-expense-input').dataset;
                expenseModule.saveNewExpense(expenseId)
            }

        }
    });

});


document.querySelector('.js-delete-all-expenses')
    .addEventListener('click', () => {
        expenseModule.deleteAllExpenses();
    });
