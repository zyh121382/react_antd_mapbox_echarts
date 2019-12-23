import React, { Component } from 'react';
// eslint-disable-next-line
import { Row, Col, Button, PageHeader, Descriptions } from 'antd';
import echarts from 'echarts';
import 'echarts-gl'; 
import mapboxgl from 'mapbox-gl';

// import { normalize } from 'echarts-gl';
// import $ from  'jquery';

/**
 * @description
 * path.resolve(...pathSegments: string[]): string
 * @param 参数是一串字符串，返回一个绝对路径
 * 比如 path.resolve(`${__dirname}`, '../../assets')
 * __dirname是nodejs下的一个全局变量，可以获得当前文件所在目录的完整目录名
 * 相当于从当前文件的目录 cd ../../assets/，获取这个assets目录的绝对路径
 */
// const dirPath = path.resolve(`${__dirname}`, '../../assets/');

window.mapboxgl = mapboxgl;

class Analysis extends Component{


    componentDidMount(){
        // this.loaddata();
        this.fetchJson("./data/2019_04_02_all_data-json/jsonNameList.json")
        this.showmapbox();
        // this.showlinebar();
        // this.showjamlevel();
    };

    fetchJson = (jsonNameFilePath = "./data/testdir/jsonName.json") => {

        this.jsonNameFilePath = jsonNameFilePath
        this.datalist = require('../data/jsonNameList.json').namelist;
        // var dataJson
        // fetch 只能获取 public下的文件
        // this.jsonFilePath = jsonNameFilePath
        // fetch(jsonNameFilePath)
        // .then(res => res.json())
        // .then(json => {
        //     this.datalist = json.namelist
        // });    
    };

    // 加载数据，并展示
    loaddata = (jsonPath = "./data/test.json") => {
        // 读取本地的json，需要将json文件放到与index.html同级目录

        // jsonPath = "./data/test.json";

        var normalize = function(data,original_min,original_max,target_min,target_max){
                // 数值归一化到[a,b]区间
                // （1）首先找到原本样本数据X的最小值Min及最大值Max
                // （2）计算系数：k=（b-a)/(Max-Min)
                // （3）得到归一化到[a,b]区间的数据：Y=a+k(X-Min) 或者 Y=b+k(X-Max)
                var k = (target_max-target_min)/(original_max-original_min)
                data = target_min + k*(data-original_min)
                return data
        };

        fetch(jsonPath)
        .then(res => res.json())
        .then(json => {
            var data = json.data
            for(var i = 0, len = data.length; i < len; i++){
                // data[i][2] *= 5000;
                // 数据归一化
                // data[i][2] = normalize(data[i][2], 1, 9, 1, 500)
                
                // 数据映射 1->1 3->150 7-350 10->500
                // switch(data[i][2]){
                //     case 3:
                //         data[i][2] = 150;
                //         break;
                //     case 7:
                //         data[i][2] = 350;
                //         break;
                //     case 10:
                //         data[i][2] = 500;
                //         break;
                //     default:
                //         break;
                // }
                if(data[i][2]>1){
                    data[i][2] *= 50;
                }
            
            }
            // console.log('load json path:'+jsonPath);
            var datatime = jsonPath.split('/')[jsonPath.split('/').length - 1].split('.')[0]
            // console.log('load json data time:'+datatime);
            // this.showmapbox(data,datatime);

            this.myChartGl.setOption({
                title: { 
                    subtext: datatime, //"2019-12-13 14:00", //主标题的副标题文本内容，如果需要副标题就配置这一项
                },
                series: [{
                    type: 'bar3D',
                    coordinateSystem: 'mapbox3D',
                    shading: 'color',
                    bevelSize: 0.3, //柱子倒角
                    // bevelSmoothness: 2, //柱子倒角的光滑/圆润度，数值越大越光滑/圆润。
                    barSize: 0.1,
                    data: data,
                    // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                    silent: true,
                }]

            });
        })
    };

