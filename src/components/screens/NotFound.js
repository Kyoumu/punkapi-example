import React, { Component } from 'react';
import Footer from './../Footer';

export default class NotFound extends Component {
    render() {
        return <div className="component-wrapper">
            <div className="page-wrapper">
                <div className="col-sm-8 col-sm-push-2">
                    <div className="alert alert_danger alert_center">Страница не найдена.</div>
                </div>
            </div>
            <Footer/>
        </div>;
    }
}