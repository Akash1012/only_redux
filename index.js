// import { createStore, combineReducers } from "redux";
console.clear();

//People dropping a form 

// This is a Action Creater
const createPolicy = (name, amount) => {
    console.log("Calling ....");
    return { // Action 
        type: 'CREATE_POLICY',
        payload: {
            name: name,
            amount: amount
        }
    }
}

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    }
}

const createClaim = (name, amountOfMoneyToCollect) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name,
            amountOfMoneyToCollect: amountOfMoneyToCollect
        }
    }
}


// Reducers (Departments)

const claimsHistory = (oldListofClaims = [], action) => {
    if (action.type === 'CREATE_CLAIM') {
        return [...oldListofClaims, action.payload]
    } else {
        return oldListofClaims
    }
}

const accounting = (bagofmoney = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
        return bagofmoney - action.payload.amountOfMoneyToCollect
    }
    else if (action.type === 'CREATE_POLICY') {
        return bagofmoney + action.payload.amount
    }

    return bagofmoney;
}

const policies = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
        return [...listOfPolicies, action.payload]
    } else if (action.type === 'DELETE_POLICY') {
        console.log("delete", action.payload)
        return listOfPolicies.filter(name => name.name !== action.payload.name);
    }

    return listOfPolicies;
}


// rootReducer

// import redux from 'redux'

const { createStore, combineReducers } = Redux;

const ourDepartment = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
})


// store

const store = createStore(ourDepartment);


// const action = createPolicy('Alex', 5);
// console.log("action", action)

store.dispatch(createPolicy('Akash', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 50));

store.dispatch(createClaim('Akash', 100))
store.dispatch(deletePolicy('Akash'))

console.log(store.getState());
