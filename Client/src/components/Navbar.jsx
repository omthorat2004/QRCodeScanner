import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
  const location = useLocation()
  const [isHomePage,setHomePage] = useState(false)
  const [isUserLogin,setUserLogin] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem('auth-token')
    if(token){
      setUserLogin(true)
    }
  },[])
  useEffect(()=>{

    if(location.pathname=='/'){
      setHomePage(true)
    }
    else{
      setHomePage(false)
    }
  },[location.pathname])
  return (
    <AppBar position='static'>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                    {!isUserLogin?<Box>
                      <Button component={Link}  to='/login' sx={{color:'#fff'}} variant='contained'>Login</Button>
                      <Button  component={Link} to='/sign' sx={{color:'#fff'}} variant='contained'>Sign</Button>
                    </Box>:null}
                    <Box>
                      {isHomePage?<Button component={Link} to='/admin' variant='contained'>Admin Page</Button>:
                      <Button component={Link} to='/' variant='contained'>Home Page</Button>}
                    </Box>
                </Box>
                
            </Toolbar>
        </Container>
    </AppBar>
  );
}

export default Navbar;
