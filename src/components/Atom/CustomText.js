import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Nunito,Avenir,sans-serif',
    // lineHeight: 1.6,
    color: '#212121',
    fontWeight: 400,
    textRendering: 'optimizeLegibility'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: 12
  },
  description: {
    color: '#999',
    fontSize: '.8rem',
    lineHeight: 1.5
  },
  formTitle: {
    color: '#3e3e3e',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 1.8
  }
}));

function CustomText(props) {
  const { title, type, mt } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, classes[type])} style={{ marginTop: mt ? mt : 0}}>
      {title}
    </div>
  );
}

export default CustomText;
