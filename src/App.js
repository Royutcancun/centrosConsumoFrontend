
import { AppBar, IconButton, Menu, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import Appbar from './components/Appbar';
import Restaurantes from './components/Restaurantes';
import Bares from './components/Bares';
import Detalles from './components/Detalles';

function App() {
  return (
    <div className="App">
      <Appbar/>
      
      <div className='container'>
        <section>
          <Restaurantes/>
        </section>
        <section >
          <Bares/>
        </section>
        <section >
          <Detalles/>
        </section>
      </div>

    </div>
  );
  
}

export default App;

/*<AppBar position='sticky' color='secondary'>
        <Toolbar>
          <IconButton aria-label='app' color='inherit'>
            <Menu/>
          </IconButton>
          <Typography variant='h6'>Grand Oasis Cancún</Typography>
        </Toolbar>
      </AppBar>*/