import HeroCenter from '@/components/Hero'
import MediaCard from '@/components/MediaCard'
import OrgChart from '@/components/OrgChart'

export default function Template () {
  return (
    <>
      <div className='lg:p-8 xl:p-14 2xl:p-32'>
        <HeroCenter />
      </div>
      <div className='grid justify-center'>
        <div>
          <OrgChart></OrgChart>
        </div>
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
      </div>
    </>
  )
}
