import React,{useEffect} from 'react';
import echarts from 'echarts'
import 'echarts/map/js/china';  
// import geoJson from 'echarts/map/json/china.json';
import {options} from "./geo";

export default function ChinaMap  () {
    function initalECharts() {
        // https://echarts.apache.org/zh/api.html#echarts.registerMap
        // echarts.registerMap('zhongguo', geoJson);
        // 1.初始化
        const myChart = echarts.init(document.getElementById('mainMap'));
        //自定义事件
        myChart.on('click', function (params) {
            console.log(params)
        });

        myChart.setOption(options)
    }
    useEffect(() => {
        initalECharts()
    },[])//传递空数组，即可只运行一次，类似于ComponentDidMount()

    return (
        <div id="mainMap" style={{width:'100vh',height:'100vh'}}></div>
    )
}