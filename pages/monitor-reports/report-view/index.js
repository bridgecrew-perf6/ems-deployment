import React, { useState } from 'react'
import { SiteHeadTitle } from '../../../app/core/Layout/SiteHeadTitle';
import ReportForm from './ReportForm';

export default function ReportView(props) {

  return (
    <>
      <SiteHeadTitle title={'Form'} />
      <ReportForm />
    </>
  )
}
