import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { DELETE_NOTE } from '../../constants/graphql/test/mutations';
import { GET_NOTE_LIST } from '../../constants/graphql/test/queries';
import { Card, Divider, Table } from "antd";
import Icon from '@ant-design/icons';

export default NoteList = (props) => {
    const { loading: noteListLoading, data: noteList, refetch } = useQuery(GET_NOTE_LIST);

    useEffect(() => {
        refetch()
    }, [props.refetch])


    const sendForEdit = (data) => {
        console.log("for edit", data)
        props.forEdit(data)
    }

    const [deleteNotes] = useMutation(DELETE_NOTE);

    const sendDelete = (id) => {
        deleteNotes({
            variables: {
                id: id
            },
        })
            .then(resp => {
                refetch()
            })
            .catch(error => {
                console.log("error", error)
            });
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <span onClick={e => sendForEdit(record)} className="gx-link">{text}</span>,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {/* <span className="gx-link">Action 一 {record.name}</span>
            <Divider type="vertical"/> */}
                    <span className="gx-link" onClick={e => sendDelete(record.id)}>Delete</span>
                    {/* <Divider type="vertical"/>
            <span className="gx-link ant-dropdown-link">
              More actions <Icon type="down"/>
            </span> */}
                </span>
            ),
        }
    ];

    let tempList = noteList?.notes;
    let list = [];
    if (tempList?.length > 0) {
        list =  [...tempList].sort((a, b) => (a.id < b.id) ? 1 : -1);
    }

    console.log("tempList", tempList)

    return (
        <div>
            {/* {
                noteList?.notes.map((i) => (
                    <li>
                        <span onClick={e => sendForEdit(i)} style={{ cursor: 'pointer' }}>{i.title}-{i.content} </span>
                        -
                        <span onClick={e => sendDelete(i.id)} style={{ cursor: 'pointer' }}>Delete</span>
                    </li>
                ))
            } */}

            <Card title="Notes List">
                <Table className="gx-table-responsive" columns={columns} dataSource={list} />
            </Card>

        </div>
    )
}