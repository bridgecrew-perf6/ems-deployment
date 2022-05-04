import React, { useContext, useState } from 'react'
import { Button, Form, Row, Col, Input, Card, DatePicker, Table, Modal, Select } from 'antd';
import FireProtList from './FireProtList'
import { FLOOR_NAMES, INSP_FIRE } from '../../../constants/graphql/monitor-report-form/queries';
import { useQuery, useMutation } from '@apollo/client';
import { FIRE_PRES_LIST } from '../../../constants/graphql/add-report/queries';
import { DailyReportDetailsContext } from './[id]';
import RemarksFire from './RemarksFire';
import { DELETE_FIRE, UPSERT_FIRE, UPSERT_INSPECT } from '../../../constants/graphql/add-report/mutations';

const FireReportForm = () => {

    const [openFloorCheckForm, setFloorCheckForm] = useState(false);

    const {monitoring_id} = useContext(DailyReportDetailsContext)

    const { loading: FloorNamesLoading, data: FloorNames, refetch: refetch_floor } = useQuery(FLOOR_NAMES);

    const [refetch_fire,setFetch_fire] = useState(false);
    

    const initialState_Fire = {
        floor_name: "",
        pressure: null
    }

    const [formAntFire] = Form.useForm();
    const [formFire,setFormFire] = useState(initialState_Fire);

    const sendEditFire = (data) => {
        console.log(data);
        formAntFire.setFieldsValue({
            id: data.id,
            floor_name: data.floor,
            pressure: data.pressure,
        });
        setFloorCheckForm(true);
        setFormFire((p) => ({ ...p, id: data.id }))
    }

    const {loading: InspFireLoading,data: InspFire, refetch} = useQuery(INSP_FIRE,{
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    }); 

    const [upsertFirePressure] = useMutation(UPSERT_FIRE);

    const [upsertInspection] = useMutation(UPSERT_INSPECT);

    const submitFire = (data) => {
        if (!InspFire) {
            try {
                upsertInspection({
                    variables: {
                        timeInspected: "", 
                        remarks: "", 
                        inspectionIncharge: null, 
                        classification: "Fire", 
                        monitoringId: parseInt(monitoring_id)
                    }
                }).then(resp=>{
                    console.log(resp);
                    refetch();
                }).catch(error=>{
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }

            refetch();
        }

        try {
            upsertFirePressure({
                variables: {
                    upsertFirePressureId: data.id, 
                    pressure: data.pressure, 
                    floorId: data.floor_name, 
                    inspectionId: InspFire?.inspection_fire.id
                }
            }).then(resp=>{
                console.log(resp);
                setFetch_fire(!refetch_fire);
            }).catch(error=>{
                console.log(error);
            })
        } catch(error) {
            console.log(error);
        }
    }

      

    return (
        <>
            <div>
                <Row>
                    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                        <p>Fire Protection Monitoring</p>
                    </Col>

                </Row>
                <br />
                <Button type='dashed' onClick={() => setFloorCheckForm(true)}>Add Floor Check</Button>
                <br />
                <FireProtList refetch={refetch_fire} forEdit={sendEditFire}/>
                <br />
            </div>
            <Modal centered footer={null} visible={openFloorCheckForm} onCancel={() => {setFloorCheckForm(); formAntFire.resetFields();}} okType={String} okText={"Add"} width={500}>
                <br />
                <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Floor Check</h1>
                <br />
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Form form={formAntFire} name="control-hooks" className="gx-form-row0">
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name="floor_name" label={"Floor"}>
                                        <Select className="gx-mr-3 gx-mb-3" defaultValue={""} style={{ width: 120 }}>
                                            {FloorNames?.floor.map((a)=>(
                                                <Select.Option value={a.id}>{a.num}</Select.Option>
                                            ))}
                                            
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name="pressure" label={"Pressure"}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Add Data
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal>

            <RemarksFire />
        </>
    )
}

export default FireReportForm;