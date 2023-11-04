'use client'
import HeroCenter from '@/components/Hero'
import MediaCard from '@/components/MediaCard'
import OrgChart from '@/components/OrgChart'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserProfile } from '@/types'
import { processUserData } from '@/helpers/format'

export default function Template () {
  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(
        'https://randomuser.me/api/?page=1&results=100&seed=abc'
      )
      return res.json()
    }
  })

  if (userQuery.isLoading) return <div className='h-screen'>Loading...</div>
  if (userQuery.isError) return <div className='h-screen'>Error...</div>

  return (
    <>
      <div className='lg:p-8 xl:p-14 2xl:p-32'>
        <HeroCenter />
      </div>
      <div className='grid justify-center'>
        <div className='flex flex-col lg:flex-row justify-center p-12 gap-12'>
          <div className='pb-12'>
            <MediaCard></MediaCard>
          </div>
          <div className='pb-12'>
            <MediaCard></MediaCard>
          </div>
          <div className='pb-12 -translate-y-12'>
            <MediaCard></MediaCard>
          </div>
          <div className='pb-12'>
            <MediaCard></MediaCard>
          </div>
          <div className='pb-12'>
            <MediaCard></MediaCard>
          </div>
        </div>
        <div>
          <OrgChart
            userData={processUserData(userQuery.data.results)}
          ></OrgChart>
        </div>
      </div>
    </>
  )
}
