import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import CustomText from "../../Atom/CustomText";
import BookingItemTime from "./BookingItemTime";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  phoneNumGrid: {
    top: "20px",
  },
  containerRoot: {
    background: "white",
  },
  booking: {
    background: '#fff',
    marginTop: 12,
    padding: '30px 20px',
    boxShadow: '0 3px 4px 0 hsl(0deg 0% 59% / 30%)',
    color: '#3e3e3e',
    borderRadius: 4,
    fontWeight: '500',
    position: 'relative'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  borderline: {
    width: 5,
    height: 60,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    background: '#999',
    position: 'absolute',
    left: 0,
    marginTop: -8
  },
});

class BookingItem extends Component {
  state = {
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  };
  mapUserDetailsToState = (user) => {
    this.setState({
      email: user.email ? user.email : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      displayName: user.displayName ? user.displayName : "",
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Link
          to={{
            pathname: "/bookinginfo",
            state: { foo: this.props.bookingKey },
          }}
        >
          <div className={classes.booking}>
            <div className={classes.row}>
              <div>
                <div className={classes.borderline} />
                <CustomText title={this.props.listingName} type="title" />
                <CustomText title={this.props.address} type="description" mt={-10} />
              </div>
              <CustomText title={this.props.price} type="formTitle" />
            </div>
            <br/><br/>

            <BookingItemTime
              from={this.props.displayStartTime}
              to={this.props.displayEndTime}
              left={true}
            />

          </div>
        </Link>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

BookingItem.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(BookingItem));
