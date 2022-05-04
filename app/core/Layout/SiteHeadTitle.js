import React from 'react'
import Head from 'next/head'
import { SITE_ACCR, SITE_FULL_NAME } from '../../../constants/SystemDetails'

export const SiteHeadTitle = ({ title }) => {
  return (
  <React.Fragment>
    <Head>
      <title>{title ? SITE_ACCR + ' - ' + title : SITE_FULL_NAME}</title>
    </Head>
  </React.Fragment>
  )
 

}
