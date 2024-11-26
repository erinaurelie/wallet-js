import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export let expenses = [];

let expenseId = 1;

export function addExpense() {
    const expenseNameElem = document.querySelector('.js-expense-name');
    const expenseAmountElem = document.querySelector('.js-expense-amount');

    const expenseName = expenseNameElem.value;
    const expenseAmount = expenseAmountElem.value;

    if (expenseName && expenseAmount !== '') {
        expenses.push({
            expenseName,
            expenseAmount,
            expenseId
        })
        expenseId++;
        console.log(expenses);
        renderManageExpensesHTML();
    } else {
        return; // instead of just returning my plan is to code a pop up notification
    }
    
    expenseNameElem.value = '';
    expenseAmountElem.value = '';
}

export function deleteExpense(expenseId) {
    let newExpense = [];

    expenses.forEach(expense => {
        if (expenseId !== expense.expenseId) {
            newExpense.push(expense)
        }
    });

    expenses = newExpense;
    renderManageExpensesHTML();
}
// Generate HTML
function renderManageExpensesHTML() {
    let expenseHTML = '';
    expenses.forEach(expense => {
        expenseHTML += `
        <div class="expense-item">
            <div class="expense-description">
                    ${expense.expenseName} - $${expense.expenseAmount}
                    <div class="expense-date">
                        ${currentDate()}
                    </div>
            </div>
            <div class="expense-delete js-expense-delete" data-expense-id="${expense.expenseId}">
                <img src="images/delete-icon.png" alt="Delete">
            </div>
        </div>
        `
    })

    document.querySelector('.js-expenses-grid')
        .innerHTML = expenseHTML;
    
}


function currentDate() {
    const today = dayjs();
    const formattedToday = today.format('MM/DD/YYYY');
    return formattedToday;
}