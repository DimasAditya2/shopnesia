import WithAuth from '@/middlewares/withAuth'
import { NextResponse } from 'next/server'

export function mainMiddleware() {
    return NextResponse.next()
}

export default WithAuth(mainMiddleware, ['admin', 'auth'])