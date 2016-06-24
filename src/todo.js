'use strict';

const reducer = function (state, action) {
  switch (action.type) {
    // do reducer stuff
    case 'SET_INPUT':
      console.log('SET_INPUT', action.text);
      return Object.assign({}, state, {
        inputText: action.text
      });

    case 'ADD':
      console.log('ADD', action.item);
      return Object.assign({}, state, {
        todos: state.todos.concat([action.item])
      });

    case 'REMOVE':
      console.log('REMOVE', action.index);
      return Object.assign({}, state, {
        todos: state.todos.filter((item, index) => index !== action.index)
      });

    case 'TOGGLE':
      console.log('TOGGLE', action.index);
      const target = state.todos[action.index];
      const newItem = Object.assign({}, target, {
        completed: !target.completed
      });
      const newTodos = state.todos.map((item, index) => {
        if (index === action.index) {
          return newItem;
        }
        return item;
      });

      return Object.assign({}, state, {
        todos: newTodos
      });
    default:
      // console.warn('action.type not recognized, returns default state.')
      return state;
  }
};

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
