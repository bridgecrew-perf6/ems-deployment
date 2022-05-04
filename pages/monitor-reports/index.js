import React from 'react'
import { SiteHeadTitle } from '../../app/core/Layout/SiteHeadTitle'
import Reports from './Reports'

export default function MonitorReportsMain(props) {
  return (
    <>
    <SiteHeadTitle title={'Monitor Reports'}/>
    <Reports />
    </>
  );
}
