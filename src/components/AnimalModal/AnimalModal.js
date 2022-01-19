import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export const AnimalModal = ({ open, handleModalClose, animal }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {animal.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Порода: {animal.spec.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Возраст: {animal.age}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Рост: {animal.height ? animal.height + animal.heightUnit : 'Нет данных'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Вес: {animal.weight ? animal.weight + animal.weightUnit : 'Нет данных'}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}