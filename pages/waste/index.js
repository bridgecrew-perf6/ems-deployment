import React from 'react'
import { SiteHeadTitle } from '../../app/core/Layout/SiteHeadTitle'
import Waste from './Waste'
import Unit from './Unit'

export default function WasteMain() {
  return (
    <>
    <SiteHeadTitle title={'Wastes'}/>
        <Waste />
        <Unit />
    </>
  )
}
