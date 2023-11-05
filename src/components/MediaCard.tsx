import * as React from 'react'
import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function MediaCard ({
  title = 'CEO',
  name = 'John Doe',
  src = '',
  email = ''
}: {
  title?: string
  name?: string
  src?: string
  email?: string
}) {
  return (
    <div>
      <div className='max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-1/2 after:bg-gradient-to-l after:from-blue-200 after:to-indigo-900 after:-z-10 h-60 w-80'>
        <Card>
          <div className='flex flex-col justify-center'>
            <div className='m-auto'>
              <Image
                alt='Random image'
                src={src ? src : 'https://source.unsplash.com/random'}
                width={1920}
                height={1080}
                style={{
                  maxWidth: '150px',
                  maxHeight: '150px',
                  objectFit: 'cover'
                }}
              />
            </div>
            <CardContent>
              <div className='whitespace-normal'>
                <Typography gutterBottom variant='h5' component='div'>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {email}
                </Typography>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
