/**
 * Created by Eric on 9/6/2018.
 */
import React from "react";
import {tileToBBox, pointToTileFraction, googleToTile} from "global-mercator";
import {ActionWatcher} from "./utils";
import {TopComp, TopComp1} from "./context/ContextShow";
import {ValidationWrapper} from "./ValidationTemp";
import custom from "../css/main.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import fontawesome from "font-awesome/css/font-awesome.min.css"
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
        }), e => this.setState({
            content: e.target.value,
            onInput: false
        }), 500);
    }
    componentDidMount(){
        // const [minLng, minLat, maxLng, maxLat] = tileToBBox([6963, 5003, 13]);
        // console.log([minLng, minLat, maxLng, maxLat]);
        // console.log(M.Map.prop1);
        // console.log(googleToTile(pointToTileFraction([minLng, maxLat], 13)));
        const lngLatZoom = this.tileXYZ2lngLatZoom([6963, 5003, 13]);
        console.log(lngLatZoom);
        const [lngLat, zoom] = lngLatZoom;
        const XYZ = this.lngLatZoom2TileXYZ(lngLat, zoom);
        console.log(XYZ);
    }
    /**
     * @param lnglat: array[lng, lat]
     * @param zoom: zoom level
     * @returns: array[X, Y, Z] of TMS tile in mercator projection, the precise fractional tile location for a point at a zoom level
     */
    lngLatZoom2TileXYZ = (lnglat, zoom) => googleToTile(pointToTileFraction(lnglat, zoom));
    /**
     * @param XYZ: array[X, Y, Z] of TMS tile in mercator projection
     * @returns: array[array[lng, lat], zoom]
     */
    tileXYZ2lngLatZoom = (XYZ) => {
        const [minLng, minLat, maxLng, maxLat] = tileToBBox(XYZ);
        return [[minLng, maxLat], XYZ[2]];
    };
    /**
     * @param p1: array[X1, Y1]
     * @param p2: array[X2, Y2]
     * @returns: array[a, b, c] => the line equation: ax + by + c = 0
     */
    getLineEquationBy2Points = (p1, p2) => {
        const [x1, y1] = p1, [x2, y2] = p2;
        return [y2 - y1, x1 - x2, y1 * (x2 - x1) - x1 * (y2 - y1)];
    };
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
                <h1 styleName="custom.h1-title" style={{display: this.state.showHeader ? "block" : "none"}}>Hello</h1>
                <button styleName="bootstrap.btn bootstrap.btn-success" onClick={this.clickHandler}>toggle header</button>
                <button styleName="fontawesome.fa fontawesome.fa-mail-forward" aria-hidden="true"/>
                <div className="div1">
                    <input type="text" onChange={this.inputWatcher.watch}/>
                    {
                        this.state.onInput ? <span style={{color: "red"}}>inputting ...</span> : ""
                    }
                    <div>content: <i>{this.state.content}</i></div>
                </div>
                <hr/>
                <ValidationWrapper/>
                <hr/>
                <TopComp myMessage={"hello world"} />
                <TopComp1/>
            </div>
        );
    }
}