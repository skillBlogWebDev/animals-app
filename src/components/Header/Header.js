import * as React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SiteLink } from '../SiteLink/SiteLink';

export const Header = () => {
  const authState = useSelector(state => state.auth);

  const checkToken = () => {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      window.history.pushState({}, null, '/');
      window.location.reload();
    }
  };

  const pages = [
    {
        text: 'Животные',
        url: '/animals',
        checkToken
    },
    {
        text: 'Сегодня',
        url: '/today',
        checkToken
    }
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography component="div" sx={{ marginRight: '20px', fontSize: '40px' }}>
            LOGO
          </Typography>
          {authState.isAuthUser ? 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <SiteLink
               url={page.url}
               text={page.text}
               callback={page.checkToken}
               key={page.text}
               />
            ))}
          </Box> : ''}
          <Box sx={{ flexGrow: 0 }}>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
