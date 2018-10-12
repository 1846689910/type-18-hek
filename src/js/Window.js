/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
export class Window extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showHeader: false
        };
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
            <div>
                <h1 style={{display: this.state.showHeader ? "block" : "none"}}>Hello</h1>
                <button onClick={this.clickHandler}>toggle header</button>
            </div>
        );
    }
}