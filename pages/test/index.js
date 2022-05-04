import React from 'react'
import Head from 'next/head'
import { SiteHeadTitle } from '../../app/core/Layout/SiteHeadTitle'
import Testing from './Testing'
const TestingModule = () => {
    return (
        <>
        <SiteHeadTitle title={'Testing'}/>
        <Testing />
        </>
    )
}

export default TestingModule