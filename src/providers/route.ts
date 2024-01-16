import { NextRequest } from 'next/server'
import { UserProfile } from '@/entities/common'

export const isPublic = (req: NextRequest) => {
  console.log(req.url)
  return false
}

export const authorize = (req: NextRequest, user: UserProfile) => {
  return true
}
