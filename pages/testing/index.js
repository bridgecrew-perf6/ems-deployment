import React from 'react'
import { Button, Carousel } from 'antd';
import { GoldTwoTone } from '@ant-design/icons';
import next from 'next';

export default function TestingPurposes() {

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };


    return (
        <Carousel effect='fade' style={{height:'100'}}>
            <div>
                <h3 style={contentStyle}>
                    <Button >PRESS ME FOR 2</Button>
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    )
}
