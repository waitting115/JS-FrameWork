import React, {Component} from 'react'

require('./test.css')

class Test extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            timer: null
        }
    }

    componentWillMount() {
        this.openTimer();
    }

    openTimer() {
        this.state.timer = setInterval(() => {
            this.rightClick()
        }, 2000)
    }

    clickPoint(i) {
        this.setState({
            index: i
        })
    }

    leftClick() {
        console.log(this.state.index)
        this.setState({
            index: this.state.index == 0 ? this.props.imgs.length - 1 : this.state.index - 1
        })
    }

    rightClick() {
        this.setState({
            index: this.state.index == this.props.imgs.length - 1 ? 0 : this.state.index + 1
        })
    }

    mouseOver() {
        clearInterval(this.state.timer)
    }

    mouseOut() {
        this.openTimer();
    }

    render() {
        let imgs = this.props.imgs;
        let lis = [];
        let points = []
        imgs.forEach((val, index) => {
            lis.push(<li className='box_ul_li' key={index}>
                <img src={val}></img>
            </li>)
            points.push(<li className={this.state.index == index ? 'point point_active': 'point'} key={index} onClick={this.clickPoint.bind(this, index)}></li>)
        })

        return (
            <div className="content">
                <div className='box' onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
                    <ul className='box_ul' style={{width: 4000 + 'px',left: -800 * this.state.index + 'px'}}>
                        {lis}
                    </ul>
                    <div className="points">
                        <ul className="points_ul">
                            {points}
                        </ul>
                    </div>
                    <div className="l_r">
                        <div className="public_lr left" onClick={this.leftClick.bind(this)}>
                            <span>{'<'}</span>
                        </div>
                        <div className="public_lr right" onClick={this.rightClick.bind(this)}>
                            <span>{'>'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Test;