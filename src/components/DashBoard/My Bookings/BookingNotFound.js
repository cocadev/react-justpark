import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  notFound: {
    marginTop: 30,
    minHeight: 600,
    border: '1px solid #cdd3db',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#999',
    fontSize: '.7rem',
    lineHeight: 0.1,
    '& img': {
      width: 160,
      height: 160
    }
  },
  notTitle: {
    marginTop: 32,
    fontWeight: '600',
    fontSize: '1rem'
  }
}));

function BookingNotFound(props) {
  const classes = useStyles();
  const { title } = props;
  return (
    <div className={classes.notFound}>
      <img src={'https://static.justpark.com/web/assets/no-results.a2ceff043344599215423c8f3f11ac66.png'} alt={'no bookings'} />
      <p className={classes.notTitle}>No bookings found</p>
      <p>{title} bookings will appear here</p>
    </div>
  )
}

export default BookingNotFound;