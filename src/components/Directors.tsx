import React from 'react'
import MediaCard from './MediaCard'
import { UserProfile } from '@/types'

const Directors = ({ data }: { data: UserProfile[] }) => {
  const directors = data.filter(
    user => user.position === 'CEO' || user.position === 'Director'
  )
  return (
    <div className='flex flex-col lg:flex-row lg:flex-wrap justify-center p-12 gap-12'>
      {directors.map((director: UserProfile) => {
        return (
          <div className='pb-12' key={director.uuid}>
            <MediaCard
              title={
                director.position === 'CEO'
                  ? 'CEO'
                  : `Director of ${director.department}`
              }
              src={director.picture.large}
              email={director.email}
              name={director.name.first + ' ' + director.name.last}
            ></MediaCard>
          </div>
        )
      })}
    </div>
  )
}

export default Directors
