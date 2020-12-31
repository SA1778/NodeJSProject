import { svg } from 'd3';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
export default class Navbar extends Component {
    constructor(props){
        super(props);
        
        this.refMenu = React.createRef();
        this.refIcon = React.createRef();
        this.buttonClick = this.buttonClick.bind(this);
    }
    buttonClick(){
        this.refMenu.current.classList.toggle("collapsible");
        
        let x = document.getElementById("menuIcon").getAttribute("aria-expanded");
        x === "true" ? x = "false" : x = "true";
        document.getElementById("menuIcon").setAttribute("aria-expanded", x);
    }
        render() {
        return(
            <div>
                <nav id="largeNav">
                    <NavLink exact to="">
                        <svg viewBox="0 0 16 16" className="bi bi-house-door" fill="white" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"/><path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/></svg>
                    </NavLink>
                    <NavLink to="chart">
                        <svg viewBox="0 0 16 16" className="bi bi-bar-chart-line-fill" fill="white" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/></svg>
                    </NavLink>
                </nav>

                <nav id="smallNav">
                    <svg viewBox="0 0 10 10" width="100" height="100"
                        id="menuIcon"
                        onClick={this.buttonClick}
                        aria-expanded="false"
                    >
                          <path stroke="#000" strokeWidth="1"
                            d="M0,2 10,2 M0,5 10,5 M0,8 10,8"/>
                    </svg>
                </nav>
                <div className="collapsed" ref={this.refMenu}>
                    <NavLink exact to="">Home</NavLink>
                    <NavLink to="chart">Graph</NavLink>
                </div>
            </div>
        );
        }
}