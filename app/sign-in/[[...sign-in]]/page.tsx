import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className='mt-10 flex justify-center items-center'>
            <Suspense fallback={<p>Loading sign in...</p>}>
                <SignIn />
            </Suspense>
        </div>
    )
}