import { TodoStore, TodoItem } from '../interfaces/todo';

const todoModel = {
  dataSource: [],
};

const todoStore: TodoStore = {
  ...todoModel,
  // methods
  async refreshList() {
    this.dataSource = await new Promise(resolve =>
      setTimeout(() => {
        resolve([{ name: 'react' }, { name: 'vue', done: true }, { name: 'angular' }]);
      }, 1000),
    );
  },
  add(todo: TodoItem) {
    this.dataSource.push(todo);
  },
};
export default todoStore;
