import { useQuery } from '@apollo/client'
import React,{useContext,useEffect} from 'react'
import { REMARKS_WASTE } from '../../../constants/graphql/add-report/queries';
import Remarks from './Remarks';
import { DailyReportDetailsContext } from './[id]';

const RemarksWaste = (props) => {

    const {monitoring_id} = useContext(DailyReportDetailsContext)

    const { loading: RemarksWasteLoading, data: RemarksWasteList, refetch } = useQuery(REMARKS_WASTE, {
        variables: {
            monitoringId: parseInt(monitoring_id)
        }
    });

    useEffect(()=>{
        refetch();
    },[props.refetch]);

    return (
        <>
            <Remarks RemarksList={RemarksWasteList} RemarksLoading={RemarksWasteLoading}  InspComp={"Waste"}/>
        </>
    )
}

export default RemarksWaste;