import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LeftDrawer from './components/LeftDrawer';
import Devices from './pages/devices/Devices';
import EditDevice from './pages/devices/EditDevice';
import AddDevice from './pages/devices/AddDevice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<LeftDrawer />}>
          <Route path='devices' element={<Devices />} />
          <Route path='devices/:deviceIndex' element={<EditDevice />} />
          <Route path='devices/add' element={<AddDevice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
