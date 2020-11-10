require('./index.css')

import TopBox from './components/TopBox/TopBox'
import BottomBox from './components/BottomBox/BottomBox'

import React from 'react'
import ReactDOM from 'react-dom'

const json = {
    TopMsg: ['liu', 'xiao', 'meng', 'meng'],
    BottomMsg: ['I am liu', 'I am xiao', 'I am meng', 'I am meng2']
}

class Tab extends React.Component {
    constructor() {
        super();
        this.state = {
            index : 0
        }
    }
    change(num) {
        // console.log(num)
        this.setState({
            index : num
        })
    }
    render() {
        return (
            <div className="box">
                <div className="content">
                    <TopBox TopMsg={json.TopMsg} index={this.state.index} change={(v) => this.change(v)}/>
                    <BottomBox BottomMsg={json.BottomMsg} index={this.state.index}/>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <Tab/>,
    document.getElementById('app')
)
