import type { NextPage } from 'next'
import PurchaseForm from './components/PurchaseForm'
import { Container } from '@mui/material'
import PurchaseList from './components/PurchaseList'

const Home: NextPage = () => {
  return (
    <Container sx={{ bgcolor: 'white' }}>
      <PurchaseForm />
      <PurchaseList />
    </Container>
  )
}

export default Home
