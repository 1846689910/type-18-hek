import {observable, configure, computed, decorate, comparer, autorun, reaction, action, runInAction, flow, when} from "mobx";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import React from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
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

configure({  // 开启了strict mode, 等同于useStrict(true), 必须使用action来更新被观测变量，否则会报错
    enforceActions: 'observed'  // never, observed, always
});

// 对于普通的类，应用mobx
class Store {
    @observable number = 0;
    @action add = () => this.number++;  // 使用strict mode后，修改observable的行为都要在action中执行
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



const dummyFetch = async() => await new Promise(resolve => setTimeout(() => resolve(123), 1000));
// dummyFetch().then(res => console.log(res));

@observer export default class MobXConcise extends React.Component {
    constructor(props){
        super(props);
        this.myNum1 = observable.box(0);
        /** 基本类型使用observable.box()
         * observable.box(value) 接收任何值并把值存储到箱子中。 使用 .get() 可以获取当前值，使用 .set(newValue) 可以更新值。
         * .get() - 返回当前值。
         * .set(value) - 替换当前存储的值并通知所有观察者。
         * intercept(interceptor) - 可以用来在任何变化应用前将其拦截。参见 observe & intercept。
         * .observe(callback: (change) => void, fireImmediately = false): disposerFunction - 注册一个观察者函数，每次存储值被替换时触发。返回一个函数以取消观察者。参见 observe & intercept。change 参数是一个对象，其中包含 observable 的 newValue 和 oldValue 。
         */
        this.myObj1 = observable({abc: 123});  // observable.object(props, decorators?, options?)
        // 如果把一个普通的 JavaScript 对象传递给 observable 方法，对象的所有属性都将被拷贝至一个克隆对象并将克隆对象转变成可观察的。
        // (普通对象是指不是使用构造函数创建出来的对象，而是以 Object 作为其原型，或者根本没有原型。) 
        // 只有普通的对象可以转变成 observable 。对于非普通对象，构造函数负责初始化 observable 属性。 
        // 要么使用 @observable 注解，要么使用 extendObservable 函数
        this.myArr = observable([
            { title: "Spoil tea", completed: true },
            { title: "Make coffee", completed: false }
        ]);
        this.observableMap2 = observable(new Map);
        setInterval(() => {
            // this.addNum1();
            this.addNum1_1();
            // this.addNum2();
            this.addNum2_1();
            // this.myFetchFn();
            this.myFetchFn1();
        }, 1000);
        autorun(() => {  // 经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值，请使用autorun。 其余情况都应该使用 computed
            if (this.myNum1.get() > 10) {
                console.log(this.sum);
                action(() => this.myNum1.set(0))();  // 对observable.box(),只能在这里autorun, self-execute function
            }
        });
        /**
         * Autorun 接收第二个参数，它是一个参数对象，有如下可选的参数:
                delay: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。
                name: 字符串，用于在例如像 spy 这样事件中用作此 reaction 的名称。
                onError: 用来处理 reaction 的错误，而不是传播它们。
                scheduler: 设置自定义调度器以决定如何调度 autorun 函数的重新运行
        */
        when(() => this.myNum2 > 10, () => console.log("myNum2 > 10"));
    }
    @observable observableMap1 = new Map();
    @observable myNum2 = 0;
    addNum1 = action(() => this.myNum1.set(this.myNum1.get() + 1));
    addNum1_1 = async() => {  // runInAction 在async中使用
        runInAction(() => this.myNum1.set(this.myNum1.get() + 1));
    };
    @action addNum2 = () => this.myNum2 ++;
    @action.bound addNum2_1(){  // @action.bound会将方法自动绑定到对象，不能再箭头函数上使用，箭头函数有自己继承来的this，不能重新绑定
        this.myNum2 ++;  // 所以要么用 @action 箭头函数 或者 @action.bound 普通函数
    }
    threshold2 = autorun(() => {
        if (this.myNum2 > 100) action(() => this.myNum2 = 0)();
    });
    @computed get sum(){
        return this.myNum1.get() + this.myNum2;
    }
    /** 异步的问题
     * 如果异步函数标记了@action, 但是异步的回调函数并非是@action的，也就是说@action只对异步函数起作用，而不对其回调负责
     * 造成的结果就是如果你想在回调里面更新observable会报错. 所以这时候runInAction就是最好的选择
     */
    @action
    myFetchFn = async() => {
        console.log("asynchronous fetch here");
        dummyFetch().then(res => {
            runInAction(() => this.myNum2 ++);  // 如果没有runInAction, 那么回调是不算action的，不能更新observable的值会报错
        });
        // 或者
        // const promise = await dummyFetch();
        // runInAction(() => this.myNum2 ++);
    };
    /** 针对上边出现的回调无法获得action标记的问题，
     * mobx推出了内置的flow来解决问题，通过生成器function*来代替async, 通过yield来代替await, 效果与async/await一样，只是回调会被标记为action
     */
    myFetchFn1 = flow(function*(){  // 用生成器function*来代替async
        const promise = yield dummyFetch();
        this.myNum2 ++;
    });
    render() {
        return (<div>
            <p style={{textAlign: "center"}}><b><i>MobX Display</i></b></p>
            <div>
                <span>myNum1: {this.myNum1.get()}, myNum2: {this.myNum2}</span>
            </div>
            <div>
                <Link to="/"><button styleName="bootstrap.btn bootstrap.btn-primary">to /</button></Link>
            </div>
        </div>);
    }
}