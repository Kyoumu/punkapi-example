import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return <div className="footer">
            <a href="https://github.com/Kyoumu" target="_blank" className="footer__github">
                <div className="footer__github-logo"></div>
                <div className="footer__github-text">GitHub</div>
            </a>
        </div>;
    }
}