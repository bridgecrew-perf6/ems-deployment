import { Table, Button } from 'antd';
import React, { useContext, useEffect } from 'react'
import { DailyReportDetailsContext } from './[id]';
import { PUMP_READ_LIST } from '../../../constants/graphql/add-report/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PUMP_STAT } from '../../../constants/graphql/add-report/mutations';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

const PumpStatusList = (props) => {


    const { monitoring_id } = useContext(DailyReportDetailsContext);

    const { loading: PumpReadingListLoading, data: PumpReadingList, refetch } = useQuery(PUMP_READ_LIST, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    })


    useEffect(() => {
        refetch();
    }, [props.refetch]);

    const dataSourcer = PumpReadingList?.pumpReading.map((a) => {
        return {
            id: a.id,
            inspection_id: a.inspection_id,
            pump_room_read: a.pump_room_read,
            pump_station_read: a.pump_station_read,
            stp_discharge_read: a.stp_discharge_read,
            stp_recycled_read: a.stp_recycled_read,
            main_kwhr_read: a.main_kwhr_read,
            stp_kwhr_read: a.stp_discharge_read
        }
    })

    const sendEdit = (data) => {
        console.log(data);
        props.forEdit(data)
    }

    const [deletePumpStat] = useMutation(DELETE_PUMP_STAT);

    const sendDelete = (data) => {
        try {
            deletePumpStat({
                variables: {
                    deletedPumpReadingId: data.id
                }
            }).then(resp => {
                console.log(resp)
                refetch();
            }).catch(error => {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
            refetch();
        }
        refetch();
    }

    const generatorColumns = [
        {
            title: 'Pump Room',
            dataIndex: 'pump_room_read',
            key: 'pump_room_read'
        },
        {
            title: 'Pump Station',
            dataIndex: 'pump_station_read',
            key: 'pump_station_read',
        },
        {
            title: 'STP DISCHARGE',
            dataIndex: 'stp_discharge_read',
            key: 'stp_discharge_read',
        },
        {
            title: 'STP RECYCLED',
            dataIndex: 'stp_recycled_read',
            key: 'stp_recycled_read',
        },
        {
            title: 'MAIN KWHR',
            dataIndex: 'main_kwhr_read',
            key: 'main_kwhr_read',
        },
        {
            title: 'STP KWHR',
            dataIndex: 'stp_kwhr_read',
            key: 'stp_kwhr_read',
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

    console.log("data sourcer",PumpReadingList);


    return (
        <>
            {/* <Button type='dashed' onClick={() => props.setPumpStatForm(true)}>Add Pump Status</Button> */}
            {PumpReadingListLoading?
                <>
                </>
                :
                Object.keys(dataSourcer).length == 0 ?
                    <>
                    <Button onClick={() => props.setPumpStatForm(true)}>Add Pump Status</Button>
                    </>
                    :
                    <>
                    </>
            }
            <br />
            <Table columns={generatorColumns} dataSource={dataSourcer} scroll={{ x: 800 }} />
        </>
    )
}

export default PumpStatusList;