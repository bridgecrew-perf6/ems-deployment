import React, { createContext } from 'react'
import { useRouter } from 'next/router'
import ReportForm from './ReportForm'
import { SiteHeadTitle } from '../../../app/core/Layout/SiteHeadTitle';

export const DailyReportDetailsContext = createContext();

export default function ReportFormsID() {

  const router = useRouter();

  console.log(router.query);

  const data = {
    monitoring_id: router.query.id
  }

  var daily_id = router.query.id;

  return (
    <>

      <DailyReportDetailsContext.Provider value={data}>

        <SiteHeadTitle title={router.query.id} />
        <ReportForm daily_id={daily_id} />


      </DailyReportDetailsContext.Provider>
    </>
  )
}
