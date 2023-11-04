import { Root } from '@/types'
import { revalidatePath } from 'next/cache'
import { simplifyAndAssignAll } from './helpers/format'

export default async function Home () {
  const res = await fetch(
    'https://randomuser.me/api/?page=1&results=100&seed=abc'
  )

  const data: Root = await res.json()
  const orgData = simplifyAndAssignAll(data.results)
  return <main></main>
}
