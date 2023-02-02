import React from 'react'
import { useParams } from 'react-router-dom'

export default function Account() {
    const { accountId } = useParams()

    return (
        <div className='flex justify-center w-full'>Account {accountId}</div>
    )
}
