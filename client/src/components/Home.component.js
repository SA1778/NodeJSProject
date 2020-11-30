import React, {Component} from 'react';

export default class Home extends Component {
    componentDidMount() {
        document.title = "Website | Main";
    }
    render(){
        return (
                <div id="mainMessage" className="display-1">Welcome</div>
        );
    }
}