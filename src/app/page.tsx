import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Root } from '@/types'

export default async function Home () {
  const res = await fetch(
    'https://randomuser.me/api/?page=3&results=100&seed=abc'
  )

  const data: Root = await res.json()
  console.log(data.results.map(() => {}))
  return (
    <main>
      <Container>
        <Box>
          <Card>
            <Typography variant='h2'></Typography>
          </Card>
        </Box>
      </Container>
    </main>
  )
}
