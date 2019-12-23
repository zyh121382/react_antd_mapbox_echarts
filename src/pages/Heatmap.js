import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-gl'; 
import mapboxgl from 'mapbox-gl';

import 'echartslayer';
import EchartsLayer from 'echartslayer';
// eslint-disable-next-line
import { Row, Col, Button, PageHeader, Descriptions } from 'antd';
// import $ from  'jquery';
// require('../lib/EchartsLayer');



window.mapboxgl = mapboxgl;

class Heatmap extends Component{
    componentDidMount(){
        
        this.showEchartHeatMap(); 
        this.showBmap(); 
    }

    showEchartHeatMap = () =>{
        mapboxgl.accessToken = 'pk.eyJ1IjoiaHVzdDEyIiwiYSI6ImNrM3BpbDhsYTAzbDgzY3J2OXBzdXFuNDMifQ.bDD9-o_SB4fR0UXzYLy9gg';
        // Echarts功能测试
        // 初始化
        
        var map = new mapboxgl.Map({
            container: 'echartHeatMap',
            // Mapbox 地图中心经纬度,经纬度用数组表示
            // center: [116.368608,39.901744],
            center: [116.398608,39.901744],
            // Mapbox 地图的缩放等级
            zoom: 10,
            // Mapbox 地图样式
            style: 'mapbox://styles/mapbox/light-v8',
            // 视角俯视的倾斜角度,默认为0，也就是正对着地图。最大60。
            pitch: 0,
            // Mapbox 地图的旋转角度
            bearing: 0,
        });
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // 模拟数据
        var points = [
            [116.4226486, 40.0028658, 1],
            [116.4226486, 40.002423400000005, 1],
            [116.4226486, 40.001981, 1],
            [116.4232234, 39.9829578, 1],
            [116.4232234, 39.982515400000004, 1],
            [116.2444606, 39.959953000000006, 1],
            [116.3852866, 39.959953000000006, 1],
            [116.2450354, 39.9595106, 1],
            [116.3852866, 39.9595106, 1],
            [116.2456102, 39.959068200000004, 1],
            [116.3852866, 39.959068200000004, 1],
            [116.3852866, 39.9586258, 1],
            [116.55255340000001, 39.948008200000004, 1],
            [116.5531282, 39.948008200000004, 1],
            [116.553703, 39.948008200000004, 1],
            [116.4341446, 39.940045000000005, 1],
            [116.5399078, 39.923233800000006, 1],
            [116.2387126, 39.895805, 1],
            [116.2157206, 39.811749000000006, 1],
            [116.2157206, 39.8113066, 1],
            [116.2157206, 39.810864200000005, 1],
            [116.2162954, 39.809537000000006, 1]
        ];

        // 绘制图表
        var option = {
            animation: true,
            GLMap: {
                roam: true
            },
            // 视觉映射组件 滑动条的那个东西 
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                color: ['blue', 'blue', 'green', 'yellow', 'red'],
                // color: ["#ffffff", "#4FD17D", "#FFD145", "#E80C0C", "#B50000"],
                // color: ["#a3a3ff","#18ffdf","#47ff00","#ffdc00","#ff2000"],
                // color: ["#a3a3ff","#4FD17D", "#FFD145", "#ffdc00","#ff2000"],
                opacity: 0.6
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'GLMap',
                // 要加载的数据points
                data: points,
                pointSize: 5,
                blurSize: 6,
                animation: true,
            }],
        };

        // var echartslayer = new EchartsLayer(map);
        // echartslayer.chart.setOption(option);

        // window.addEventListener("resize",function(){
        //     myChart.resize();
        // });
    };

    showBmap = () => {

        var BMap = window.BMap //取出在index.html中保存到window中的BMap对象

        // 百度地图API测试
        var map = new BMap.Map('bmapTest');
        map.centerAndZoom(new BMap.Point(120.305456, 31.570037), 12);
        map.enableScrollWheelZoom(true);

    };

    render(){
        return (
            <div>
                <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="监控页"
                        subTitle="交通数据分析图表测试"
                    />
                </div>
                <div id="echartHeatMap" style={{minWidth: 600, minHeight: 500}}></div>
                <div id="bmapTest" style={{minWidth: 600, minHeight: 500}}></div>
            </div>

        );
    };
}

export default Heatmap;
