import { Table } from 'antd';
import React, { useContext, useEffect } from 'react'
import { POW_SHIFT_LIST } from '../../../constants/graphql/add-report/queries';
import { DailyReportDetailsContext } from './[id]';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { DELETE_POWERCHECK } from '../../../constants/graphql/add-report/mutations';

const PowerhouseTable = (props) => {

    const { monitoring_id } = useContext(DailyReportDetailsContext)

    const { loading: PowShiftListLoading, data: PowShiftList, refetch } = useQuery(POW_SHIFT_LIST, {
        variables: {
            "monitoringId": parseInt(monitoring_id)
        }
    });

    useEffect(() => {
        console.log("refetch props",!props.refetch);
        refetch();
    }, [!props.refetch])

    console.log("POW LIST",PowShiftList);

    if (PowShiftList) {
        console.log("PowShiftList = true");
    } else {
        console.log("PowShiftList = false");
    }

    const [deletePowShift] = useMutation(DELETE_POWERCHECK);

    const dataSourcer = PowShiftList?.powershiftReading.map((a) => {
        return {
            id: a.id,
            mode: a.mode,
            live_curr_1: a.line_curr_1,
            live_curr_2: a.line_curr_2,
            live_curr_3: a.line_curr_3,
            live_volt_1: a.line_volt_1,
            live_volt_2: a.line_volt_2,
            live_volt_3: a.line_volt_3,
            duration_start: a.duration_start,
            duration_end: a.duration_end,
            shift_order: a.shift_order,
            power_type: a.power_type,
            frequency: a.frequency
        }
    })

    const sendDelete = (data) => {
        try {
            deletePowShift({
                variables: {
                    id: data.id
                }
            }).then(resp=> {
                console.log(resp)
                refetch();
            }).catch(error=> {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }
    }

    const sendEdit = (data) => {
        console.log("Powerhouse List",data)
        props.forEdit(data);
    }

    const powerhouseColumns = [
        {
            title: 'ATS',
            dataIndex: 'shift_order',
            key: 'shift_order'
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
        },
        {
            title: 'Type',
            dataIndex: 'power_type',
            key: 'power_type',
        },
        {
            title: 'Live Voltage 1',
            dataIndex: 'live_volt_1',
            key: 'live_volt_1',
        },
        {
            title: 'Live Voltage 2',
            dataIndex: 'live_volt_2',
            key: 'live_volt_2',
        },
        {
            title: 'Live Voltage 3',
            dataIndex: 'live_curr_3',
            key: 'live_curr_3',
        },
        {
            title: 'Live Current 1',
            dataIndex: 'live_curr_1',
            key: 'live_curr_1',
        },
        {
            title: 'Live Current 2',
            dataIndex: 'live_curr_2',
            key: 'live_curr_2',
        },
        {
            title: 'Live Current 3',
            dataIndex: 'live_curr_3',
            key: 'live_curr_3',
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Started At',
            dataIndex: 'duration_start',
            key: 'duration_start',
        },
        {
            title: 'Ended At',
            dataIndex: 'duration_end',
            key: 'duration_end',
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
            <Table columns={powerhouseColumns} dataSource={dataSourcer} scroll={{ x: 1400 }} />
        </>
    )
}

export default PowerhouseTable;