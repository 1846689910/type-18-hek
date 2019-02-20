import React from "react";
import PropTypes from "prop-types";

export const TopComp = props => (<div>
    <h6>ContextShow.js</h6>
    <MidComp myMessage={props.myMessage} />
</div>);
TopComp.propTypes = {
    myMessage: PropTypes.string
};

export const MidComp = props => <BottomComp myMessage={props.myMessage} />;
MidComp.propTypes = {
    myMessage: PropTypes.string
};

export const BottomComp = props => <span>myMessage is {props.myMessage}</span>;
BottomComp.propTypes = {
    myMessage: PropTypes.string
};

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
MidComp1.propTypes = {
    children: PropTypes.object
};
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
export const BottomComp2 = props => <MCConsumer>{context => console.log(context)}</MCConsumer>;
