// DOM Queries
const outputElem = document.querySelector('.js-output');
const submitBtnElem = document.querySelector('.js-submit-btn');
const inputElem = document.querySelector('.js-user-name');

// Adding Event listeners
submitBtnElem.addEventListener('click', handleUserName);
inputElem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserName()
    }
});

// short-circuit evaluation
const storedUser = localStorage.getItem('username');
storedUser && renderUserName(storedUser);

// Primary Export
export default handleUserName;

// Function Declarations
function handleUserName() {
    const userName = inputElem.value;

    if (!userName) {
        return;
    }
    renderUserName(userName)
    saveToStorage(userName);
}


function saveToStorage(username) {
    localStorage.setItem('username', username);
}


function renderUserName(username) {
    outputElem.innerHTML = `${username}'s Personal Finance Tracker`;
    inputElem.style.display = 'none';
    submitBtnElem.style.display = 'none';
}

/* returns an object then you can destructure to use the variables

function initializeApp(params) {
    const outputElem = document.querySelector('.js-output');
    const submitBtnElem = document.querySelector('.js-submit-btn');
    const btnElem = document.querySelector('button');
    const inputElem = document.querySelector('.js-user-name');

    btnElem.addEventListener('click', handleUserName);
    inputElem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserName();
        }
    });

    const storedUser = localStorage.getItem('username');
    if (storedUser) {
        renderUserName(storedUser);
    }

    return { outputElem, submitBtnElem, inputElem };
}

const { outputElem, submitBtnElem, inputElem } = initializeApp();
*/