import { render, createVNode } from 'vue';
import MshMessageBox from './MshMessageBox.vue';
import _ from 'lodash';

const getContainer = () => document.createElement('div');

const initInstance = (props, container) => {
  const vnode = createVNode(MshMessageBox, props);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild);
  return vnode.component;
};

const destoryInstance = (container) => {
  render(null, container);
};

const showMessage = (option) => {
  return new Promise((resolve, reject) => {
    const props = _.cloneDeep(option ?? {});
    props.onAction = (action) => {
      if (action === 'cancle') {
        reject(action);
      } else {
        resolve(action);
      }
    };
    props.onVanish = () => {
      destoryInstance(container);
    };
    const container = getContainer();
    const instance = initInstance(props, container);
    const vm = instance?.proxy;
    Object.keys(props).forEach((prop) => {
      if (_.has(props, prop) && !_.has(vm.$props, prop)) {
        vm[prop] = props[prop];
      }
    });
    vm.trigger = true;
  });
};

export default showMessage;
