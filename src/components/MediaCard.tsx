import * as React from 'react'
import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function MediaCard ({
  heading = 'CEO',
  text = 'John Doe'
}: {
  heading?: string
  text?: string
}) {
  return (
    <div className='max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-full after:bg-gradient-to-l after:from-blue-200 after:to-indigo-900 after:-z-10'>
      <Card>
        <Image
          alt='Random image'
          src='https://source.unsplash.com/random'
          width={640}
          height={480}
          style={{
            maxWidth: '150px',
            maxHeight: '150px',
            objectFit: 'cover'
          }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {heading}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
