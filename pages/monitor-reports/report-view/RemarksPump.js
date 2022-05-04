import { useQuery } from '@apollo/client'
import React,{useContext,useEffect} from 'react'
import { REMARKS_PUMP } from '../../../constants/graphql/add-report/queries';
import Remarks from './Remarks';
import { DailyReportDetailsContext } from './[id]';

const RemarksPump = (props) => {

    const {monitoring_id} = useContext(DailyReportDetailsContext)

    const { loading: RemarksPumpLoading, data: RemarksPumpList, refetch } = useQuery(REMARKS_PUMP, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    });


    useEffect(()=>{
        refetch();
    },[props.refetch]);
    

    return (
        <>
            <Remarks RemarksList={RemarksPumpList} RemarksLoading={RemarksPumpLoading}  InspComp={"Pump"}/>
        </>
    )
}

export default RemarksPump;