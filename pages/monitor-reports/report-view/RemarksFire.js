import { useQuery } from '@apollo/client'
import React,{useContext,useEffect} from 'react'
import { REMARKS_FIRE } from '../../../constants/graphql/add-report/queries';
import Remarks from './Remarks';
import { DailyReportDetailsContext } from './[id]';

const RemarksFire = (props) => {

    const {monitoring_id} = useContext(DailyReportDetailsContext)

    const { loading: RemarksFireLoading, data: RemarksFireList, refetch } = useQuery(REMARKS_FIRE, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    });


    useEffect(()=>{
        refetch();
    },[props.refetch]);
    
    return (
        <>
            <Remarks RemarksList={RemarksFireList} RemarksLoading={RemarksFireLoading} InspComp={"Fire"}/>
        </>
    )
}

export default RemarksFire;