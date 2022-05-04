import { Table } from 'antd';
import React, { useContext, useEffect } from 'react'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_FIRE, DEL_FIRE_PROT } from '../../../constants/graphql/add-report/mutations';
import { FIRE_PRES_LIST } from '../../../constants/graphql/add-report/queries';
import { DailyReportDetailsContext } from './[id]';

const FireProtList = (props) => {

    const { monitoring_id } = useContext(DailyReportDetailsContext);

    const { loading: FirePresListLoading, data: FirePresList, refetch } = useQuery(FIRE_PRES_LIST, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    })

    useEffect(()=>{
        refetch();
    },[props.refetch]);

    const dataSourcer = FirePresList?.firePressures.map((a) => {
        return {
            id: a.id,
            floor: a.floor.num,
            pressure: a.pressure,
        }
    })

    const [deleteFire] = useMutation(DELETE_FIRE);

    const sendDelete = (data) => {
        try {
            deleteFire({
                variables: {
                    deleteFirePressureId: data.id
                }
            }).then(resp => {
                console.log(resp)
                refetch();
            }).catch(error => {
                console.log(error)
                refetch();
            });
        } catch (error) {
            console.log(error)
            refetch();
        }
        refetch();
    }


    const sendEdit = (data) => {
        console.log(data)
        props.forEdit(data);
    }


    const fireCheckColumns = [
        {
            title: 'Floor',
            dataIndex: 'floor',
            key: 'floor'
        },
        {
            title: 'Pressure',
            dataIndex: 'pressure',
            key: 'pressure'
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


    return (
        <>
            <Table columns={fireCheckColumns} dataSource={dataSourcer} scroll={{ x: 200 }} />
        </>
    )
}

export default FireProtList;