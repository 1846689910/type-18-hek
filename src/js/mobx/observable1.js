import {observable, autorun, action, decorate, computed} from "mobx";
/**
 * observable.object(props, decorators?, options?)
如果把一个普通的 JavaScript 对象传递给 observable 方法，对象的所有属性都将被拷贝至一个克隆对象并将克隆对象转变成可观察的。
 (普通对象是指不是使用构造函数创建出来的对象，而是以 Object 作为其原型，或者根本没有原型。) 
 只有普通的对象可以转变成 observable 。对于非普通对象，构造函数负责初始化 observable 属性。 
 要么使用 @observable 注解，要么使用 extendObservable 函数
 */
/**
 * 注意: observable.object(object) 实际上是 extendObservable({}, object) 的别名
 * 注意: 类似于 extendObservable，decorate 用来为对象引入 observable 属性。不同之处在于 extendObservable 被设计为
 *      直接在目标实例上引入属性，其中 decorate 将它们引入原型; 可以直接将它传递给构造函数 (类)，也可以将其作为其他人的原型。
 * 注意: 不能使用 extendObservable 来为 observable 数组或对象上引入新的属性
 */
export const person = observable({
    name: "John",
    age: 42,
    showAge: false,
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },
    // 动作:
    setAge(age) {
        this.age = age;
    }
}, {
    setAge: action
});
// 对象属性没有暴露 'observe' 方法,
// 但不用担心, 'mobx.autorun' 功能更加强大
autorun(() => console.log(person.labelText));
person.name = "Dave";  // 输出: 'Dave'
person.setAge(21);
// 或者使用decorator来写class Person
class Person {
    name = "John"
    age = 42
    showAge = false

    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    }

    setAge(age) {
        this.age = age;
    }
}
// 使用 decorate 时，所有字段都应该指定 (毕竟，类里的非 observable 字段可能会更多)
decorate(Person, {
    name: observable,
    age: observable,
    showAge: observable,
    labelText: computed,
    setAge: action
})


/** observable.array */
export const todos = observable([
    { title: "Spoil tea", completed: true },
    { title: "Make coffee", completed: false }
]);
autorun(() => console.log("Remaining:", todos
    .filter(todo => !todo.completed)
    .map(todo => todo.title)
    .join(", ")
));
todos[0].completed = false;
todos[2] = { title: 'Take a nap', completed: false };
todos.shift();


/** observable.map
 * observable.map(values?) - 创建一个动态键的 observable 映射。 如果你不但想对一个特定项的更改做出反应，
 * 而且对添加或删除该项也做出反应的话，那么 observable 映射会非常有用。 observable.map(values) 中的 values 可以是对象、 数组或者字符串键的 ES6 map。
通过 ES6 Map 构造函数，你可以使用 
    observable(new Map()) 
    或使用装饰器 @observable map = new Map() 的类属性来初始化 observable 映射
 */
export class ObservableMapShow{
    @observable observableMap1 = new Map();
    observableMap2 = observable(new Map);
}
console.log(new ObservableMapShow());

/** 基本类型使用observable.box()
 * observable.box(value) 接收任何值并把值存储到箱子中。 使用 .get() 可以获取当前值，使用 .set(newValue) 可以更新值。
 * .get() - 返回当前值。
 * .set(value) - 替换当前存储的值并通知所有观察者。
 * intercept(interceptor) - 可以用来在任何变化应用前将其拦截。参见 observe & intercept。
 * .observe(callback: (change) => void, fireImmediately = false): disposerFunction - 注册一个观察者函数，每次存储值被替换时触发。返回一个函数以取消观察者。参见 observe & intercept。change 参数是一个对象，其中包含 observable 的 newValue 和 oldValue 。
 */
const cityName = observable.box("Vienna");
console.log(cityName.get());  // 输出 'Vienna'
cityName.observe(function(change) {
    console.log(change.oldValue, "->", change.newValue);
});
cityName.set("Amsterdam");  // 输出 'Vienna -> Amsterdam'
