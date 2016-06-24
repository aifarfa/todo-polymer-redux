const chai = require('chai');
const expect = chai.expect;
const todo = require('../../src/todo.js');
const reducer = todo.reducer;

describe('todo module', () => {

  describe('reducer', () => {

    const currentState = {
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

    xit('toggle item completed', () => {
      const action = todo.toggleTodo(1);
      const nextState = reducer(currentState, action);

      expect(nextState.todos[1].completed).to.be.ok;
    });


  });
});
