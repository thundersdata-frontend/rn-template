export interface TodoItem {
  name: string;
  done?: boolean;
}
export interface TodoStore {
  dataSource: TodoItem[];
  refreshList: () => void;
  add: (todo: TodoItem) => void;
}
