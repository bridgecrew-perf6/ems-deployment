import { Button, Form, Row, Col, Input, Card, DatePicker, Table, Spin, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import FireReportForm from './FireReportForm';
import PowerhouseReportForm from './PowerhouseReportForm';
import PumpReportForm from './PumpReportForm';
import WasteReportForm from './WasteReportForm';
import { DAILY_REPORT, INSP_LIST, POLUTION_LIST } from '../../../constants/graphql/add-report/queries';
import { useMutation } from '@apollo/client';
import { DELETE_DAILYMON } from '../../../constants/graphql/add-report/mutations';
import _ from 'lodash';
import moment from 'moment';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import { useAuth } from "../../../util/use-auth";
import { ADD_UPD_DAILYMON } from '../../../constants/graphql/add-report/mutations';


const ReportForm = (props) => {



    const { userDetails } = useAuth();


    const { loading: DailyMonListLoading, data: DailyMonList, refetch } = useQuery(DAILY_REPORT,
        {
            variables: {
                id: parseInt(props.daily_id)
            }
        }
    );

    const [deleteDailyMonitor] = useMutation(DELETE_DAILYMON);

    console.log("Daily Monitor ",DailyMonList);


    const [dateStr, getDateStr] = useState("");
    const [censusCount, getCensusCount] = useState(null);
    const [importantNotes, getImportantNotes] = useState("");


    useEffect(()=>{
        getDateStr(_.get(DailyMonList, "dailyRecord[0].inspection_date"));
        getCensusCount(DailyMonList?.dailyRecord[0].census_count);
        getImportantNotes(DailyMonList?.dailyRecord[0].important_notes);
    },[DailyMonListLoading]);


    const [confirm, confirmed] = useState(false);

    const initialState_Report = {
        inspection_date: "",
        census_count: null,
        important_notes: ""
    }

    const [formAnt] = Form.useForm();
    const [formReport,setFormReport] = useState(initialState_Report);


    const dateToString = (date, dateString) => {
        getDateStr(dateString);
        console.log("event date", dateString);
    }

    const sendDelete = () => {
        console.log("delete clicked.");
        if (window.confirm(`WARNING: Are you sure you want to delete a entire record of ${DailyMonList?.dailyRecord[0].inspection_date}?`) == true) {
            deleteDailyMonitor({
                variables: {
                    id: parseInt(props.daily_id)
                },
            })
                .then(resp => {
                    refetch()
                    window.location.href = '/monitor-reports'
                })
                .catch(error => {
                    console.log("error", error)
                });
        }

    }

    let DailyReportDetails = DailyMonList?.dailyRecord;

    const [upsertDailyMonitor] = useMutation(ADD_UPD_DAILYMON);

    const saveReport = (data) => {

        console.log("Daily Form",data);

        dateToString(data.inspection_date,data.inspection_date);

        const payload = {
            id: parseInt(props.daily_id),
            inspection_date: dateStr,
            census_count: parseInt(censusCount),
            important_notes: importantNotes,
        };

        if (dateStr) {
            try {
                upsertDailyMonitor({
                    variables: payload,
                })
                    .then(resp => {
                        console.log("SUCCESS", resp);
                        window.location.href = '/monitor-reports'
                    })
                    .catch(error => {
                        formAnt.setFieldsValue({
                            inspection_date: moment(_.get(DailyMonList, "dailyRecord[0].inspection_date"),"YYYY-MM-DD")
                        });
                        alert("This date you have been inputted has been existed. The system reset the field as default.");
                        console.log("error", error)
                    });
    
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Please Enter your Date.");
        }
    }

    const resetNotification = () => {
        notification.open({
            message: 'Reset Fields Complete.',
            description: '',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    



    return (
        <>
            <Row>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card title={"Report Form"}>
                        <Form form={formAnt} name="control-hooks" onFinish={saveReport} className="gx-form-row0" >
                            <br />

                            {DailyMonListLoading ? // if this is not loaded

                                <>
                                    <Spin className="gx-loader-container" />
                                </>

                                : // else 


                                <>
                                    <Row>
                                        <Col xl={8} lg={14} md={14} sm={14} xs={14}>
                                            <Form.Item
                                                // validateStatus="error" help="Please select the correct date"     
                                                name="inspection_date"
                                                label="Date Inspected"
                                                                                          
                                                >
                                                <DatePicker placeholder='YYYY-MM-DD' onChange={dateToString} 
                                                value={moment(_.get(DailyMonList, "dailyRecord[0].inspection_date"),"YYYY-MM-DD")} 
                                                initialValue={moment(_.get(DailyMonList, "dailyRecord[0].inspection_date"),"YYYY-MM-DD")} 
                                                defaultValue={moment(_.get(DailyMonList, "dailyRecord[0].inspection_date"),"YYYY-MM-DD")} />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={8} lg={10} md={10} sm={10} xs={10}>
                                            <Form.Item
                                                name="census_count"
                                                label="Census Count">
                                                <Input type='number' onChange={() => getCensusCount(event.target.value)} 
                                                value={_.get(DailyMonList, "dailyRecord[0].census_count")} 
                                                initialValue={_.get(DailyMonList, "dailyRecord[0].census_count")} 
                                                defaultValue={_.get(DailyMonList, "dailyRecord[0].census_count")} />

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                                            <Form.Item
                                                name="important_notes"
                                                label="Important Notes"
                                            >


                                                <TextArea maxLength={200} onChange={() => getImportantNotes(event.target.value)} 
                                                value={_.get(DailyMonList, "dailyRecord[0].important_notes")} 
                                                defaultValue={_.get(DailyMonList, "dailyRecord[0].important_notes")}
                                                initialValue={_.get(DailyMonList, "dailyRecord[0].important_notes")}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <PowerhouseReportForm />
                                    <hr />
                                    <PumpReportForm />
                                    <hr />
                                    <FireReportForm />
                                    <hr />
                                    <WasteReportForm />
                                    <hr />
                                    <Row>
                                        <Col xl={3} lg={6} md={12} sm={12} xs={12}>
                                            <Form.Item>
                                                <Button type='primary' htmlType='submit'>SAVE REPORT</Button>
                                            </Form.Item>
                                        </Col>
                                        <Col xl={5} lg={10} md={12} sm={12} xs={12}>
                                            <Form.Item>
                                                <Button type='primary' onClick={sendDelete}>
                                                    <DeleteOutlined />
                                                </Button>
                                            </Form.Item>
                                            
                                        </Col>
                                        <Col xl={10} lg={10} md={12} sm={12} xs={12}>
                                            <Form.Item>
                                                <Button type='primary' onClick={() => {
                                                    formAnt.setFieldsValue({
                                                        inspection_date: moment(_.get(DailyMonList, "dailyRecord[0].inspection_date"),"YYYY-MM-DD"),
                                                        census_count: _.get(DailyMonList, "dailyRecord[0].census_count"),
                                                        important_notes: _.get(DailyMonList, "dailyRecord[0].important_notes")
                                                    });
                                                    resetNotification();
                                                }}>
                                                    Reset
                                                </Button>
                                            </Form.Item>
                                            
                                        </Col>
                                    </Row>
                                </>
                            }

                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ReportForm;