'use strict';
const redux = require('redux');

/**
 * [description]
 * @param  {Array} state  current todos state.
 * @param  {Object} action given action
 * @return {Array}        new todos state.
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      console.log('ADD', action.item);
      return state.concat([action.item]);

    case 'REMOVE':
      console.log('REMOVE', action.index);
      return state.filter((item, index) => index !== action.index);

    case 'TOGGLE':
      // {
      console.log('TOGGLE', action.index);
      const target = state[action.index];
      const newItem = Object.assign({}, target, {
        completed: !target.completed
      });
      const nextTodos = state.map((item, index) => {
        if (index === action.index) {
          return newItem;
        }
        return item;
      });
      return nextTodos;

    default:
      return state;
  }
}

/**
 * reduce state -> nextState
 * @param  {String} state  =             '' current inputText
 * @param  {Object} action {type, text}
 * @return {String}        new inputText
 */
const inputText = (state = '', action) => {
  switch (action.type) {
    // do reducer stuff
    case 'SET_INPUT':
      console.log('SET_INPUT', action.text);
      return action.text; // as next state
    default:
      return state;
  }
};

const reducer = redux.combineReducers({
  inputText,
  todos
});

// action creators

/**
 * for one-way binding
 * @param  {[String]} text current inputText
 * @return {[action]}      SET_INPUT
 */
const setInputText = (text) => {
  return {
    type: 'SET_INPUT',
    text
  }
};

const addTodo = (text) => {
  return {
    type: 'ADD',
    item: {
      text,
      completed: false
    }
  };
};

const removeTodo = (index) => {
  return {
    type: 'REMOVE',
    index
  };
};

const toggleTodo = (index) => {
  return {
    type: 'TOGGLE',
    index
  };
};

module.exports = {
  reducer,
  addTodo,
  removeTodo,
  setInputText,
  toggleTodo
};
