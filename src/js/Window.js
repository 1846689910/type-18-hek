/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import {tileToBBox} from "global-mercator";
import {ActionWatcher} from "./utils";
import $ from "jquery";
import M from "./Messenger";
export class Window extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showHeader: false,
            onInput: false,
            content: ""
        };
        this.inputWatcher = new ActionWatcher(e => this.setState({
            content: "",
            onInput: true
        }), eTarget => this.setState({
            content: eTarget.value,
            onInput: false
        }), 500);
    }
    componentDidMount(){
        const [minLng, minLat, maxLng, maxLat] = tileToBBox([6963, 5003, 13]);
        console.log([minLng, minLat, maxLng, maxLat]);
        console.log(M.Map.prop1);
    }
    clickHandler = () => {
        this.setState({
            showHeader: ! this.state.showHeader
        });
    };
    fn = async() => {
        const result = await new Promise(resolve => {
            setTimeout(() => resolve("hello world"), 2000);
        });
        return `${result}, I am good`;
    };
    render(){
        this.fn().then(res => console.log(res));
        return (
            <div ref={r => this.div = r}>
                <h1 style={{display: this.state.showHeader ? "block" : "none"}}>Hello</h1>
                <button onClick={this.clickHandler}>toggle header</button>
                <button className="fa fa-mail-forward" aria-hidden="true"/>
                <div className="div1">
                    <input type="text" onChange={this.inputWatcher.watch}/>
                    {
                        this.state.onInput ? <span style={{color: "red"}}>inputting ...</span> : ""
                    }
                    <div>content: <i>{this.state.content}</i></div>
                </div>
            </div>
        );
    }
}