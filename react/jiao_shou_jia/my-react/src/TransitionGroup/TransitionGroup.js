import React, {Component} from 'react'
import {CSSTransitionGroup, TransitionGroup} from 'react-transition-group'

class TransitionGroupCom extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        console.log(CSSTransitionGroup)
        return (
            <div>
                <p>I am TransitionGroup</p>
            </div>
        )
    }
}

export default TransitionGroupCom;