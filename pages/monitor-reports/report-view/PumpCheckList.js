import { Table } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DailyReportDetailsContext } from './[id]';
import { PUMP_CHECK_LIST } from '../../../constants/graphql/add-report/queries';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { DELETE_PUMP_CHECK } from '../../../constants/graphql/add-report/mutations';


const PumpCheckList = (props) => {

    const { monitoring_id } = useContext(DailyReportDetailsContext)

    const { loading: PumpCheckListLoading, data: PumpCheckerList, refetch } = useQuery(PUMP_CHECK_LIST, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    })

    useEffect(() => {
        refetch();
    }, [props.refetch]);

    refetch();

    const dataSourcer = PumpCheckerList?.pumpCheckDisplay.map((a)=> {
        return {
            id: a.id,
            pump_id: a.pump.id,
            pump_name: a.pump.name,
            pump_mode: a.pump_mode,
            pump_pressure: a.pump_pressure
        }
    })

    const sendEdit = (data) => {
        console.log(data)
        props.forEdit(data);
    }

    const [deletePumpCheck] = useMutation(DELETE_PUMP_CHECK);

    const sendDelete = (data) => {
        try {
            deletePumpCheck({
                variables: {
                    deletePumpCheckId: data.id
                }
            }).then(resp=> {
                console.log(resp)
                refetch();
            }).catch(error=> {
                refetch();
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }
    }

    console.log("data sourcer",dataSourcer);
    

    const pumpCheckColumns = [
        {
            title: 'Pump',
            dataIndex: 'pump_name',
            key: 'pump_name'
        },
        {
            title: 'Mode',
            dataIndex: 'pump_mode',
            key: 'mode'
        },
        {
            title: 'PSI',
            dataIndex: 'pump_pressure',
            key: 'pump_pressure'
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
            <Table columns={pumpCheckColumns} dataSource={dataSourcer}  scroll={{ x: 200 }} />
        </>
    )
}

export default PumpCheckList;