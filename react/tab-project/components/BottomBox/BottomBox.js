import React from 'react'

require('./BottomBox.css')

class BottomBox extends React.Component {
    render() {
        let BtmMsg = this.props.BottomMsg;
        // console.log(this.props.index)
        let divs = [];
        BtmMsg.forEach((msg, index) => {
            divs.push(<div style={{display: this.props.index == index ? 'block' : 'none'}} className="BBContent" key={index}>{msg}</div>)
        })
        return (
            <div className='BottomBox'>
                {divs}
            </div>
        )
    }
}

export default BottomBox;