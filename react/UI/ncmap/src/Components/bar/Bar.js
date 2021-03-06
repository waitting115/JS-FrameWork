import React,{useEffect, useRef} from 'react';
import echarts from 'echarts';

export default function Bar () {
    const chartRef = useRef();
    let  chartInstance = null;

    const chartMsg = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    function renderEchart() {
        const renderedInstance = echarts.getInstanceByDom(chartRef.current);
        if(renderedInstance) {
            chartInstance = renderedInstance;
        } else {
            chartInstance = echarts.init(chartRef.current);
        }
        chartInstance.setOption(chartMsg);
    }

    useEffect(() => {
        renderEchart()
    }, [])

    useEffect(() => {
        return () => {
            chartInstance && chartInstance.dispose()
        }
    }, [])

    return (
        <div id='z' ref={chartRef} style={{width:'50vh',height:'50vh'}}></div>
    )
}