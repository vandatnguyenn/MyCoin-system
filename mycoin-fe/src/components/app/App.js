import './App.css';
import Navbar from '../common/navbar';
import Dashboard from '../dashboard/dashboard';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

function App() {

  return (
    <div className='App'>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar/>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Dashboard/>
        </Box>
      </Box>
    </div>
  );
}

export default App;