    // 数据轮播
    data_change = (lunbo_flag, time_space = 1000, jsonNameFilePath = this.jsonNameFilePath, data = this.datalist) => {
        // lunbo_flag 轮播启停标志 1代表运行 -1代表停止 
        // time_space 轮播时间间隔
        // jsonNameFilePath 轮播数据的jsonlist文件路径
        // data 要轮播的数据
        // data_index 轮播的数据索引
        if(lunbo_flag === -1){
            console.log("lunbo stop")
            clearInterval(this.settimer)
        }
        else{
            console.log("lunbo start")
            this.settimer = setInterval(() => {
                if(this.lunbo_i<data.length){
                    var jsonPath = jsonNameFilePath.split('jsonName')[0]+data[this.lunbo_i]
                    this.loaddata(jsonPath)
                    console.log(jsonPath)
                    this.lunbo_i += 1 
                }
                else{
                    this.lunbo_i = 0
                }
            }, time_space);
        };
    };

    // 加载大量数据 进行数据轮播展示
    load_multi_data = () => {
        // 根据文件路径读取文件，返回一个文件列表
        // var dirPath = jsonNameFilePath
        // this.jsonNameFilePath = "./data/2019_04_02_all_data-json/jsonNameList.json"
        // this.data = require('../data/jsonNameList.json').namelist;
        // console.log(this.jsonNameFilePath)
        if(this.lunbo !== true){
            this.lunbo = true
            if(!this.lunbo_i)
                this.lunbo_i = 0
            this.data_change(1, 300)
        }
        else{
            this.lunbo = false
            this.data_change(-1, 300)
        }
    };

    showmapbox = (data=[],datatime="") => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaHVzdDEyIiwiYSI6ImNrM3BpbDhsYTAzbDgzY3J2OXBzdXFuNDMifQ.bDD9-o_SB4fR0UXzYLy9gg';
        
        this.myChartGl = echarts.init(document.getElementById('mapbox_echartgl'));

        // 模拟数据
        var data0 = [
            {name:"beijing",value:[116.368608,39.901744,100]},
            {name:"beijing1",value:[116.378608,39.901744,200]},
            {name:"beijing2",value:[116.388608,39.901744,400]},
            ]
        var data1 = [
            [116.339626,39.984877,6000],
            [116.467312,39.957147,2000],
            [116.312587,40.059276,8000],
            [116.342587,40.059276,8000],
            ]
        
        this.myChartGl.setOption({
            title: { 
                text: '交通三维柱状图',
                padding:20,//各个方向的内边距，默认是5，可以自行设置
                subtext: datatime, //"2019-12-13 14:00", //主标题的副标题文本内容，如果需要副标题就配置这一项
                subtextStyle:{//副标题内容的样式
					color:'black',//绿色
					fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
					fontWeight:"bold",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
					fontFamily:"san-serif",//主题文字字体，默认微软雅黑
					fontSize:16//主题文字字体大小，默认为12px
				},
            },
            visualMap: {
                // type: 'continuous', //连续型
                type: 'piecewise', //分段型
                categories: ['拥堵', '缓行', '通畅'],

                // visualMap-continuous组件配置
                show: true, //是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在。
                calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
                realtime: true, //拖拽时，是否实时更新。
                hoverLink:true,
                left:20,
                bottom:40,


                dimension: 2, //指定用数据的『哪个维度』，映射到视觉元素上,默认取 data 中最后一个维度。
                
                // inRange: {
                //     // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                //     // color:['#abd9e9','green','orign','#d7191c'],
                //     // color:['#64e291','#e6e56c','#eb7070','#d7191c'],
                //     // color:['#eb7070','#d7191c'],
                //     symbolSize: [10,10],
                // },
                // outOfRange: {
                //     colorAlpha: 0
                // },
                // color: ['red','#eac736','#2c7873'],
                color: ['red','#eac736','green'],
                pieces: [
                    // {min: 400, label: '拥堵', color: 'red'}, // 不指定 max，表示 max 为无限大（Infinity）。
                    // {min: 200, max: 400, label: '缓行', color: '#ff7315'},
                    // {min: 1, max: 200, label: '通畅', color: 'green'},
                    // {min: 100, max: 200},
                    // {min: 100, max: 350, label: '0 到 1000（自定义label）'}, 
                    {value: 150, label: '通畅', color: 'green'}, // 表示value等于150的情况。
                    {value: 350, label: '缓行', color: '#ff7315'},
                    {value: 500, label: '拥堵', color: 'red'},
                ],
                min: 100,
                max: 500,
            },
            mapbox3D: {
                // Mapbox 地图中心经纬度,经纬度用数组表示
                // center: [116.368608,39.901744],
                center: [116.388608,39.881744],
                // Mapbox 地图的缩放等级
                zoom: 11,
                // Mapbox 地图样式
                style: 'mapbox://styles/mapbox/light-v8',
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
                // light: {
                //     main: {
                //         intensity: 2,
                //         shadow: true,
                //         shadowQuality: 'high'
                //     },
                //     ambient: {
                //         intensity: 0.
                //     },
                //     ambientCubemap: {
                //         texture: 'asset/canyon.hdr',
                //         exposure: 2,
                //         diffuseIntensity: 0.5
                //     }
                // },
            },

            series: [{
                type: 'bar3D',
                coordinateSystem: 'mapbox3D',
                shading: 'color',
                bevelSize: 0.3, //柱子倒角
                // bevelSmoothness: 2, //柱子倒角的光滑/圆润度，数值越大越光滑/圆润。
                minHeight: 1,
                maxHeight: 500,
                barSize: 0.1,
                data: data,
                // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                silent: true,
                // label: {show:true},
                animationEasingUpdate: 200,
            }]
        });
        // 获取mapbox对象
        var mapbox = this.myChartGl.getModel().getComponent('mapbox3D').getMapbox();

