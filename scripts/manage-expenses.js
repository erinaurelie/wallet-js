import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import findExpense from "../utils/expense.js";

const storedExpenses = JSON.parse(localStorage.getItem('expenses'));

export let expenses = storedExpenses || [];

let expenseId = 1;

document.addEventListener('DOMContentLoaded', renderManageExpensesHTML);


function saveToStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}


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
        return; // pop up notification
    }
    
    expenseNameElem.value = '';
    expenseAmountElem.value = '';

    saveToStorage();
}


// Generate HTML
function renderManageExpensesHTML() {
    let expenseHTML = '';
    expenses.forEach(expense => {
        expenseHTML += `
        <div class="expense-item js-expense-item-${expense.expenseId}">
            <div class="expense-description js-expense-description-${expense.expenseId}">
                    ${expense.expenseName} - $${expense.expenseAmount}
                    <div class="expense-date">
                        ${currentDate()}
                    </div>
            </div>
            <div class="expense-delete js-expense-delete" data-expense-id="${expense.expenseId}">
                <img src="images/delete-icon.png" alt="Delete">
            </div>
            <div class="edit-expense js-edit-expense js-edit-expense-${expense.expenseId}" data-expense-id=${expense.expenseId}>
                <img src="images/edit-icon.png" 
                alt="edit">
            </div>
            <button class="save-edit-button js-save-edit-button js-save-edit-button-${expense.expenseId}" data-expense-id=${expense.expenseId}>Save</button>
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


export function deleteAllExpenses() {
    if (!expenses.length) {
        return;
    }
    expenses.splice(0, expenses.length); 
    renderManageExpensesHTML();

    saveToStorage();
}


export function deleteExpense(expenseId) {
    const newExpenses = expenses.filter(expense => expense.expenseId !== Number(expenseId)); // return an array where the deleted expense is not present

    
    expenses = newExpenses;
    renderManageExpensesHTML();

    saveToStorage();
}


export function editExpense(expenseId) {
    // Locate expense
    const matchingExpense = findExpense(expenseId);

    if (!matchingExpense) {
        console.error('Expenses not found');
        return;
    }
 

    createEditInputBox(matchingExpense);
    
    document.querySelector(`.js-save-edit-button-${matchingExpense.expenseId}`).style.display = 'block';

    // remove old expense description
    const expenseDescriptionElem = document.querySelector(`.js-expense-description-${matchingExpense.expenseId}`);

    expenseDescriptionElem.remove(); 
}

function createEditInputBox(matchingExpense) {
    const expenseDiv = document.querySelector(`.js-expense-item-${matchingExpense.expenseId}`);

    const input = document.createElement('input');
    input.id = 'edit-expense-input';
    input.type = 'text';
    input.value = `${matchingExpense.expenseName} - $${matchingExpense.expenseAmount}`;
    input.setAttribute('data-expense-id', matchingExpense.expenseId);
    expenseDiv.insertBefore(input, expenseDiv.firstChild); // Should be called on a DOM element
}


export function saveNewExpense(expenseId) {
    const matchingExpense = findExpense(expenseId);
    
    const editInputElem = document.getElementById('edit-expense-input');

    const newExpenseString = editInputElem.value.split(' - $');
    
    matchingExpense.expenseName = newExpenseString[0];
    matchingExpense.expenseAmount = newExpenseString[1];

    renderManageExpensesHTML();

    
    saveToStorage();
}


// edit functionality is ready to ship. Fix the bug when trying to use Enter. I'm so proud of myself for watching the tutorial but doing this my way Maybe i'm really starting to get the hang of things LOL.