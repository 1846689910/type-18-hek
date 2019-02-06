import React from "react";
export const TopComp = props => {
    return (<div>
        <h6>ContextShow.js</h6>
        <MidComp myMessage={props.myMessage} />
    </div>);
};
export const MidComp = props => {
    return (<div>
        <BottomComp myMessage={props.myMessage} />
    </div>);    
};
export const BottomComp = props => {
    return (<div>
        <span>myMessage is {props.myMessage}</span>
    </div>);        
}

import MessageContext, {Provider as MCProvider, Consumer as MCConsumer} from "./MessageContext";
export class TopComp1 extends React.Component{
    render(){
        return (
            <MCProvider value={{a: 456}}>
                <MidComp1><div>I am MidComp1</div></MidComp1>
            </MCProvider>
        );
    }
}
export class MidComp1 extends React.Component{
    render(){
        console.log(this.props.children);
        return (<div>
            <BottomComp1/>
            <BottomComp2/>
        </div>);        
    }
}
export class BottomComp1 extends React.Component {
    constructor(props){
        super(props);
    }
    static contextType = MessageContext;
    componentDidMount(){
        // console.log(this.context);
    }
    render(){
        // console.log(this.context);
        return (
            <MCConsumer>
                {context => console.log(context)}
            </MCConsumer>
        ); 
    }
}
export const BottomComp2 = (props) => {
    return (<MCConsumer>{context => console.log(context)}</MCConsumer>);
};
