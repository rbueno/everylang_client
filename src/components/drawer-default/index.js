import PropTypes from 'prop-types';
import { Drawer, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles'

const DrawerRootStyled = styled('div')(({theme}) => ({
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 600
    }
  }))

DrawerDefault.propTypes = {
    anchor: PropTypes.string, 
    open: PropTypes.bool,
    onClose: PropTypes.func, 
    displayCloseOption: PropTypes.string,
    drawerContent: PropTypes.element, 
}

export default function DrawerDefault({ anchor = 'right', open, onClose, drawerContent, displayCloseOption }){

    const toggleDrawer = (open) => (event) => {
        console.log('toggleDrawer event', event)
        if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) {
          return;
        }
      
        onClose(open)
      };

    return(<Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <DrawerRootStyled>

        {
            displayCloseOption === 'top' && <>
            <Box m={2}>
                <IconButton color='primary' onClick={() => toggleDrawer(false)({ type: 'click', key: ''})}>
                    <CloseIcon />
                </IconButton>
            </Box>
            </>
        }
        
        {drawerContent}

        {
            displayCloseOption === 'bottom' && <>
            <Box>
                <IconButton onClick={() => handleOnClose()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            </>
        }
        </DrawerRootStyled>
      </Drawer>)
}