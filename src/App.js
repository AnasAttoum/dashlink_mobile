import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LeftDrawer from './components/LeftDrawer';

import Devices from './pages/devices/Devices';
import EditDevice from './pages/devices/EditDevice';
import AddDevice from './pages/devices/AddDevice';

import Accessories from './pages/accessories/Accessories';
import EditAccessory from './pages/accessories/EditAccessory';
import AddAccessory from './pages/accessories/AddAccessory';

import Offers from './pages/offers/Offers';
import EditOffer from './pages/offers/EditOffer';
import AddOffer from './pages/offers/AddOffer';
import LogIn from './pages/LogIn';
import Statistics from './pages/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn />} />

        <Route path='' element={<LeftDrawer />}>
          <Route path='statistics' element={<Statistics />} />
          
          <Route path='devices' element={<Devices />} />
          <Route path='devices/:deviceIndex' element={<EditDevice />} />
          <Route path='devices/add' element={<AddDevice />} />

          <Route path='accessories' element={<Accessories />} />
          <Route path='accessories/:accessoryIndex' element={<EditAccessory />} />
          <Route path='accessories/add' element={<AddAccessory />} />

          <Route path='offers' element={<Offers />} />
          <Route path='offers/:offerIndex' element={<EditOffer />} />
          <Route path='offers/add' element={<AddOffer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
