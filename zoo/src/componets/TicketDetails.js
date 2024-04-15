
//TicketDetails
import TicketTable from './TicketTable';
import ManageTicketPage from "../pages/ManageTicketPage";
import Layout from'./Layout'
const TicketDetails = () => {
  return (
    <Layout>
      <ManageTicketPage/>
      <TicketTable />
    </Layout>
    
  );
};

export default TicketDetails;