import React from 'react'

const ErrorMsg = ({ errorMsg }: { errorMsg: string[] | undefined }) => {
    return (
        <p className='text-red-500 text-sm'>{errorMsg}</p>

    )
}

export default ErrorMsg