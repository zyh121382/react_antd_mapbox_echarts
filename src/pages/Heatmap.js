import React, { Component } from 'react';
// eslint-disable-next-line
import { Row, Col, Button, PageHeader, Descriptions } from 'antd';
import echarts from 'echarts';
import 'echarts-gl';
import mapboxgl from 'mapbox-gl';
// import 'echartslayer';



class Heatmap extends Component {
    componentDidMount() {

        this.showEchartHeatMap();
        // this.showBmap(); 
    }

    showEchartHeatMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaHVzdDEyIiwiYSI6ImNrM3BpbDhsYTAzbDgzY3J2OXBzdXFuNDMifQ.bDD9-o_SB4fR0UXzYLy9gg';
        // Echarts功能测试
        // 初始化

        var map = new mapboxgl.Map({
            container: 'echartHeatMap',
            // Mapbox 地图中心经纬度,经纬度用数组表示
            center: [116.368608,39.901744],
            // Mapbox 地图的缩放等级
            zoom: 10,
            // Mapbox 地图样式
            style: 'mapbox://styles/mapbox/outdoors-v11',
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

        map.on('load', function () {
            // Add a geojson point source.
            // Heatmap layers also work with a vector tile source.
            
            map.addSource('earthquakes', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
                // 'data': '../src/data/earthquakes.geojson'
            });

            map.addLayer(
                {
                    'id': 'earthquakes-heat',
                    'type': 'heatmap',
                    'source': 'earthquakes',
                    
                    'maxzoom': 9,
                    'paint': {
                        // Increase the heatmap weight based on frequency and property magnitude
                        'heatmap-weight': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            0,
                            0,
                            6,
                            1
                        ],
                        // Increase the heatmap color weight weight by zoom level
                        // heatmap-intensity is a multiplier on top of heatmap-weight
                        'heatmap-intensity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            1,
                            9,
                            3
                        ],
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(33,102,172,0)',
                            0.2,
                            'rgb(103,169,207)',
                            0.4,
                            'rgb(209,229,240)',
                            0.6,
                            'rgb(253,219,199)',
                            0.8,
                            'rgb(239,138,98)',
                            1,
                            'rgb(178,24,43)'
                        ],
                        // Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            2,
                            9,
                            20
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            1,
                            9,
                            0
                        ]
                    }
                },
                'waterway-label'
            );

            map.addLayer(
                {
                    'id': 'earthquakes-point',
                    'type': 'circle',
                    'source': 'earthquakes',
                    'minzoom': 7,
                    'paint': {
                        // Size circle radius by earthquake magnitude and zoom level
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                            16,
                            ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
                        ],
                        // Color circle by earthquake magnitude
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            1,
                            'rgba(33,102,172,0)',
                            2,
                            'rgb(103,169,207)',
                            3,
                            'rgb(209,229,240)',
                            4,
                            'rgb(253,219,199)',
                            5,
                            'rgb(239,138,98)',
                            6,
                            'rgb(178,24,43)'
                        ],
                        'circle-stroke-color': 'white',
                        'circle-stroke-width': 1,
                        // Transition from heatmap to circle layer by zoom level
                        'circle-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            0,
                            8,
                            1
                        ]
                    }
                },
                'waterway-label'
            );
        });

        map.on('zoomend', function() {
            var zoomeLevel = map.getZoom().toFixed(2)
            console.log("zoom变化结束" + zoomeLevel)
        });
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

    render() {
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
                <div id="echartHeatMap" style={{ minWidth: 500, minHeight: 600 }}></div>
                {/* <div id="bmapTest" style={{minWidth: 600, minHeight: 500}}></div> */}
            </div>

        );
    };
}

export default Heatmap;
