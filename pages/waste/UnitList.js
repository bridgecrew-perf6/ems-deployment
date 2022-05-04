import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { DELETE_WASTE } from '../../constants/graphql/waste/mutations';
import { UNIT_LIST } from '../../constants/graphql/unit/queries';
import { Input, Form, Select, Col, Row, Modal, notification, Divider, Table, Button, Card } from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons';

export const UnitList = (props) => {

    const { loading: unitListLoading, data: unitList, refetch } = useQuery(UNIT_LIST);

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
            title: 'Unit',
            dataIndex: 'name',
            key: 'name'
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

    let tempList = unitList?.unit;
    let list = [];
    if (tempList?.length > 0) {
        list = [...tempList].sort((a, b) => (a.id < b.id) ? 1 : -1);
    }

    console.log("tempList", tempList)

    return (
        <div>

            <Card title="Units">
                <Table className="gx-table-responsive" columns={columns} dataSource={list} />
            </Card>

        </div>
    )
}