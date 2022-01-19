import  { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
import { makeStyles  } from '@mui/styles';
import { SiteLink } from '../SiteLink/SiteLink';
import { userError, userSuccess } from '../../redux/actions/actions';
import { auth } from '../../network';
import { AUTH_ERROR, AUTH_SUCCESS } from '../../constants/constants';

const useStyles = makeStyles({
    loginForm: {
      borderRadius: 5,
      maxWidth: 400,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      padding: '30px',
    },
    loginWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: 300
    },
    inputLabel: {
        marginBottom: 10,
    },
});

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const passwordRef = useRef();
    const loginRef = useRef();

    const handleAuth = async () => {
        const user = await auth(
           loginRef.current?.children[0].value,
           passwordRef.current?.children[0].value
        );

        if (!user) {
           dispatch(userError(AUTH_ERROR));
           return;
        }

        dispatch(userSuccess(AUTH_SUCCESS, user.accessToken));
    }

    return (
        <div className={classes.loginWrapper}>
        <h1>Вход</h1>
            <form className={classes.loginForm}>
                <InputLabel className={classes.inputLabel}>
                    <Input
                     ref={loginRef}
                     className={classes.input} 
                     placeholder='Логин' 
                     type='text' 
                     name='login' 
                    />
                </InputLabel>
                <InputLabel className={classes.inputLabel}>
                    <Input
                     ref={passwordRef}
                     className={classes.input} 
                     placeholder='Пароль' 
                     type='password' 
                     name='password'
                    />
                </InputLabel>
                {authState.error && 
                <Typography component="p" sx={{ color: 'red', maxWidth: '250px', margin: '0 auto' }}>
                    Имя пользователя или пароль введены не верно!
                </Typography>}
                <SiteLink
                 url='/today'
                 text='Войти'
                 callback={handleAuth}
                />
            </form>
        </div>
    );
};

export default withRouter(Login);