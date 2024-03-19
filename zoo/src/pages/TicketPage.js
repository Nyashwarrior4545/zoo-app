// TicketPage

import { useEffect }from 'react'
import { useTicketContext } from "../hooks/useTicketContext"
import Sidebar from '../componets/Sidebar';

// components
import TicketForm from '../componets/TicketForm'

const Home = () => {


  return (
    <div className="home">
      <div className="ticket">
      </div>
      {/* <Sidebar/> */}
      <TicketForm />
      <Sidebar/>
    </div>
  )
}

export default Home