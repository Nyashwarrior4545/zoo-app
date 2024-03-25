// TicketPage

import { useEffect }from 'react'
import { useTicketContext } from "../hooks/useTicketContext"
import Layout from '../componets/Layout';

// components
import TicketForm from '../componets/TicketForm'

const Home = () => {


  return (
    <Layout>
      <div className="home">
      <div className="ticket">
      </div>
        <TicketForm />
      </div>

    </Layout>
    
  )
}

export default Home