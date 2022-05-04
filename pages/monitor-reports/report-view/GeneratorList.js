import { Table } from 'antd';
import React, { useContext, useEffect  } from 'react'
import { GEN_STAT_LIST } from '../../../constants/graphql/add-report/queries';
import { DailyReportDetailsContext } from './[id]';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { DELETE_GEN_POW } from '../../../constants/graphql/monitor-report-form/mutations';

const GeneratorList = (props) => {

    const { monitoring_id } = useContext(DailyReportDetailsContext);

    const { loading: GenStatListLoading, data: GenStatList, refetch } = useQuery(GEN_STAT_LIST, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    });

    useEffect(() => {
        refetch()
    }, [props.refetch])

    refetch();
    console.log("Monitoring ID",monitoring_id);

    const dataSourcer = GenStatList?.generator_status.map((a) => {
        return {
            key: a,
            id: a.id,
            generator_id: a.generator.id,
            generator_name: a.generator.name,
            bat_voltage: a.bat_voltage,
            engine_oil: a.engine_oil,
            fuel_level: a.fuel_level,
            coolant: a.coolant,
            syncro_stat: a.syncro_stat,
        }
    })


    const [deleteGenStat] = useMutation(DELETE_GEN_POW);

    const sendDelete = (data) => {
        try {
            deleteGenStat({
                variables: {
                    deleteGeneratorStatusId: data.id
                }
            }).then(resp => {
                console.log("SUCCESS",resp);
                refetch();
            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const sendEdit = (data) => {
        console.log(data)
        props.forEdit(data);
    } 

    const generatorColumns = [
        {
            title: 'Generator',
            dataIndex: 'generator_name',
            key: 'generator_name'
        },
        {
            title: 'Bat. Voltage',
            dataIndex: 'bat_voltage',
            key: 'bat_voltage',
        },
        {
            title: 'Engine Oil',
            dataIndex: 'engine_oil',
            key: 'engine_oil',
        },
        {
            title: 'Fuel Level',
            dataIndex: 'fuel_level',
            key: 'fuel_level',
        },
        {
            title: 'Coolant',
            dataIndex: 'coolant',
            key: 'coolant',
        },
        {
            title: 'Syncro Stat',
            dataIndex: 'syncro_stat',
            key: 'syncro_stat',
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
            <Table columns={generatorColumns} dataSource={dataSourcer} scroll={{ x: 700 }} />
        </>
    )
}

export default GeneratorList;