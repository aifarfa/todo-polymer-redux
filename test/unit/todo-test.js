const chai = require('chai');
const expect = chai.expect;
const todo = require('../../src/todo.js');
const reducer = todo.reducer;

describe('todo module', () => {

  describe('reducer', () => {

    const currentState = {
      inputText: '',
      todos: [{
        text: 'first',
        completed: false
      }, {
        text: 'second',
        completed: false
      }]
    };

    it('add new item on action.type: "ADD"', () => {
      const action = todo.addTodo('something new');
      const nextState = reducer(currentState, action);

      expect(nextState.todos.length).to.equals(3);
      expect(nextState.todos[2].text).to.equals('something new');
    });

    it('remove item on action.type: "REMOVE"', () => {
      const action = todo.removeTodo(1);
      const nextState = reducer(currentState, action);

      expect(nextState.todos.length).to.equals(1);
      expect(nextState.todos[0].text).to.equals('first');
    });

    it('set inputText when dispatch "SET_INPUT"', () => {
      const action = todo.setInputText('woow');
      const nextState = reducer(currentState, action);

      expect(nextState.inputText).to.equals('woow');
    });

    it('toggle item completed', () => {
      const action = todo.toggleTodo(1);
      const nextState = reducer(currentState, action);

      expect(nextState.todos[0].completed).to.be.false;
      expect(nextState.todos[1].completed).to.be.ok;
    });

    it('toggle item completed inverse', () => {
      const action = todo.toggleTodo(0);
      const nextState = reducer(currentState, action);
      expect(nextState.todos[0].completed).to.be.ok;

      const lastState = reducer(nextState, action);
      expect(lastState.todos[0].completed).to.be.false;
    });

  });
});
