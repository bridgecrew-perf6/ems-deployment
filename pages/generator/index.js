import React from 'react'
import { SiteHeadTitle } from '../../app/core/Layout/SiteHeadTitle'
import Generator from './Generator'

export default function GeneratorMain() {
  return (
    <>
    <SiteHeadTitle title={'Generators'}/>
        <Generator />
    </>
  )
}
