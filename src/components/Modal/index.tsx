import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 858,
  bgcolor: 'background.paper',
  border: 'none',
  p: 4,
  borderRadius: '8px'
};

interface IProps {
    open: boolean,
    onClose: () => void,
    children: any
}

const PersonalModal: React.FC <IProps> = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Box sx={style}>
                {props.children}
            </Box>
        </Modal>
    );
};

export default PersonalModal;