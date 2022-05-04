import { Table } from 'antd';
import React, { useContext, useEffect } from 'react'
import { DailyReportDetailsContext } from './[id]';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { DELETE_POLUTION } from '../../../constants/graphql/add-report/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { POLUTION_LIST } from '../../../constants/graphql/add-report/queries';

const PolContList = (props) => {



    const { monitoring_id } = useContext(DailyReportDetailsContext);

    const { loading: PolListLoading, data: PolList, refetch } = useQuery(POLUTION_LIST,
        {
            variables: {
                monitoringId: parseInt(monitoring_id)
            }
        }
    );

    useEffect(()=>{
        refetch();
    },[props.refetch]);

    const sourceList = PolList?.polutionInspection.map((a) => {
        return {
            id: a.id,
            waste_id: a.waste.id,
            unit_id: a.unit.id,
            waste_name: a.waste.name,
            unit: a.unit.name,
            quantity: a.quantity
        }
    })


    const [deletePol] = useMutation(DELETE_POLUTION);

    const sendDelete = (data) => {
        try {
            deletePol({
                variables: {
                    id: data.id
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
        props.forEdit(data);
    }

    const wasteCheckColumns = [
        {
            title: 'Classification of Waste',
            dataIndex: 'waste_name',
            key: 'waste_name'
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
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
            <Table columns={wasteCheckColumns} dataSource={sourceList} scroll={{ x: 200 }} />
        </>
    )
}

export default PolContList;