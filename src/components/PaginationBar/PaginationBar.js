import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const defaultPage = JSON.parse(localStorage.getItem('default-page')) || 1;

export const PaginationBar = ({ totalAnimals, animalsLimit, handlePagination }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
            <Pagination
             onChange={(event) => handlePagination(event)} 
             defaultPage={defaultPage}
             count={Math.ceil(totalAnimals / animalsLimit)}
             color="primary"
             hideNextButton={true}
             hidePrevButton={true}
            />
        </Box>
    );
};