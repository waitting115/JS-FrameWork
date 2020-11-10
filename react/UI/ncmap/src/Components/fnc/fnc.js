import React, {useEffect} from 'react';
import Echarts from 'echarts';

export default function Fnc () {
    let myChart = null;

    function handleFnc () {
        myChart = Echarts.init(document.getElementById('fnc'));

        const option = {
            backgroundColor: '#2c343c',
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: 'rgb(183,185,14)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);
    }

    useEffect(() => {
        handleFnc();
        return () => {
            myChart && myChart.dispose();
        };
    }, []);

    return (
        <div id="fnc" style={{width: '50vh', height: '50vh'}}></div>
    )
}