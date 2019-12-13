import React, { Component } from 'react';
import { Row, Col } from 'antd';
import echarts from 'echarts';
import 'echarts-gl';
import mapboxgl from 'mapbox-gl';


window.mapboxgl = mapboxgl;

class Analysis extends Component{
    componentDidMount(){
        this.showmapbox();
        this.showlinebar();
        this.showjamlevel();
    };

    showmapbox = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaHVzdDEyIiwiYSI6ImNrM3BpbDhsYTAzbDgzY3J2OXBzdXFuNDMifQ.bDD9-o_SB4fR0UXzYLy9gg';

        var myChart = echarts.init(document.getElementById('mapbox_echartgl'));
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
            title: { 
                text: '交通三维柱状图',
                padding:20,//各个方向的内边距，默认是5，可以自行设置
                subtext:"2019-12-13 14:00", //主标题的副标题文本内容，如果需要副标题就配置这一项
                subtextStyle:{//副标题内容的样式
					color:'black',//绿色
					fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
					fontWeight:"bold",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
					fontFamily:"san-serif",//主题文字字体，默认微软雅黑
					fontSize:16//主题文字字体大小，默认为12px
				},
            },
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
                silent: false,
                // label: {show:true},
                animationEasingUpdate: 200,
            }]
        });

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

        myChart.setOption({
            series: [{
                data:data0
            }]
        });

        // 获取mapbox对象
        var mapbox = myChart.getModel().getComponent('mapbox3D').getMapbox();
        mapbox.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // window.addEventListener("resize",function(){
        //     myChart.resize();
        // });
    };
    showlinebar = () => {

        // 模拟数据
        var base = +new Date(2019, 4, 2);
        var oneDay = 24 * 3600;
        var date = [];

        var data = [Math.random() * 300];

        for (var i = 1; i < 1440; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }

        // echarts初始化
        var myChart = echarts.init(document.getElementById('point_analysis'));
        var option = {
            title: {
                text: '中关村东路拥堵演变情况',
                left:'center', //标题居中
                padding:20,//各个方向的内边距，默认是5，可以自行设置
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: true
                },
                
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: true
                },
                // data:,
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: true
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 10
                }, 
                {
                    start: 0,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }
            ],
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: true,
                data: data
            }]
        };
        
        myChart.setOption(option);
    };

    showjamlevel = () => {
        var myChart = echarts.init(document.getElementById('full_analysis'));
        var option = {
            title: {
                text: '中关村东路拥堵指数',
                left:'center', //标题居中
                padding:20,//各个方向的内边距，默认是5，可以自行设置
            },
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    // restore: {},
                    // saveAsImage: {}
                }
            },
            series: [
                {
                    name: '拥堵指数',
                    type: 'gauge',
                    // 去掉多余的分段
                    splitNumber: 1,
                    axisLine: {
                        lineStyle: {
                            width: 5
                        }
                    },
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        // 刻度长度与轴线宽度一致，达到分隔的效果
                        length: 5,
                        // 增加刻度密度
                        splitNumber: 10,
                        lineStyle: {
                            // 增加刻度宽度
                            width: 1
                        }
                    },
                    detail: {formatter:'{value}'},
                    data: [{value: 50, name: '拥堵指数'}]
                }
            ]
        };
        
        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart.setOption(option, true);
        },2000);
    };

    render(){
        return(
            <div>
                <Row gutter={[16, 16]}><Col span={24}><div>交通分析</div></Col></Row>
                <Row gutter={[16, 16]}><Col span={24}><div id="mapbox_echartgl" style={{minWidth: 400, minHeight: 400}}></div></Col></Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}><div id="point_analysis" style={{Width: 200, minHeight: 300}}>aaa</div></Col>
                    <Col span={12}><div id="full_analysis" style={{Width: 200, minHeight: 300}}>bbb</div></Col>
                </Row>
            </div>
        );
    };
};

export default Analysis;