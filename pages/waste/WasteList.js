import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { DELETE_WASTE } from '../../constants/graphql/waste/mutations';
import { GET_WASTE_LIST } from '../../constants/graphql/waste/queries';
import { Input, Form, Select, Col, Row, Modal, notification, Divider, Table, Button, Card } from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons';

export const WasteList = (props) => {
    const { loading: wasteListLoading, data: wasteList, refetch } = useQuery(GET_WASTE_LIST);

    useEffect(() => {
        refetch()
    }, [props.refetch])

    const sendForEdit = (data) => {
        console.log("for edit", data)
        props.forEdit(data)
    }


    const [deleteWaste] = useMutation(DELETE_WASTE);

    const sendDelete = (record) => {
        if (confirm(`Are you sure you want to delete ${record.name}?`)) {
            deleteWaste({
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
            title: 'Waste Class',
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
                    {/* <span className="gx-link">Action 一 {record.name}</span>
            // <Divider type="vertical"/> */}
                    {/* <span className="gx-link" onClick={e => sendDelete(record.id)}>Delete</span> */}
                    <div style={{whiteSpace:"nowrap"}}>
                        <DeleteFilled className="gx-link" onClick={e => sendDelete(record)} />
                        <EditFilled className="gx-link" style={{ paddingLeft: "10px" }} onClick={e => sendForEdit(record)} />
                    </div>

                    {/* <Divider type="vertical"/>
            <span className="gx-link ant-dropdown-link">
              More actions <Icon type="down"/>
            </span> */}
                </span>
            ),
        }
    ];

    let tempList = wasteList?.waste;
    let list = [];
    if (tempList?.length > 0) {
        list = [...tempList].sort((a, b) => (a.id < b.id) ? 1 : -1);
    }

    console.log("tempList", tempList)

    return (
        <div>
            {/* {
                wasteList?.waste.map((i) => (
                    <li>
                        <span onClick={e => sendForEdit(i)} style={{ cursor: 'pointer' }}>{i.title}-{i.content} </span>
                        -
                        <span onClick={e => sendDelete(i.id)} style={{ cursor: 'pointer' }}>Delete</span>
                    </li>
                ))
            } */}

            <Card title="Waste List">
                <Table className="gx-table-responsive" columns={columns} dataSource={list} />
            </Card>

        </div>
    )
}