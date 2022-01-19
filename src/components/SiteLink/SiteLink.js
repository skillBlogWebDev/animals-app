import { makeStyles  } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        '&:not(:last-child)': {
            marginRight: 10
        },
        display: 'inline-block',
        textDecoration: 'none',
        justifySelf: 'center',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '15px 30px',
    },
    preloader: {
        width: 5,
        height: 5,
    }
  });

export const SiteLink = ({ text, url, callback }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.button} 
            to={url}
            onClick={() => callback()}
            >
            {text}
        </Link>
    );
}