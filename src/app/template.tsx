'use client'
import HeroCenter from '@/components/Hero'
import OrgChart from '@/components/OrgChart'
import Search from '@/components/Search'
import { useQuery } from '@tanstack/react-query'
import { processUserData } from '@/helpers/format'
import { useDispatch } from 'react-redux'
import { setData } from '@/redux/slices'
import Fade from '@mui/material/Fade'
import staticData from '@/data.json'
import Spinner from '@/components/Spinner'
import Directors from '@/components/Directors'

export default function Template () {
  const dispatch = useDispatch()
  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(
        'https://randomuser.me/api/?page=1&results=100&seed=abc'
      )
      return res.json()
    }
  })

  if (userQuery.isLoading)
    return (
      <div className='h-screen grid justify-center items-center'>
        <Spinner />
      </div>
    )
  const data = userQuery.error ? staticData : userQuery.data
  dispatch(setData(processUserData(data.results)))
  return (
    <>
      <div className='lg:p-8 xl:p-14 2xl:p-32'>
        <Fade appear={true} in={true} timeout={500}>
          <div>
            <HeroCenter search={<Search />} />
          </div>
        </Fade>
      </div>
      <div className='m-auto'>
        <OrgChart userData={processUserData(data.results)}></OrgChart>
      </div>
      <div className='grid justify-center'>
        <Directors data={processUserData(data.results)} />
      </div>
    </>
  )
}
