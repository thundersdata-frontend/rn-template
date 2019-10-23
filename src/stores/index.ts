import IceStore from '@ice/store';
import todoStore from './todos';

const iceStore = new IceStore();
const store = {
  todoStore,
};
Object.keys(store).forEach(key => {
  iceStore.registerStore(key, store[key]);
});

export default iceStore;
