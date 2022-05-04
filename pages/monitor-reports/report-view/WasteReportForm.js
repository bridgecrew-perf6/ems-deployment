import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row, Col, Input, Card, DatePicker, Table, Modal, Select } from 'antd';
import PolContList from './PolContList'
import { useMutation, useQuery } from '@apollo/client';
import { WASTE_NAMES, UNIT_NAMES, INSP_WASTE } from '../../../constants/graphql/monitor-report-form/queries';
import { POLUTION_LIST } from '../../../constants/graphql/add-report/queries';
import { parseInt } from 'lodash';
import { DailyReportDetailsContext } from './[id]';
import RemarksWaste from './RemarkWaste';
import { UPSERT_INSPECT, UPSERT_POL } from '../../../constants/graphql/monitor-report-form/mutations';



const WasteReportForm = (props) => {

    const [openWasteCheckForm, setWasteCheckForm] = useState(false);


    const { monitoring_id } = useContext(DailyReportDetailsContext);

    const [inspWaste, getInspWaste] = useState(null);


    const { loading: InspWasteLoading, data: InspWaste, refetch } = useQuery(INSP_WASTE, {
        variables: {

            monitoringId: monitoring_id
        }
    }
    );

    useEffect(() => {
        getInspWaste(InspWaste?.inspection_waste.id);
        console.log(inspWaste);
    }, [InspWasteLoading]);

    const { loading: WasteNamesLoading, data: WasteNames } = useQuery(WASTE_NAMES);

    const { loading: UnitNamesLoading, data: UnitNames } = useQuery(UNIT_NAMES);

    const [refetch_waste,setFetch_waste] = useState(false);





    const [upsertPolution] = useMutation(UPSERT_POL);

    const [upsertInspection] = useMutation(UPSERT_INSPECT);


    const initialState_Polution = {
        waste_name: "",
        unit: "",
        quantity: null
    }

    const [formAntPol] = Form.useForm();
    const [formPol, setFormPol] = useState(initialState_Polution);

    const submitPol = (data) => {
        if (inspWaste) {
            upsertInspection({
                variables: {
                    monitoringId: monitoring_id,
                    timeInspected: "",
                    remarks: "",
                    upsertInspectionId: null,
                    inspectionIncharge: null,
                    classification: "Waste"
                }
            }).then(resp => {
                console.log(resp);
            }).catch(error => {
                console.log(error);
            });
        }


        refetch();

        try {
            upsertPolution({
                variables: {
                    id: data.id,
                    quantity: data.quantity,
                    unit_id: data.unit,
                    inspection_id: InspWaste?.inspection_waste.id,
                    waste_id: data.waste_name
                }
            }).then(resp=> {
                console.log(resp);
                setFetch_waste(!refetch_waste);
            }).catch(error=>{
                console.log(error);                
                setFetch_waste(!refetch_waste);
            });
        } catch(error) {

        }
        
        console.log("Submit Pol List", data);

    }

    const submitWastePol = () => {
        setWasteCheckForm();
        formAntPol.resetFields();
    }

    const sendEditPol = (data) => {
        console.log(data);
        formAntPol.setFieldsValue({
            waste_name: data.waste_id,
            unit: data.unit_id,
            quantity: parseFloat(data.quantity)
        });
        setWasteCheckForm(true);
        setFormPol((p) => ({ ...p, id: data.id }))
    }

    return (
        <>
            <div>
                <Row>
                    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                        <p>Pollution Control Monitoring</p>
                    </Col>
                </Row>
                <br />
                <Button type='dashed' onClick={() => setWasteCheckForm(true)}>Add Waste Check</Button>
                <br />
                <PolContList forEdit={sendEditPol} refetch={refetch_waste} />
                <br />
            </div>
            <Modal centered footer={null} visible={openWasteCheckForm} onCancel={() => { setWasteCheckForm(); formAntPol.resetFields() }} okType={String} okText={"Add"} width={800}>
                <br />
                <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Waste Check</h1>
                <br />
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Form name="control-hooks" form={formAntPol} className="gx-form-row0" onFinish={submitPol}>
                            <Row>
                                <Col lg={10} md={12} sm={12} xs={12}>
                                    <Form.Item name="waste_name" label={"Waste Type"} rules={[{ required: true }]}>
                                        <Select className="gx-mr-3 gx-mb-3" style={{ width: 160 }}>
                                            {WasteNames?.waste.map((a) => (
                                                <Select.Option value={a.id}>{a.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                    <Form.Item name="unit" label={"Unit"} rules={[{ required: true }]}>
                                        <Select className="gx-mr-3 gx-mb-3" style={{ width: 120 }}>
                                            {UnitNames?.unit.map((a) => (
                                                <Select.Option value={a.id}>{a.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                    <Form.Item name="quantity" label={"Quantity"}>
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

            <RemarksWaste />
        </>
    )
}

export default WasteReportForm;