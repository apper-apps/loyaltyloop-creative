import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Cards from '@/components/pages/Cards';
import Customers from '@/components/pages/Customers';
import Analytics from '@/components/pages/Analytics';
import Campaigns from '@/components/pages/Campaigns';
import Settings from '@/components/pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
<Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cards" element={<Cards />} />
            <Route path="cards/new" element={<Cards />} />
            <Route path="cards/:id" element={<Cards />} />
            <Route path="cards/:id/edit" element={<Cards />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/new" element={<Customers />} />
            <Route path="customers/:id" element={<Customers />} />
            <Route path="customers/:id/edit" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaigns/new" element={<Campaigns />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;