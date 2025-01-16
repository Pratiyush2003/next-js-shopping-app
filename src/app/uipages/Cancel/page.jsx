import React from 'react'
import Link from 'next/link'

const page = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
            <Link href="/" >This is Cancel Page
                <button className='p-2 text-white bg-black'>Go To Home Page</button>
            </Link>
        </div>
    )
}

export default page