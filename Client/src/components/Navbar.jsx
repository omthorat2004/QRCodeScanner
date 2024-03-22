import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <AppBar position='static'>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Box>
                    <Button component={Link} to='/login' sx={{color:'#fff'}} variant='outlined'>Login</Button>
                    <Button  component={Link} to='/sign' sx={{color:'#fff'}} variant='outlined'>Sign</Button>
                </Box>

            </Toolbar>
        </Container>
    </AppBar>
  );
}

export default Navbar;
