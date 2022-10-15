import React, {
  useState, useContext, useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';

// Material-UI
import {
  AppBar,
  Avatar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Divider,
  List,
  ListItemText,
  ListItem,
  Container,
} from '@mui/material';
import {
  makeStyles,
} from '@mui/styles';
import {
  ArrowBackIosNew as ArrowLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { displayDesktop, displayMobile } from '../../utils/materialDisplay';

import { AuthenticationContext } from '../../context/authentication.context';
import UserOptionsMenu from '../user/UserOptionsMenu/UserOptionsMenu';
import CollapseUserOptionsMenuItem from '../user/UserOptionsMenu/CollapseUserOptionsMenuItem';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  'nav-menu': {
    display: 'flex',
    flexDirection: 'row',
  },
  'drawer-header': {
    minWidth: '75vw',
    display: 'flex',
    flexDirection: 'row',
  },
});

const Header = () => {
  const { verifyUser, verifyAdministrator, user } = useContext(AuthenticationContext);
  const [navItems, setNavItems] = useState([]);
  const [openMobibleMenu, setOpenMobileMenu] = useState(false);
  const classes = useStyles();

  // const getNavMenu = () => {
  //   const items = [];

  //   // Default
  //   items.push({
  //     Id: 1,
  //     Link: '/motobikes',
  //     Title: 'Motobikes',
  //   });
  //   items.push({
  //     Id: 2,
  //     Link: '/m',
  //     Title: 'Tutor',
  //   });
  //   items.push({
  //     Id: 3,
  //     Link: '/forum',
  //     Title: 'Forum',
  //   })

  //   setNavItems(items);
  // };

  // useEffect(() => {
  //   getNavMenu();
  // }, []);

  const toggleDrawler = () => {
    if (openMobibleMenu) {
      setNavItems([]);
      setOpenMobileMenu(false);
    } else {
      // getNavMenu();
      setOpenMobileMenu(true);
    }
  };

  const renderNavMenu = () => (
    <Box display={displayDesktop}>
      <List className={`${classes['nav-menu']}`}>
        {
          navItems.map((item) => (
            <NavLink className="nav-item" key={item.Id} to={item.Link}>
              <ListItem color="inherit">
                <ListItemText primary={item.Title} />
              </ListItem>
            </NavLink>
          ))
        }
      </List>
    </Box>
  );

  const renderNavMenuMobile = () => (
    <SwipeableDrawer
      className={classes['styled-drawer']}
      anchor="left"
      open={openMobibleMenu}
      onClose={toggleDrawler}
      onOpen={toggleDrawler}
    >
      <div
        className={classes['drawer-header']}
        onClick={toggleDrawler}
        role="button"
        tabIndex={0}
      >
        {
          !verifyUser()
            ? (
              <List className={classes['nav-menu']}>
                <NavLink to="/register" onClick={toggleDrawler}>
                  <ListItem>
                    <ListItemText primary="Register" />
                  </ListItem>
                </NavLink>
                <NavLink to="/login" onClick={toggleDrawler}>
                  <ListItem>
                    <ListItemText primary="Login" />
                  </ListItem>
                </NavLink>
              </List>
            )
            : (
              <Box className={classes['nav-menu']} m="0.7rem">
                <Avatar
                  border={1}
                  sx={{ bgcolor: 'primary.main' }}
                  alt={user.username}
                  src={user.avatar || './image/default_avatar.jpg'}
                />
                <Box ml="1rem">
                  <strong>{ user.username }</strong>
                  <br />
                  <i>{ user.email }</i>
                </Box>
              </Box>
            )
        }
        <Box
          ml="auto"
          component={IconButton}
          color="inherit"
        >
          <ArrowLeftIcon fontSize="large" />
        </Box>
      </div>
      <Divider />
      <List>
        {
          navItems.map((item) => (
            <NavLink key={item.Id} to={item.Link} onClick={toggleDrawler}>
              <ListItem key={item.Id}>
                <ListItemText primary={item.Title} />
              </ListItem>
            </NavLink>
          ))
        }
        {
          verifyUser() && (
            [
              <Divider key={8} />,
              <CollapseUserOptionsMenuItem key={7} onClick={toggleDrawler} />,
            ]
          )
        }
      </List>
      <Divider />
    </SwipeableDrawer>
  );

  return (
    <div className="header">
      <AppBar position="static" color="inherit">
        <Container>
          <Toolbar style={{ paddingLeft: '0', paddingRight: '0' }}>
            <NavLink className="no-border" to="/">
              <Box display="flex" flexDirection="row" alignItems="center">
                <IconButton>
                  <Avatar
                    alt="Motobike Go"
                    src="logo.png"
                  />
                </IconButton>
                <Box>
                  <Typography
                    variant="button"
                    color="primary"
                  >
                    Motobike Go
                  </Typography>
                </Box>
              </Box>
            </NavLink>

            {/* <div className={classes.grow} /> */}
            
            <div className={classes.grow} />

            {renderNavMenu()}

            <div className={classes.grow} />

            {
              verifyAdministrator()
              && (
                <List className={classes['nav-menu']}>
                  <ListItem button>
                    <NavLink className="admin-badge" to="/admin">
                      <ListItemText>
                        <span className="fas fa-cogs" />
                        &nbsp;&nbsp;
                        {'Dashboard'}
                      </ListItemText>
                    </NavLink>
                  </ListItem>
                </List>
              )
            }

            {
              verifyUser()
                ? (
                  <Box display={displayDesktop}>
                    <UserOptionsMenu />
                  </Box>
                )
                : (
                  <Box display={displayDesktop} >
                    <List className={classes['nav-menu']}>
                      <NavLink className="nav-item" to="/register">
                        <ListItem>
                          <ListItemText primary="Register" />
                        </ListItem>
                      </NavLink>
                      <NavLink className="nav-item" to="/login">
                        <ListItem>
                          <ListItemText primary="Login" />
                        </ListItem>
                      </NavLink>
                    </List>
                  </Box>
                )
            }

            {
              // verifyUser() && 
              (
                <Box display={displayMobile}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawler}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Box>
              )
            }
          </Toolbar>
        </Container>
      </AppBar>
      {renderNavMenuMobile()}
    </div>
  );
};

export default Header;
