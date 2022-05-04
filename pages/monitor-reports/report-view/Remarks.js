import React, { useContext, useState } from 'react'
import { Button, Modal, Table, TimePicker, Row, Col, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { useQuery, useMutation } from '@apollo/client';
import { USER_LIST } from '../../../constants/graphql/add-report/queries';
import moment from 'moment';
import { useAuth } from '../../../util/use-auth';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { UPSERT_REMARK } from '../../../constants/graphql/add-report/mutations';
import { DailyReportDetailsContext } from './[id]';

const Remarks = (props) => {

    const {monitoring_id} = useContext(DailyReportDetailsContext);

    const {userDetails} = useAuth();

    const initialState = {
        id: null,
        inspector: "",
        time_inspected: "",
        remarks: ""
    }


    const [remarksForm, openRemarksForm] = useState(false);
    const [formVal, setFormVal] = useState(initialState);

    const { loading: UserListLoading, data: UserList, refetch } = useQuery(USER_LIST);


    var remarksTable = props.RemarksList?.data.map((a) => {
        return {
            id: a.id,
            inspector_id: a.user.id,
            user_name: a.user.username,
            time_inspected: a.time_inspected,
            remarks: a.remarks
        }
    });

    console.log("Remarks Table", remarksTable);


    const [formAnt] = Form.useForm();

    const sendEdit = (data) => {
        console.log("edit Remarks",data)
        formAnt.setFieldsValue({
            inspector: data.inspector_id,
            time_inspected: moment(data.time_inspected,'HH:mm:ss A'),
            remarks: data.remarks,
        });
        openRemarksForm(true);
        setFormVal((a) => ({ ...a, id: a.id }));
    }

    const addRemark = () => {
        formAnt.resetFields();
        openRemarksForm(true);
    }

    const remarksColumns = [
        {
            title: 'Inspector',
            dataIndex: 'user_name',
            key: 'user_name'
        },
        {
            title: 'Time Inspected',
            dataIndex: 'time_inspected',
            key: 'time_inspected'
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks'
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>

                    <div style={{ whiteSpace: "nowrap" }}>
                        <DeleteFilled className="gx-link" onClick={e => sendDelete(record)} />
                        <EditFilled className="gx-link" style={{ paddingLeft: "10px" }} onClick={e => sendEdit(record)} />
                    </div>

                </span>
            ),
        }
    ];


    // const [deleteRemarks] = useMutation();

    // const sendDelete = (data) => {
    //     try {
    //         deleteRemarks({
    //             variables: {
    //                 deletedPumpReadingId: data.id
    //             }
    //         }).then(resp => {
    //             console.log(resp)
    //             refetch();
    //         }).catch(error => {
    //             console.log(error)
    //         });
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     refetch();
    // }


    const [upsertRemark] = useMutation(UPSERT_REMARK);
    

    const submitRemark = (data) => {

        console.log(data)

        try {
            upsertRemark({
                variables: {
                    upsertInspectionId: formVal.id,
                    timeInspected: moment(data.time_inspected,"HH:mm:ss A"),
                    remarks: data.remarks,
                    monitoringId: parseInt(monitoring_id),
                    inspectionIncharge: data.inspector,
                    classification: props.InspComp
                }
            }).then(resp=> {
                console.log(resp);
                openRemarksForm(false);
                refetch();
            }).catch(error=>{
                console.log(error);
            });
        } catch(error) {
            console.log(error)
        }
        
    }




    return (
        <>

            <br />
            {/* <Button onClick={() => openRemarksForm(true)}>Add Remarks</Button> */}
            {/* {Object.keys(remarksTable)?.length == undefined ?
                <>
                    <Button onClick={addRemark}>Add Remark</Button>
                </>
                :
                <>
                    <Button onClick={e => editRemark(remarksTable)}>Edit Remark</Button>
                </>
            } */}
            {props.RemarksLoading ?
                <>
                </>
                :
                Object.keys(remarksTable).length == 0 ?
                    <>
                        <Button onClick={addRemark}>Add Remark</Button>
                    </>
                    :
                    <>
                    </>

            }
            <br />
            <Table columns={remarksColumns} dataSource={remarksTable} scroll={{ x: 400 }} />
            <Modal
                centered
                visible={remarksForm}
                onCancel={() => openRemarksForm()}
                destroyOnClose={true}
                footer={null}
                width={800}
            >
                <br />
                <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Inspection Form</h1>
                <br />
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form form={formAnt} name="control-hooks" className="gx-form-row0" onFinish={submitRemark} >

                            <Row>
                                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="inspector"
                                        label="Inspector"
                                    >
                                        <Select className="gx-mr-3 gx-mb-3" defaultValue={userDetails?.id} style={{ width: 250 }}>
                                            {UserList?.userEnum.map((a) => (
                                                <Select.Option value={a.id}>{a.username}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="time_inspected"
                                        label="Time Inspected"
                                    >
                                        <TimePicker use12Hours={true} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="remarks"
                                        label="Remarks"
                                    >
                                        <TextArea maxrow={6} />
                                    </Form.Item>
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

            

            {/* <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form form={formAnt} name="control-hooks" className="gx-form-row0" onFinish={submitRemark} >

                            <Row>
                                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="inspector"
                                        label="Inspector"
                                    >
                                        <Select className="gx-mr-3 gx-mb-3" defaultValue={userDetails?.id} style={{ width: 250 }}>
                                            {UserList?.userEnum.map((a) => (
                                                <Select.Option value={a.id}>{a.username}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="time_inspected"
                                        label="Time Inspected"
                                    >
                                        <TimePicker use12Hours={true} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="remarks"
                                        label="Remarks"
                                    >
                                        <TextArea maxrow={6} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row> */}

        </>
    )
}

export default Remarks;