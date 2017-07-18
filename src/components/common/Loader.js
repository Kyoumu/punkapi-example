import React, { Component } from 'react';

export default class Loader extends Component {
    render() {
        return <div className={'loader' + (this.props.className ? (' ' + this.props.className) : '')}>
            <div className="loader__image"></div>
        </div>;
    }
}