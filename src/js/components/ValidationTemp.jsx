import React from "react";
import Big from "big.js";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
const LONG = {
   MIN_VALUE: Big(-2).pow(63),
   MAX_VALUE: Big(2).pow(63).minus(1)
};
const DOUBLE = {
   MIN_VALUE: Big("-1.7976931348623157E308"),
   MAX_VALUE: Big("1.7976931348623157E308")
};
export class ValidationWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataset: [
                {name: "eric", min: 0, max: 100},
                {name: "alex", min: 5, max: 200},
                {name: "hans", min: 1, max: 105}
            ] 
        };
    }
    componentDidUpdate(){
        console.log(this.state.dataset);
    }
    render(){
        return <ValidationTemp srcComp={this}/>
    }
}
export default class ValidationTemp extends React.Component{
    constructor(props){
            super(props);
            const dataset = props.srcComp.state.dataset;
            this.state = {
                dataset,  // 从数据源接收的数据
                valids: this.getValids(dataset),
            };
    }
    getValids = dataset => dataset.map(obj => Object.entries(obj).reduce((prev, [k, v]) => {  // 从dataset延伸出valids数组，结构和dataset相同，但是数值变成了boolean
        switch (k) {
            case "name":
                prev[k] = v.length > 0;
                break;
            case "min":
                prev[k] = ! isNaN(v) && parseFloat(v) < parseFloat(obj.max) && Big(v).gte(DOUBLE.MIN_VALUE) && Big(v).lt(DOUBLE.MAX_VALUE);
                break;
            default:
                prev[k] = ! isNaN(v) && parseFloat(v) > parseFloat(obj.min) && Big(v).gt(DOUBLE.MIN_VALUE) && Big(v).lte(DOUBLE.MAX_VALUE);
        }
        return prev;
    }, {}));
    componentDidMount(){  // 接收数据后，及时渲染input的颜色
        this.validate();
    }
    componentWillReceiveProps(newProps){  // 数据源数据更新时，及时更新数据
        const {dataset} = newProps.srcComp.state;
        const valids = this.getValids(dataset);
        this.setState({dataset, valids});
    }
    setInputStyle = (domInput, isCorrect) => {  // 经典的表单背景框, 过审绿色，未过审红色
        if (typeof domInput === "object" && domInput.style) {
            const color = isCorrect ? "green" : "red";
            domInput.style.border = `1px solid ${color}`;
            domInput.style.boxShadow = `0 0 3px ${color}`;
        }
    };
    fieldChange = (field, target, idx) => {  // 每个input的输入事件
        this.state.dataset[idx][field] = target.value;
        this.setState({
            dataset: this.state.dataset
        }, this.validate);
    };
    validate = () => {  // 验证输入事件
        const valids = this.getValids(this.state.dataset);
        console.log(valids);
        this.setState({valids}, () => {
            this.state.valids.forEach((obj, idx) => Object.entries(obj).forEach(([k, v]) => this.setInputStyle(this[`${k}_${idx}`], v)));
        });
    };
    submit = () => {
        const dataset = this.state.dataset.map(obj => Object.entries(obj).reduce((prev, [k, v]) => {
            prev[k] = isNaN(v) ? v : parseFloat(v);
            return prev;
        }, {}));
        this.props.srcComp.setState({dataset});  // 确认按钮的点击事件，并发送最新的修改过的数据到数据源组件
    }
    render(){
        return (<div>
            {
                this.state.dataset.map((item, idx) => <div key={idx}>
                    <label>name: <input type="text" ref={r => this[`name_${idx}`] = r} value={item.name} onChange={e => this.fieldChange("name", e.target, idx)}/></label>
                    <label>min: <input type="number" ref={r => this[`min_${idx}`] = r} value={item.min} onChange={e => this.fieldChange("min", e.target, idx)}/></label>
                    <label>max: <input type="number" ref={r => this[`max_${idx}`] = r} value={item.max} onChange={e => this.fieldChange("max", e.target, idx)}/></label>
                </div>)
            }
            <div><button styleName="bootstrap.btn bootstrap.btn-success" 
                disabled={! this.state.valids.every(o => Object.values(o).every(bol => bol))} onClick={this.submit}>submit</button></div>
        </div>);
    }
}
