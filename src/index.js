'use strict';
const redux = require('redux');

(function (Polymer) { // IIFE
  const todo = require('./todo');
  const initialState = {
    inputText: '',
    ready: false,
    status: 'initial state',
    todos: []
  };

  // create redux store with initialState.
  const store = redux.createStore(todo.reducer, initialState);

  // providing connected element and action creators
  const addTodo = (text) => {
    store.dispatch(todo.addTodo(text));
  };

  const removeTodo = (index) => {
    store.dispatch(todo.removeTodo(index));
  };

  const setInputText = (text) => {
    store.dispatch(todo.setInputText(text));
  };

  // map dispatch to props
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     ready: () => dispatch(todo.setReady()),
  //     addTodo: (text) => dispatch(todo.addTodo(text)),
  //     removeTodo: (index) => dispatch(todo.removeTodo(index))
  //   }
  // }

  // const mapStateToProps = (state) => {
  //   return {
  //     inputText: state.inputText,
  //     status: state.status,
  //     todos: state.todos
  //   }
  // };

  Polymer({
    is: 'todo-app',

    properties: {
      todos: {
        type: Array,
        readonly: true
      },
      inputText: {
        type: String,
        readonly: true
      }
    },

    ready: function () {
      // TODO: connect state -> properties mapping
      store.subscribe(() => {
        const nextState = store.getState();
        console.log('state changed:', nextState);

        this.set('inputText', nextState.inputText);
        this.set('todos', nextState.todos);
      });

      // TODO: connect these actions via provider
      this.addTodo = addTodo;
      this.removeTodo = removeTodo;
      this.setInputText = setInputText;
    },

    _onTap: function () {
      this.addTodo(this.inputText);
    },

    _onInput: function (event) {
      this.setInputText(event.target.value);
    },

    _onDelete: function (event) {
      this.removeTodo(event.model.index);
    }

  });

})(Polymer);
