import {observable, autorun, action, computed, configure, decorate} from "mobx";
import {person} from "./observable1";
import {Reactions} from "./reactions";
configure({  // 开启了strict mode, 等同于useStrict(true), 必须使用action来更新被观测变量，否则会报错
    enforceActions: 'observed'  // never, observed, always
});
const list = observable([1, 2, 3]);
console.log(list);
/**
 * mobx 重要概念
 * observable： 可被追踪变化的数据 使用 1 observable(数字，数组，对象...) 2 使用@observable, observable.box(num) 使用.set来设置或用.get来获取
 * observer： 响应observable 数据更新的组件
 * computed values: 可根据observable 数据计算返回值（此处的值也可理解为是observable）的函数. 不要把 computed 和 autorun 搞混。它们都是响应式调用的表达式，但是，如果你想响应式的产生一个可以被其它 observer 使用的值，请使用 @computed，如果你不想产生一个新值，而想要达到一个效果，请使用 autorun
 * reactions: 监听observable 数据变化被触发执行的不同类型的函数, 不同的reactions的种类
 *      autorun: 提供的函数总是立即被触发一次, 依赖关系改变时会再次被触发。依赖关系指的是在autorun函数中出现过的observable数据。
 *      autorunAsync: same as autorun but you can specify how much time after it should run after the data changes in observables没看到 API 中有该函数
 *      when: 你可以设置断言，当断言生效时响应函数会执行，响应仅会被触发一次
 *      reaction: 与 autorun 类似，函数不会立即执行
 */
class Store {
    @observable number = 0;
    @action add = () => {  // 使用strict mode后，修改observable的行为都要在action中执行
        this.number++;
    }
    print = autorun(() => console.log(`the latest number is ${this.number}`));
}
const newStore = new Store();
newStore.add();

// 或者使用decorate而不是@开头的modifier
class OrderLine {
    price = 0;
    amount = 1;
    constructor(price) {
        this.price = price;
    }
    get total() {
        return this.price * this.amount;
    }
    setPrice(n){
        this.price = n;
    }
}
decorate(OrderLine, {
    price: observable,
    amount: observable,
    total: computed,
    setPrice: action
})
const ol = new OrderLine(1);
autorun(() => console.log(ol.total));
ol.setPrice(2);

export class Box {}