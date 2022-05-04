import React, { useState } from 'react'
import { SiteHeadTitle } from '../../app/core/Layout/SiteHeadTitle'
import { Card, Typography, Button, Row, Col, Modal, Form, Input, Tooltip } from 'antd';
import PolutionForm from './PolutionForm';



function AddReportMain () {


  const { Title } = Typography;
  const { Meta } = Card;

  const [genForm, openGenForm] = useState(false);
  const [pumpForm, openPumpForm] = useState(false);
  const [fireForm, openFireForm] = useState(false);
  const [wasteForm, openWasteForm] = useState(false);

  

  return (
    <>
      <SiteHeadTitle title={'Monitor Reports'} />
      <div style={{ paddingTop: "2vw", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <Title style={{ fontSize: 'max(4vw,35px)' }}>Choose your Report.</Title>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", alignContent: "center", justifyContent: "center", paddingRight: "6vw", paddingLeft: "6vw" }}>
        <Row>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <span onClick={() => openGenForm(true)}>
              <Card
                hoverable={true}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta
                  style={{maxWidth: "10vw"}}
                  title="Powerhouse Monitoring"
                />
              </Card>
            </span>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>

            <span onClick={() => openPumpForm(true)}>
              <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Pumproom, Pumpstation & STP"
                />
              </Card>
            </span>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <span onClick={() => openFireForm(true)}>
              <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Fire Protection Monitoring"
                />
              </Card>
            </span>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <span onClick={() => openWasteForm(true)}>
              <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Polution Control Monitoring"
                />
              </Card>
            </span>
          </Col>
        </Row>
      </div>
      <PolutionForm wasteForm={wasteForm} openWasteForm={openWasteForm} />
    </>
  )
}

export default AddReportMain;