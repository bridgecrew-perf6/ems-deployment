import React, { useState, useContext } from 'react'
import { Button, Form, Row, Col, Input, Card, DatePicker, Table, Modal, Select, TimePicker } from 'antd';
import PumpCheckList from './PumpCheckList';
import PumpStatusList from './PumpStatusList'
import { useMutation, useQuery } from '@apollo/client';
import { INSP_PUMP, PUMP_LIST } from '../../../constants/graphql/monitor-report-form/queries';
import { DailyReportDetailsContext } from './[id]';
import RemarksPump from './RemarksPump';
import { UPSERT_PUMPCHECK, UPSERT_PUMPREAD } from '../../../constants/graphql/monitor-report-form/mutations';
import { UPSERT_INSPECT } from '../../../constants/graphql/add-report/mutations';

export default function PumpReportForm(props) {

    const [openPumpCheckForm, setPumpCheckForm] = useState(false);
    const [openPumpStatForm, setPumpStatForm] = useState(false);

    const { monitoring_id } = useContext(DailyReportDetailsContext)

    const [refetchChecker,setFetchCheker] = useState(false);
    const [refetchStatus,setFetchStatus] = useState(false);

    const { loading: PumpNamesLoading, data: PumpNames } = useQuery(PUMP_LIST);

    const init_status = {
        id: null,
        pump_room_read: null,
        pump_station_read: null,
        stp_discharge_read: null,
        stp_recycled_read: null,
        main_kwhr_read: null,
        stp_kwhr_read: null,
    }



    // const initialState = { dataPumpStatus: init_status };

    // const [state, setState] = useState(init_status);    


    // const getStatusChildData = (data) => {
    //     console.log("getChildren", data)
    //     setState((a)=>({...a,dataPumpStatus: data}));

    //     console.log("gotChildrenPumpStatus 1", state)
    // }
    // console.log("gotChildrenPumpStatus 2", state)

    const init_check = {
        pump_id: null,
        pump_mode: "",
        pump_pressure: null
    }




    const [formAntStatus] = Form.useForm();
    const [formAntChecker] = Form.useForm();
    const [formStatus, setFormStatus] = useState(init_status);
    const [formChecker, setFormChecker] = useState(init_check);

    const sendEditChecker = (data) => {
        console.log(data);
        formAntChecker.setFieldsValue({
            pump_name: data.pump_id,
            pump_mode: data.pump_mode,
            pump_pressure: data.pump_pressure
        });
        setPumpCheckForm(true);
        setFormChecker((p) => ({ ...p, id: data.id }))
    }

    const sendEditStatus = (data) => {
        console.log(data);
        formAntStatus.setFieldsValue({
            inspection_id: data.inspection_id,
            pump_room_read: data.pump_room_read,
            pump_station_read: data.pump_station_read,
            stp_discharge_read: data.stp_discharge_read,
            stp_recycled_read: data.stp_recycled_read,
            main_kwhr_read: data.main_kwhr_read,
            stp_kwhr_read: data.stp_discharge_read
        });
        setPumpStatForm(true);
        setFormStatus((p) => ({ ...p, id: data.id }))
    }


    const [upsertPumpStatus] = useMutation(UPSERT_PUMPREAD);
    const [upsertPumpCheck] = useMutation(UPSERT_PUMPCHECK);

    const [upsertInspection] = useMutation(UPSERT_INSPECT);

    const {loading: InspPumpLoading,data: InspPump, refetch} = useQuery(INSP_PUMP,{
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    })

    const submitFormChecker = (data) => {

        if (InspPump) {
            try {
                upsertInspection({
                    variables: {
                        timeInspected: "", 
                        remarks: "", 
                        inspectionIncharge: null, 
                        classification: "Pump", 
                        monitoringId: parseInt(monitoring_id)
                    }
                }).then(resp=>{
                    console.log(resp);
                }).catch(error=>{
                    console.log(error);
                });
            } catch(error) {
                console.log();
            }
        }


        refetch();

        try {
            upsertPumpCheck({
                variables: {
                    inspectionId: InspPump?.inspection_pump.id, 
                    upsertPumpCheckId: data.id, 
                    pumpId: data.pump_name, 
                    pumpMode: data.pump_mode, 
                    pumpPressure: data.pump_pressure
                }
            }).then(resp=>{
                console.log(resp);
            }).catch(error=> {
                console.log(error);
            })
        } catch (error) {

        }

        console.log("Form Checker List", data);
        formAntChecker.resetFields();
        setPumpCheckForm(false);
    }

    const submitFormStatus = (data) => {

        try {
            upsertPumpStatus({
                variables: {
                    upsertPumpReadingId: data.id, 
                    inspectionId: InspPump?.inspection_pump.id, 
                    pumpStationRead: data.pump_station_read,
                    pumpRoomRead: data.pump_room_read,
                    stpDischargeRead: data.stp_discharge_read, 
                    stpRecycledRead: data.stp_recycled_read, 
                    mainKwhrRead: data.main_kwhr_read, 
                    stpKwhrRead: data.stp_kwhr_read
                }
            }).then(resp=>{

            }).catch(error=>{

            });
        } catch (error) {
            console.log(error);
        }

        console.log("Form Status List", data);
        formAntStatus.resetFields();
        setPumpStatForm(false);
    }



    return (
        <>
            <br />
            <Row>
                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                    <p>Pumproom, Pumpstation & STP</p>
                </Col>

            </Row>
            {/* <Button type='dashed' onClick={() => setPumpStatForm(true)}>Add Pump Status</Button>
            <br /> */}
            <PumpStatusList forEdit={sendEditStatus} setPumpStatForm={setPumpStatForm} refetch={refetchStatus}/>
            <br /><br /><br />
            <Button type='dashed' onClick={() => setPumpCheckForm(true)}>Add Pump Check</Button>
            <br />
            <PumpCheckList forEdit={sendEditChecker} refetch={refetchChecker}/>
            <br />
            <Modal centered footer={null} visible={openPumpStatForm} onCancel={() => { setPumpStatForm(); formAntStatus.resetFields() }} okType={String} okText={"Add"} width={1000}>
                <br />
                <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Pump Status</h1>
                <br />
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Form form={formAntStatus} name="control-hooks" onFinish={submitFormStatus}  className="gx-form-row0">
                            <Row>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="pump_room_read" label={"Pump Room (Cub.m)"}>
                                        <Input type='number'  />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="pump_station_read" label={"Pump Station (Cub.m)"}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="stp_discharge_read" label={"STP DISCHARGE"}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="stp_recycled_read"  label={"STP RECYCLED"}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="main_kwhr_read" label={"MAIN KWHR"}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="stp_kwhr_read" label={"STP KWHR"}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal>

            <Modal centered footer={null} visible={openPumpCheckForm} onCancel={() => {setPumpCheckForm(); formAntChecker.resetFields()}} okType={String} okText={"Add"} width={700}>
                <br />
                <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Pump Check</h1>
                <br />
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Form form={formAntChecker} name="control-hooks" onFinish={submitFormChecker} className="gx-form-row0">
                            <Row>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="pump_name" label={"Pump"}>
                                        <Select className="gx-mr-3 gx-mb-3" style={{ width: 155 }} rules={[{required: true}]} >
                                            {PumpNames?.pump.map((a) => (
                                                <Select.Option value={a.id}>{a.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="pump_mode" label={"Mode"}>
                                        <Select className="gx-mr-3 gx-mb-3" defaultValue={"Manual"} initialValue={"Manual"} style={{ width: 120 }}>
                                            <Select.Option value="Manual">Manual</Select.Option>
                                            <Select.Option value="Auto">Auto</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <Form.Item name="pump_pressure" label={"PSI"}>
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

            <RemarksPump />
        </>
    )
}
