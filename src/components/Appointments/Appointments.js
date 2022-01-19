import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from 'moment';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import { getAnimalAppointments } from "../../network";
import { appointmentsError, appointmentsSuccess } from "../../redux/actions/actions";
import { APPOINTMENTS_ERROR, APPOINTMENTS_SUCCESS } from "../../constants/constants";
import { AnimalModal } from "../AnimalModal/AnimalModal";

const Appointments = () => {
    const authState = useSelector(state => state.auth);
    const appointmentsState = useSelector(state => state.appointments);
    const [modalOpen, setModalOpen] = useState(false);
    const [appointment, setAppointment] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        animalAppointments();
    }, []);

    const animalAppointments = async () => {
        const appointments = await getAnimalAppointments(authState.user);

        if (!appointments) {
            dispatch(appointmentsError(APPOINTMENTS_ERROR));
            window.location.reload();
            return;
        }

        dispatch(appointmentsSuccess(APPOINTMENTS_SUCCESS, appointments.results));
    };

    const handleModalOpen = (appointment) => {
        setAppointment(appointment);
        setModalOpen(true);
    };
    const handleModalClose = () => setModalOpen(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <h1>Назначения на сегодня</h1>
            <Grid container item spacing={2} columns={16}>
                {appointmentsState.error ? <Alert severity="warning">Что-то пошло не так</Alert> : 
                appointmentsState.appointments.map(appointment => 
                     (
                        <Grid item xs={8} key={appointment.id}>
                            <Card variant="outlined" key={appointment.id}>
                            <Button onClick={() => handleModalOpen(appointment.animal)}>{appointment.animal.name}</Button>
                                <p>{appointment.type}</p>
                                <p>{appointment.animal.spec.name}</p>
                                <p>{moment(appointment.time, 'HH:mm').format('HH:mm')}</p>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
            {modalOpen ? <AnimalModal
             open={modalOpen} 
             handleModalClose={handleModalClose}
             animal={appointment}
            /> : ''}
        </Box>
    );
};

export default withRouter(Appointments);