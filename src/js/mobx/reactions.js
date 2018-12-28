import {observable, computed, decorate, comparer, autorun, reaction, action} from "mobx";
import {observer} from "mobx-react";
import React from "react";
/** computed
 * 计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。 
 * 概念上来说，它们与excel表格中的公式十分相似。 不要低估计算值，因为它们有助于使实际可修改的状态尽可能的小。 此外计算值还是高度优化过的，所以尽可能的多使用它们。
 * 不要把 computed 和 autorun 搞混。它们都是响应式调用的表达式，但是，
 * 如果你想响应式的产生一个可以被其它 observer 使用的值，请使用 @computed，
 * 如果你不想产生一个新值，而想要达到一个效果，请使用 autorun。
 */
class OrderLine {
    @observable price = 0;
    @observable amount = 1;
    constructor(price) {
        this.price = price;
    }
    @computed get total() {
        return this.price * this.amount;
    }
}
// 或者用decorate
const orderLine = observable.object({
    price: 0,
    amount: 1,
    get total() {
        return this.price * this.amount
    },
    set total(total) {
        this.price = total / this.amount // 从 total 中推导出 price
    }
})
/**
 * computed 还可以直接当做函数来调用
 */
const name = observable.box("John");
const upperCaseName = computed(() =>
    name.get().toUpperCase()
);
const disposer = upperCaseName.observe(change => console.log(change.newValue));
name.set("Dave");

/** mobx 内置比较器 */
console.log(comparer.identity) // 使用恒等 (===) 运算符来判定两个值是否相同。
console.log(comparer.default)  //  等同于 comparer.identity，但还认为 NaN 等于 NaN 。
console.log(comparer.structural)  // 执行深层结构比较以确定两个值是否相同。

/**
 * Autorun
 * 经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值，请使用autorun。 其余情况都应该使用 computed
*/
const numbers = observable([1,2,3]);
const sum = computed(() => numbers.reduce((a, b) => a + b, 0));
const disposer1 = autorun(() => console.log(sum.get()));  // 输出 '6'
numbers.push(4);  // 输出 '10'
disposer1();
numbers.push(5);  // 不会再输出任何值。`sum` 不会再重新计算。
/**
 * Autorun 接收第二个参数，它是一个参数对象，有如下可选的参数:
        delay: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。
        name: 字符串，用于在例如像 spy 这样事件中用作此 reaction 的名称。
        onError: 用来处理 reaction 的错误，而不是传播它们。
        scheduler: 设置自定义调度器以决定如何调度 autorun 函数的重新运行
 */


 /** when
  * when(predicate: () => boolean, effect?: () => void, options?)
  * when 观察并运行给定的 predicate，直到返回true。 一旦返回 true，给定的 effect 就会被执行，
  * 然后 autorunner(自动运行程序) 会被清理。 该函数返回一个清理器以提前取消自动运行程序。
  */
 class MyResource {
    constructor() {
        when(
            // 一旦...
            () => !this.isVisible,
            // ... 然后
            () => this.dispose()
        );
    }
    @computed get isVisible() {
        // 标识此项是否可见
    }
    dispose() {
        // 清理
    }
}
/** 如果没提供 effect 函数，when 会返回一个 Promise 。它与 async / await 可以完美结合。 */
async function fn() {
    await when(() => that.isVisible)
    // 等等..
}

/** reaction
 * 用法: reaction(() => data, (data, reaction) => { sideEffect }, options?)。
 * autorun 的变种，对于如何追踪 observable 赋予了更细粒度的控制。 它接收两个函数参数，
 * 第一个(数据 函数)是用来追踪并返回数据作为第二个函数(效果 函数)的输入。 
 * 不同于 autorun 的是当创建时效果 函数不会直接运行，只有在数据表达式首次返回一个新值后才会运行。 在执行 效果 函数时访问的任何 observable 都不会被追踪。
 */
const counter = observable({ count: 0 });
const reaction3 = reaction(
    () => counter.count,
    (count, reaction) => {
        console.log("reaction 3: invoked. counter.count = " + count);
        reaction.dispose();
    }
);
counter.count = 1;
// 输出:
// reaction 3: invoked. counter.count = 1
counter.count = 2;
// 输出:
// (There are no logging, because of reaction disposed. But, counter continue reaction)
console.log(counter.count);
// 输出:
// 2

/** @observer
 * observer 函数/装饰器可以用来将 React 组件转变成响应式组件。
 * 如下seconds和seconds1的效果相同，
 * seconds使用了注解的方式
 * seconds1使用了普通的方式，注意primitive type要用observable.box(0).
 * 无论是@action或者action(function) 或者 autorun(function), 其实都只是对方法的包裹，他们本质和使用还是方法自身
 */
@observer export class MyTimer extends React.Component {
    constructor(props){
        super(props);
        this.seconds1 = observable.box(0);
        setInterval(() => {
            this.increase();
            this.increase1();
        }, 1000);
    }
    @observable seconds = 0;
    @action increase = () => this.seconds ++;
    increase1 = action(() => this.seconds1.set(this.seconds1.get() + 1));
    // println = autorun(() => console.log(this.seconds));
    render() {
        return (<span>Seconds passed: {this.seconds}, seconds1: {this.seconds1.get()} </span> )
    }
};

export class Reactions{}