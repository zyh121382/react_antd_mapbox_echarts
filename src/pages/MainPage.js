import React, { Component } from 'react';
// eslint-disable-next-line
import { Row, Col, Carousel } from 'antd';


import img1 from'../lib/1.jpg';
import img2 from'../lib/2.jpg';
import img3 from'../lib/3.jpg';

/* For demo */
// .ant-carousel .slick-slide {
//     text-align: center;
//     height: 160px;
//     line-height: 160px;
//     background: #364d79;
//     overflow: hidden;
//   }
  
// .ant-carousel .slick-slide h3 {
//     color: #fff;
//   }

class MainPage extends Component{
    render(){
        return (
            <div style={{minHeight:400}}>
                <Carousel autoplay effect='fade'>
                    <div>
                        <img src={img1} alt='1'></img>
                    </div>
                    <div>
                        <img src={img2} alt='2'></img>
                    </div>
                    <div>
                        <img src={img3} alt='3'></img>
                    </div>
                </Carousel>
            </div>
        );
    };
}

export default MainPage;
