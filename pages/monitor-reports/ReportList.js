import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Card, Modal, Table, Row, Col, Form, Input, DatePicker, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { REPORT_LIST } from '../../constants/graphql/add-report/queries';
import { DELETE_DAILYMON } from '../../constants/graphql/add-report/mutations';
import Link from 'next/link';


const ReportList = (props) => {

    const { loading: ReportListLoading, data: ReportList, refetch } = useQuery(REPORT_LIST);

    useEffect(() => {
        refetch()
    }, [props.refetch])

    const sendForEdit = (data) => {
        console.log("for edit", data)
        props.forEdit(data)
    }

    const [deleteDailyMonitor] = useMutation(DELETE_DAILYMON);

    const sendDelete = (record) => {
        if (confirm(`Are you sure you want to delete a entire record of ${record.inspection_date}?`)) {
            deleteDailyMonitor({
                variables: {
                    id: record.id
                },
            })
                .then(resp => {
                    refetch()
                })
                .catch(error => {
                    console.log("error", error)
                });
        }
    }


    let tempList = ReportList?.dailyMonitoring;

    let list = [];
    if (tempList?.length > 0) {
        list = [...tempList].sort((a, b) => (a.id < b.id) ? 1 : -1);
    }

    console.log("tempList", tempList)

    const columns = [
        {
            title: 'Date',
            dataIndex: 'inspection_date',
            key: 'inspection_date',
            render: (text, record) => <Link href={`./monitor-reports/report-view/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Census Count',
            dataIndex: 'census_count',
            key: 'census_count',
        },
        {
            title: 'Important Notes',
            dataIndex: 'important_notes',
            key: 'important_notes',
        }
        // ,{
        //     title: '',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>

        //             <div style={{ whiteSpace: "nowrap" }}>
        //                 <DeleteFilled className="gx-link" onClick={e => sendDelete(record)} />
        //                 <EditFilled className="gx-link" style={{ paddingLeft: "10px" }} onClick={e => sendForEdit(record)} />
        //             </div>

        //         </span>
        //     ),
        // }
    ];

    if (ReportListLoading) {
        // props.setReportList([...tempList]);
    }
    return (
        <>
            <Card title="Report List">
                {ReportListLoading ?
                    <>
                        <Spin className="gx-loader-container" />
                    </>

                    :
                    <>
                        <Table columns={columns} dataSource={list} scroll={{ x: 500 }} />

                    </>
                }
            </Card>
        </>
    )
}

export default ReportList;
