import React from 'react'
import { Title } from './Title'

export const Page = (props: any) => {
    const styles = [ 'text-lg' ].join(' ')

    return (
        <div className={styles}>
            <Title />
        </div>
    )
}