        this.nav = new mapboxgl.NavigationControl({
            showZoom: true,
            showCompass: true,
            visualizePitch: true,
        });

        this.FullscreenControl = new mapboxgl.FullscreenControl({
            // container: document.querySelector('mapbox_echartgl')
        });
        mapbox.addControl(this.nav, 'top-right');
        mapbox.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        // mapbox.on('zoom',function(){ 
        //     this.lunbo = false;
        //     this.data_change(-1,300);
        // });
    };
    showlinebar = (data) => {

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
            // height:150,
            // grid:{
            //     top:50,
            // },
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
                    type: 'slider',
                    height: 20,
                    // top:220,
                    start: 0,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '70%',
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

    showjamlevel = (data) => {
        var myChart = echarts.init(document.getElementById('full_analysis'));
        var option = {
            title: {
                text: '中关村东路拥堵指数',
                left:'center', //标题居中
                padding:20,//各个方向的内边距，默认是5，可以自行设置
                // margin:0,0,20,0,
            },
            // tooltip : {
            //     formatter: "{a} <br/>{b} : {c}%"
            // },
            grid:{
                bottom:'10'
            },
            series: [
                {
                    name: '拥堵指数',
                    type: 'gauge',
                    radius: 100, //仪表盘半径
                    // 去掉多余的分段
                    splitNumber: 1,
                    axisLine: { //仪表盘轴线相关配置
                        show: true,
                        lineStyle: {
                            width: 5
                        }
                    },
                    axisLabel:{ //刻度标签。
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        length:5,
                    },
                    axisTick: { //刻度样式
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
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <PageHeader
                            ghost={false}
                            onBack={() => window.history.back()}
                            title="分析页"
                            subTitle="交通数据分析"
                            extra={[
                                <Button key="1" type="primary" onClick={() => {
                                    this.loaddata("./data/2019-04-02_09-00.json")
                                }}>测试数据</Button>,
                                <Button key="2" type="primary" onClick={() => {
                                    this.load_multi_data()
                                }}>数据轮播</Button>,
                                <Button key="3" 
                                    onClick={() => {
                                        clearInterval(this.settimer); 
                                        this.lunbo = -1; 
                                        this.lunbo_i = 0
                                        this.myChartGl.clear(); 
                                        this.showmapbox();    
                                    }
                                    }>地图重置
                                </Button>,
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div id="mapbox_echartgl" style={{minWidth: 400, minHeight: 600}}></div>
                    </Col>
                </Row>
                {/* <Row gutter={[16, 16]}>
                    <Col span={12}><div id="point_analysis" style={{Width: 200, height: 250}}></div></Col>
                    <Col span={12}><div id="full_analysis" style={{Width: 200, minHeight: 300}}></div></Col>
                </Row> */}
            </div>
        );
    };
};

export default Analysis;