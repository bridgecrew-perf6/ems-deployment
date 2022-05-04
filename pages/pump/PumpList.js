import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { DELETE_PUMP } from '../../constants/graphql/pump/mutations';
import { GET_PUMP_LIST } from '../../constants/graphql/pump/queries';
import { Input, Form, Select, Col, Row, Modal, notification, Divider, Table, Button, Card, Spin } from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons';

export default PumpList = (props) => {
    const { loading: pumpListLoading, data: pumpList, refetch } = useQuery(GET_PUMP_LIST);

    useEffect(() => {
        console.log(props.refetch)
        refetch()
    }, [props.refetch])

    const sendForEdit = (data) => {
        console.log("for edit", data)
        props.forEdit(data)
    }


    const [deletePump] = useMutation(DELETE_PUMP);

    const sendDelete = (record) => {
        if (confirm(`Are you sure you want to delete ${record.name}?`)) {
            deletePump({
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



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text, record) => <span onClick={e => sendForEdit(record)} className="gx-link">{text}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>                    
                    <div style={{whiteSpace:"nowrap"}}>
                        <DeleteFilled className="gx-link" onClick={e => sendDelete(record)} />
                        <EditFilled className="gx-link" style={{ paddingLeft: "10px" }} onClick={e => sendForEdit(record)} />
                    </div>             
                </span>
            ),
        }
    ];

    let tempList = pumpList?.pump;
    let list = [];
    if (tempList?.length > 0) {
        list = [...tempList].sort((a, b) => (a.id < b.id) ? 1 : -1);
    }

    console.log("tempList", tempList)

    return (
        <div>
            {/* {
                pumpList?.pump.map((i) => (
                    <li>
                        <span onClick={e => sendForEdit(i)} style={{ cursor: 'pointer' }}>{i.title}-{i.content} </span>
                        -
                        <span onClick={e => sendDelete(i.id)} style={{ cursor: 'pointer' }}>Delete</span>
                    </li>
                ))
            } */}

            <Card title="Pump List">
                {/* <Table className="gx-table-responsive" columns={columns} dataSource={list} /> */}

                {pumpListLoading? // if it is still loading
                    <>
                    <Spin className="gx-loader-container" />
                    </> 
                 : // else 
                    <>
                    <Table className="gx-table-responsive" columns={columns} dataSource={list} />
                    </>
                }
            </Card>

        </div>
    )
}