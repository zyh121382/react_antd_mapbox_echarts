import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-gl';
import mapboxgl from 'mapbox-gl';
import $ from  'jquery';
// import '../lib/bmap.min'
// require('../lib/bmap/bmap');


window.mapboxgl = mapboxgl;

class FunctionTest extends Component{
    componentDidMount(){
        
        this.showEchartTest();  
        this.showEchartGlTest();
        this.showBmap();   
        this.showmapbox(); 
    }

    showEchartTest = () =>{
        // Echarts功能测试
        // 初始化
        var myChart = echarts.init(document.getElementById('echartTest'));
        // 绘制图表
        var option = {
            title: { text: 'EChart折线图' },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        myChart.setOption(option);

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    };

    showEchartGlTest = () =>{
        var myChart = echarts.init(document.getElementById('echartGlTest'));
        var option = {
            // 需要注意的是我们不能跟 grid 一样省略 grid3D
            grid3D: {},
            // 默认情况下, x, y, z 分别是从 0 到 1 的数值轴
            xAxis3D: {},
            yAxis3D: {},
            zAxis3D: {}
        }
        myChart.setOption(option);

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    };

    showBmap = () => {

        var BMap = window.BMap //取出在index.html中保存到window中的BMap对象

        // 百度地图API测试
        var map = new BMap.Map('bmapTest');
        map.centerAndZoom(new BMap.Point(120.305456, 31.570037), 12);
        map.enableScrollWheelZoom(true);


        // 基于百度地图API和Echarts的热力图heatmap
        
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

        // var bmapEchart = echarts.init(document.getElementById("bmapTest"));

        // 指定图表的配置项和数据	
        var option = {
            animation: true,
            bmap: {
                // 北京 116.404,39.915
                center: [116.404, 39.915],
                // 滚轮缩放和拖动
                zoom: 12,
                roam: true,
                mapStyle: {
                    // styleJson: stylejson
                }

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
                coordinateSystem: 'bmap',
                // 要加载的数据points
                data: points,
                pointSize: 5,
                blurSize: 6,
                
                animation: true,
            }],
  
        }

        // bmapEchart.setOption(option);

        // window.addEventListener("resize",function(){
        //     bmapEchart.resize();
        // });
    };

    showmapbox = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaHVzdDEyIiwiYSI6ImNrM3BpbDhsYTAzbDgzY3J2OXBzdXFuNDMifQ.bDD9-o_SB4fR0UXzYLy9gg';

        var myChart = echarts.init(document.getElementById('bar3d'));
        // 模拟数据
        var data0 = [
            {name:"beijing",value:[116.368608,39.901744,100]},
            {name:"beijing1",value:[116.378608,39.901744,200]},
            {name:"beijing2",value:[116.388608,39.901744,400]},
            ]
        var data1 = [
            {name:"beijing",value:[116.339626,39.984877,6000]},
            {name:"beijing1",value:[116.467312,39.957147,2000]},
            {name:"beijing2",value:[116.312587,40.059276,8000]},
            ]
        
        myChart.setOption({
            visualMap: {
                show: false,
                calculable: true,
                realtime: false,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                    // symbolSize: [1000,10000],
                },
                outOfRange: {
                    colorAlpha: 0
                },
                // min: 1000,
                max: 10000,
            },
            mapbox3D: {
                // Mapbox 地图中心经纬度,经纬度用数组表示
                center: [116.368608,39.901744],
                // Mapbox 地图的缩放等级
                zoom: 10,
                // Mapbox 地图样式
                style: 'mapbox://styles/mapbox/streets-v8',
                // 视角俯视的倾斜角度,默认为0，也就是正对着地图。最大60。
                pitch: 50,
                // Mapbox 地图的旋转角度
                bearing: -10,
                
                // 后处理特效的相关配置，后处理特效可以为画面添加高光，景深，环境光遮蔽（SSAO），调色等效果。可以让整个画面更富有质感。
                postEffect: {
                            enable: true,
                            screenSpaceAmbientOcclusion: {
                                enable: true,
                                radius: 1
                            }
                        },
                // 光照相关的设置
                light: {
                    main: {
                        intensity: 2,
                        shadow: true,
                        shadowQuality: 'high'
                    },
                    ambient: {
                        intensity: 0.
                    },
                    ambientCubemap: {
                        texture: 'asset/canyon.hdr',
                        exposure: 2,
                        diffuseIntensity: 0.5
                    }
                },
            },

            series: [{
                type: 'bar3D',
                coordinateSystem: 'mapbox3D',
                shading: 'lambert',
                minHeight: 1000,
                maxHeight: 10000,
                barSize: 0.3,
                data: data1,
                // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                silent: true,
                // label: {show:true},
                animationEasingUpdate: 200,
            }]
        });
        /*js实现sleep功能 单位：毫秒*/
        var sleep = function(numberMillis) {
            var now = new Date();
            var exitTime = now.getTime() + numberMillis;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime)
                    return;
            }
        };

        // var loadDataLoop
        var dataFlagTime = 0
        var dataChangeWithTime = function () {
            console.log(dataFlagTime);
            if (dataFlagTime === 0) {
                myChart.setOption({
                    series: [{
                        data:data1
                    }]
                });
                dataFlagTime = 1;
            }
            else{
                myChart.setOption({
                    series: [{
                        data:data0
                    }]
                });
                dataFlagTime = 0;
            }
            var loadDataLoop = setTimeout("dataChangeWithTime()", 1000);
        };
        // dataChangeWithTime();
        // 获取mapbox对象
        var mapbox = myChart.getModel().getComponent('mapbox3D').getMapbox();
        mapbox.addControl(new mapboxgl.NavigationControl(), 'top-left');

        // window.addEventListener("resize",function(){
        //     myChart.resize();
        // });

        

    };

    render(){
        return (
            <div>
                <div>this is a test page</div>
                <div id="echartTest" style={{minWidth: 600, minHeight: 500}}></div>
                <div id="echartGlTest" style={{minWidth: 600, minHeight: 500}}></div>
                <div id="bmapTest" style={{minWidth: 600, minHeight: 500}}></div>
                <div id="bar3d" style={{minWidth: 600, minHeight: 500}}></div>
            </div>

        );
    };
}

export default FunctionTest;
