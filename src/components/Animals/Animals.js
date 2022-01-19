import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { ANIMALS_ERROR, ANIMALS_SUCCESS } from "../../constants/constants";
import { getAllAnimals, getLimitAnimals } from "../../network";
import { animalsError, animalsSuccess } from "../../redux/actions/actions";
import { PaginationBar } from "../PaginationBar/PaginationBar";
import { AnimalModal } from "../AnimalModal/AnimalModal";

const Animals = () => {
    const [animalsLimit] = useState(5);
    let defaultPage = JSON.parse(localStorage.getItem('default-page'));
    let defaultOffset;

    if (!defaultPage) {
        defaultOffset = 0;
    } else {
        defaultOffset = animalsLimit * (+defaultPage - 1);
    }

    const authState = useSelector(state => state.auth);
    const animalsState = useSelector(state => state.animals);
    const [animalsOffset, setAnimalsOffset] = useState(defaultOffset);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagination, setTotalPagination] = useState(0);
    const [animal, setAnimal] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        handleAnimals();
    }, []);

    const getPaginatedPages = async (offset) => {
        const limitAnimals = await getLimitAnimals(authState.user, animalsLimit, offset);

        if (!limitAnimals) {
            dispatch(animalsError(ANIMALS_ERROR));
            window.location.reload();
            return;
        }

        dispatch(animalsSuccess(ANIMALS_SUCCESS, limitAnimals.results));
    };

    const handleAnimals = async () => {
        const limitAnimals = await getLimitAnimals(authState.user, animalsLimit, animalsOffset);
        const allAnimals = await getAllAnimals(authState.user);

        if (!limitAnimals || !allAnimals) {
            dispatch(animalsError(ANIMALS_ERROR));
            window.location.reload();
            return;
        }

        setTotalPagination(allAnimals.results.length);

        dispatch(animalsSuccess(ANIMALS_SUCCESS, limitAnimals.results));
    };

    const prevPage = async (page) => {
        const pagItems = Array.from(document.querySelectorAll('.MuiPaginationItem-root'));
        const fromPage = JSON.parse(localStorage.getItem('current-page'));

        if (page === 1) {
            setAnimalsOffset(0);
            getPaginatedPages(0);
            return;
        }

        const pagItemsIndex = pagItems.indexOf(pagItems[page - 1]);
        const currentPagItems = pagItems.slice(pagItemsIndex, fromPage);
        const offset = animalsOffset - animalsLimit * (currentPagItems.length - 1);

        setAnimalsOffset(offset);
        getPaginatedPages(offset);
        localStorage.setItem('current-page', JSON.stringify(page));
    };

    const nextPage = (page) => {
        localStorage.setItem('current-page', JSON.stringify(page));
        const offset = (page * animalsLimit) - animalsLimit;

        setAnimalsOffset(offset);
        getPaginatedPages(offset);
    };

    const handlePagination = async event => {
        const page = +event.target.textContent;

        localStorage.setItem('default-page', JSON.stringify(page));

        if (page < currentPage ) {
            prevPage(page);
        }

        if (page > currentPage) {
            nextPage(page);
        }

        setCurrentPage(page);
    };

    const handleModalOpen = (animal) => {
        setAnimal(animal);
        setModalOpen(true);
    };

    const handleModalClose = () => setModalOpen(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <h1>Животные</h1>
            <Grid container spacing={2} columns={16}>
                {animalsState.error ? <Alert severity="warning">Что-то пошло не так</Alert> : 
                    animalsState.animals.map(animal => 
                    (
                        <Grid item xs={8} key={animal.id}>
                            <Card variant="outlined" key={animal.id}>
                                <Button onClick={() => handleModalOpen(animal)}>{animal.name}</Button>
                                <p>{animal.spec.name}</p>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
            <PaginationBar
             totalAnimals={totalPagination}
             animalsLimit={animalsLimit}
             handlePagination={handlePagination}
            />
            {modalOpen ? <AnimalModal
              open={modalOpen} 
              handleModalClose={handleModalClose}
              animal={animal}
            /> : ''}
        </Box>
    );
};

export default withRouter(Animals);