import React, { useState, useEffect } from 'react'
import ReportList from './ReportList';
import { Card, Input, Form, Button, Select, Col, Row, Modal, notification, DatePicker, AutoComplete } from "antd";
import { ExclamationCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { ADD_UPD_DAILYMON } from '../../constants/graphql/add-report/mutations';
import TextArea from 'antd/lib/input/TextArea';
import { gql, useMutation } from '@apollo/client';
import moment from 'moment';
import { useQuery } from '@apollo/client';

const layout = {
    labelCol: {
        span: 5,
        // span: 8,
    },
    wrapperCol: {
        span: 20,
        // span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const addNotification = () => {
    notification.open({
        message: 'Daily Monitoring Report Added.',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
};

const updateNotification = () => {
    notification.open({
        message: 'Daily Monitoring Report Updated.',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
};

const failedNotification = () => {
    notification.open({
        message: 'Something went wrong. Please Try Again.',
        description: '',
        icon: <ExclamationCircleOutlined style={{ color: '#ff0000' }} />,
    });
};

const existedNotification = () => {
    notification.open({
        message: 'This date has been existed.',
        description: '',
        icon: <ExclamationCircleOutlined style={{ color: '#ff0000' }} />,
    });
};

const Reports = () => {
    const initialState = {
        census_count: null,
        important_notes: "",
        inspection_date: "",
        id: null,
    };


    const [reportList, setReportList] = useState([]);
    const [upsertDailyMonitor] = useMutation(ADD_UPD_DAILYMON);

    const [dateStr, getDateStr] = useState("");

    const handleSubmit = async (data) => {


        // data.inspection_date = moment(data.inspection_date)
        data.census_count = parseInt(data.census_count);


        data.inspection_date = dateStr;
        console.log(data);


        const payload = data;
        var hasID;

        if (form.id) {
            payload.id = form.id
            // updateNotification();
            hasID = 1;
        } else {
            // addNotification();
            hasID = 0;
        }

        try {
            upsertDailyMonitor({
                variables: payload,
            })
                .then(resp => {
                    appearReportForm(false);
                    setForm(initialState)
                    setFetch(!refetch)
                    console.log("resp", resp)
                    if (hasID == 1) {
                        updateNotification();
                    } else {
                        addNotification();
                    }
                })
                .catch(error => {
                    console.log("error", error)
                    existedNotification();
                });

        } catch (error) {
            console.log(error)
        }
    }



    const [formAnt] = Form.useForm();
    const [form, setForm] = useState(initialState);
    const [refetch, setFetch] = useState(false);

    const onFinish = values => {
        console.log("values", values)
    };

    const onReset = () => {
        formAnt.resetFields();
    };

    const { Search } = Input;


    const [reportForm, appearReportForm] = useState(false);

    const getForEdit = (data) => {
        console.log("Data for Edit", data);
        formAnt.setFieldsValue({
            inspection_date: moment(data.inspection_date),
            census_count: data.census_count,
            important_notes: data.important_notes
        });
        appearReportForm(true);
        setForm((p) => ({ ...p, id: data.id }))
    }

    const dateToString = (date, dateString) => {
        console.log(dateString);
        getDateStr(dateString);
    }



    const dateExists = (dateCh) => {
        var i;
        console.log(reportDateStr);
        if (reportDateStrLoad) {
            if (reportDateStr) {
                return true;
            } else {
                return false;
            }
        }
    }

    const dateVal = (rule, value, callback) => {
        // if (dateExists(dateStr)) {
        //     callback('Existed Date.');
        // } else {
        //     callback();
        // }
        const { loading: reportDateStrLoad, data: reportDateStr } = useQuery(
            gql`
            query DailyDateCheck($inspection_date: String) {
                dailyDateCheck(inspection_date: $inspection_date) {
                  id
                }
              }
            `
            ,
            {
                variables: {
                    inspection_date: dateStr
                }
            }
        );

        useEffect(() => {

            console.log(reportDateStr);
            if (reportDateStrLoad) {
                console.log(reportDateStr);
                if (reportDateStr) {
                    callback('Existed Date.');
                } else {
                    callback('');
                }
            }
        }, [reportDateStrLoad]);

    }

    return (
        <>





            <Row>
                <Col xl={4} lg={4} md={8} sm={8} xs={8}>
                    <Button type="primary" onClick={() => {
                        appearReportForm(true)
                        onReset()
                    }}>Add Report</Button>
                </Col>
                {/* <Col xl={18} lg={18} md={12} sm={12} xs={12}>
                   
                   <DatePicker placeholder="Search Date" />

                </Col> */}
            </Row>

            <Modal
                centered
                visible={reportForm}
                onCancel={() => appearReportForm()}
                destroyOnClose={true}
                footer={null}
                width={800}
            >
                <br />
                <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Daily Reporting Form</h1>
                <br />
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form form={formAnt} name="control-hooks" className="gx-form-row0" onFinish={handleSubmit}>

                            <Row>
                                <Col xl={8} lg={8} md={14} sm={14} xs={14}>
                                    <Form.Item
                                        name="inspection_date"
                                        label="Date"
                                        rules={[
                                            {
                                                required: true
                                            },
                                            // {
                                            //     validator: dateVal
                                            // }
                                        ]}


                                    >
                                        {/* <DatePicker placeholder='YYYY-MM-DD' value='text' onChange={inputtingTest}/> */}
                                        <DatePicker placeholder='YYYY-MM-DD' onChange={dateToString} />
                                    </Form.Item>

                                </Col>
                                {/* <Col xl={8} lg={8} md={0} sm={0} xs={0}>
                                    
                                </Col> */}
                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <Form.Item
                                        name="census_count"
                                        label="Census Count"
                                    >
                                        <Input type={"number"} maxLength={4} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="important_notes"
                                        label="Important Notes"
                                    >
                                        <TextArea maxrow={6} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button htmlType="button">
                                            Reset
                                        </Button>
                                    </Form.Item></Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

            </Modal>

            <ReportList refetch={refetch} forEdit={getForEdit} setReportList={setReportList} />
        </>
    );
}

export default Reports;
