import type { NextPage } from 'next'
import PurchaseForm from './components/PurchaseForm'
import { Container } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Container>
      <PurchaseForm />
    </Container>
  )
}

export default Home
