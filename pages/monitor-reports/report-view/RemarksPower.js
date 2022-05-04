import { useQuery } from '@apollo/client'
import React,{useContext, useEffect} from 'react'
import { REMARKS_POW } from '../../../constants/graphql/add-report/queries';
import Remarks from './Remarks';
import { DailyReportDetailsContext } from './[id]';

const RemarksPower = (props) => {

    const {monitoring_id} = useContext(DailyReportDetailsContext)

    const { loading: RemarksPowerLoading, data: RemarksPowerList, refetch } = useQuery(REMARKS_POW, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    });

    useEffect(()=>{
        refetch();
    },[props.refetch]);
    

    return (
        <>
            <Remarks RemarksList={RemarksPowerList} RemarksLoading={RemarksPowerLoading}  InspComp={"Power"}  />
        </>
    )
}

export default RemarksPower;