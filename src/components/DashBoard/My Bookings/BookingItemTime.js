import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  borderline2: {
    position: 'absolute',
    marginTop: 1
  },
  field: {
    marginLeft: 30
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    background: '#d8d8d8'
  },
  dotline: {
    width: 12,
    height: 30,
    marginLeft: 5,
    borderLeft: '2px dotted #d8d8d8'
  },
  date: {
    background: '#f5f5f7',
    padding: '8px 18px',
    borderRadius: 25,
  },
}));

function BookingItemTime(props) {
  const { from, to, left } = props;
  const classes = useStyles();
  return (
    <div className={classes.field}>
      <div className={classes.borderline2} style={{ left: left ? 27: 1}}>
        <div className={classes.dot} />
        <div className={classes.dotline} />
        <div className={classes.dot} />
      </div>
      <span>From </span> <span className={classes.date}>{from}</span> <br /><br />
      <span style={{ marginRight: 3 }}>Until</span> <span className={classes.date}>{to}</span>
    </div>
  );
}

export default BookingItemTime;
