import React from 'react'
import {Tabs, Tab} from '@material-ui/core'

export default class extends React.Component{

    state = {
        value: 0
    }

    click(index, value) {
        this.setState({
            value: index
        })
        this.props.getFooterData(value)
    }

    render() {
        return (
            <Tabs
                style={{position: 'fixed', bottom: '0', width: '100%'}}
                value={this.state.value}
                variant='fullWidth'
                aria-label='simple tabs example'
                indicatorColor='primary'
                centered
            >
                <Tab onClick={() => this.click(0, '全部')} key="0" label="全部" />
                {this.props.MainData.map((v,i) => (
                    <Tab onClick={() => this.click(i + 1, v)} key={i + 1} label={v} />
                ))}
            </Tabs>
        )
    }
}
    