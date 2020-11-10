import React from 'react'

require('./TopBox.css')

class TopBox extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    // liClick(e, index) {
    //     console.log(e, index)
    // }
    render() {
        let TopMsg = this.props.TopMsg;
        let lis = [];
        TopMsg.forEach((msg, index) => {
            lis.push(<li className={this.props.index == index ? 'active TBULi': 'TBULi'} key={index} onClick={this.props.change.bind(msg, index)}>{msg}</li>)
        })
        return (
            <div className="TopBox">
                <ul className="TopBoxUl">
                    {lis}
                </ul>
            </div>
        )
    }
}

export default TopBox;