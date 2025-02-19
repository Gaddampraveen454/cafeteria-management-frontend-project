import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ProductsUserCardDetailes from './productsUserCardDetailes';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModalUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(true);

  const handleModel = () => {
    setIsOpenFiltersModal(false);
  };

  const closeFunction = () => {
    handleModel();
  };

  return (
    <div>
      {/* <Button > */}
      <div
        style={{
          borderRadius: '50%',
          width: '65px',
          height: '65px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #fff',
          backgroundColor: "#672100",
          color: "#fff"
        }}
        onClick={handleOpen}
      >
        <CsLineIcons icon="menu" style={{ width: '80%', height: 'auto' }} />
        <h6>Menu</h6>
      </div>
      {/* </Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} closeButton>
            <ProductsUserCardDetailes handleClose={handleClose} onClose={handleModel} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
