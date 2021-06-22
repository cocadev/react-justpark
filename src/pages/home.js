import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import Moment from "moment";

import makeStyles from "@material-ui/core/styles/withStyles";
import Rating from "@material-ui/lab/Rating";
import {
  Grid,
  Paper,
  TextField,
  Tabs,
  Tab,
  Button,
  Typography,
  Avatar,
  withWidth,
} from "@material-ui/core";

import SearchBar from "../components/Map/Search bar/SearchBar";
import ListingExplorer from "../components/Map/ListingExplorer";
import Footer from "../components/Layout/footer";

import heroFirst from "../images/hero-first.png";
import heroSecond from "../images/hero-second.png";
import phone from "../images/phone.png";
import appstore from "../images/appstore.svg";
import seamless from "../images/seamless.png";
import map from "../images/map.png";
import creditCard from "../images/credit-card.png";

import "../home.css";

const API_KEY = process.env.REACT_APP_API_KEY;

var m = Moment(new Date());
var startRoundUp =
  m.minute() || m.second() || m.millisecond()
    ? m.add(1, "hour").startOf("hour")
    : m.startOf("hour");

const currentStartDate = Moment(startRoundUp.toString()).format(
  "YYYY-MM-DDTHH:mm"
);
const currentEndDate = Moment(startRoundUp.add(2, "hours").toString()).format(
  "YYYY-MM-DDTHH:mm"
);

const styles = (theme) => ({
  hero: {
    background: "#ffffff",
  },
  heroContent: {
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem 0",
      maxHeight: "650px",
      height: "400px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "2.5rem",
      height: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "2rem 3rem",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "1.5rem 2.5rem",
    },
  },
  heroContentInner: {
    position: "absolute",
    maxWidth: "700px",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 2rem)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    [theme.breakpoints.up("sm")]: {
      position: "static",
    },
    [theme.breakpoints.up("lg")]: {
      float: "right",
      padding: "3rem 1rem 0",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "4rem 1rem 0",
    },
  },
  heroTitle: {
    fontWeight: "800",
    margin: "0 0 10px 0",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "34px",
      lineHeight: "47px",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "2.5rem",
      lineHeight: "56px",
    },
  },
  heroDescriptionDesktop: {
    fontSize: "1rem",
    margin: "0 0 35px 0",
    lineHeight: "25.6px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  heroDescriptionMobile: {
    fontSize: "1rem",
    marginBottom: "35px",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  tabs: {
    position: "relative",
    backgroundColor: "rgba(33, 48, 62, .76)",
    borderRadius: "4px",
    border: "1px solid #21303e",
    color: "#ffffff",
    marginBottom: "0.5rem",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.5)",
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      mixBlendMode: "multiply",
      backgroundColor: "rgba(33,48,62,.76)",
      opacity: ".5",
    },
  },
  tab: {
    minWidth: "unset",
  },
  dateRange: {
    marginTop: "0.5rem",
    padding: "1.2rem 2rem 0.5rem 1rem",
    textTransform: "uppercase",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.3)",
  },
  startDate: {
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      "&::after": {
        content: "''",
        position: "absolute",
        width: "1px",
        top: "14%",
        height: "70%",
        borderRadius: "4px",
        backgroundColor: "#999",
        right: "0",
        zIndex: "1",
        opacity: ".5",
      },
    },
  },
  searchButton: {
    marginTop: "0.5rem",
    padding: "1rem 0",
    fontSize: "18px",
    fontWeight: "700",
    textTransform: "unset",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.5)",
    "&:hover": {
      boxShadow: "0 2px 4px 0 rgba(0,0,0,.5)",
    },
  },
  heroRight: {
    position: "relative",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "300px",
      maxWidth: "400px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "500px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "600px",
    },
  },
  heroImageFirst: {
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)",
    boxShadow: "5px 5px 15px #c4c4c4",
    borderRadius: "20px",
    [theme.breakpoints.up("xs")]: {
      top: "50px",
      width: "250px",
    },
    [theme.breakpoints.up("sm")]: {
      top: "180px",
      width: "280px",
    },
    [theme.breakpoints.up("md")]: {
      top: "150px",
      width: "350px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "450px",
      top: "80px",
    },
  },
  heroImageSecond: {
    position: "absolute",
    boxShadow: "5px 5px 15px #c4c4c4",
    borderRadius: "20px",
    [theme.breakpoints.up("xs")]: {
      right: "40px",
      bottom: "0",
      width: "170px",
    },
    [theme.breakpoints.up("sm")]: {
      right: "15px",
      bottom: "80px",
      width: "150px",
    },
    [theme.breakpoints.up("md")]: {
      right: "0",
      bottom: "30px",
      width: "230px",
    },
    [theme.breakpoints.up("lg")]: {
      bottom: "0",
      width: "280px",
    },
  },
  downloadApp: {
    display: "flex",
    padding: "6rem 0 6rem 12rem",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
      flexWrap: "wrap",
    },
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
  },
  downloadAppImage: {
    display: "inline-block",
    maxWidth: "100%",
    width: "450px",
    verticalAlign: "middle",
    [theme.breakpoints.down("sm")]: {
      width: "350px",
    },
  },
  downloadAppRight: {
    padding: "4rem 0 4rem 6rem",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    flexGrow: "1",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "0",
    },
  },
  downloadAppIcons: {
    margin: "0",
    padding: "0",
    listStyle: "none",
    width: "300px",
    maxWidth: "100%",
  },
  parkingMadeEasy: {
    padding: "0 1.5rem",
    [theme.breakpoints.up("xl")]: {
      padding: "6rem",
    },
  },
  parkingMadeEasyItems: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  parkingMadeEasyItem: {
    flexGrow: "1",
    padding: "0 0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  testimonialTitle: {
    textAlign: "center",
    position: "relative",
    marginBottom: "2rem",
    "&:before": {
      content: "''",
      position: "absolute",
      borderBottom: "4px solid #0f7277",
      width: "2.5rem",
      bottom: "-0.7rem",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  testimonialItem: {
    textAlign: "center",
    margin: "1px 0.75rem",
    padding: "2rem",
  },
  testimonialAvatar: {
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      top: "50%",
      left: "0",
      height: "1px",
      backgroundColor: "#d0d0d0",
    },
  },
});

// This is mock data for testimonials of users. We should replace this data with real one.
const testimonialData = [
  {
    name: "Gemma T",
    location: "Car park on Whiteladies Road, Bristol",
    rating: "5",
    comment:
      "Simple and easy-to-use app, perfect for my commute into work. Saves on stress of having to find a space in the morning in such a difficult area to find parking.",
    avatar:
      "https://static.justpark.com/web/assets/gemma.3131c6080806fff44b4b4fb4e3b9ea57.jpg",
  },
  {
    name: "Richar B",
    location: "Car park on Whiteladies Road, Bristol",
    rating: "5",
    comment:
      "Simple and easy-to-use app, perfect for my commute into work. Saves on stress of having to find a space in the morning in such a difficult area to find parking.",
    avatar:
      "https://static.justpark.com/web/assets/richard.e9ec35633ac63f0ece37d6a1fdffb14d.jpg",
  },
  {
    name: "Jennifier M",
    location: "Car park on Whiteladies Road, Bristol",
    rating: "5",
    comment:
      "Simple and easy-to-use app, perfect for my commute into work. Saves on stress of having to find a space in the morning in such a difficult area to find parking.",
    avatar:
      "https://static.justpark.com/web/assets/jennifer.57f511194c590f34a5b5d20bc3e0dcbe.jpg",
  },
  {
    name: "Marcus F",
    location: "Car park on Whiteladies Road, Bristol",
    rating: "5",
    comment:
      "Simple and easy-to-use app, perfect for my commute into work. Saves on stress of having to find a space in the morning in such a difficult area to find parking.",
    avatar:
      "https://static.justpark.com/web/assets/marcus.2a190b4c45ea719211c5cc658f3483b1.jpg",
  },
  {
    name: "Phil S",
    location: "Car park on Whiteladies Road, Bristol",
    rating: "5",
    comment:
      "Simple and easy-to-use app, perfect for my commute into work. Saves on stress of having to find a space in the morning in such a difficult area to find parking.",
    avatar:
      "https://static.justpark.com/web/assets/phil.584d7b96ed34aaaeab22a127c59c0209.png",
  },
  {
    name: "Carol N",
    location: "Car park on Whiteladies Road, Bristol",
    rating: "5",
    comment:
      "Simple and easy-to-use app, perfect for my commute into work. Saves on stress of having to find a space in the morning in such a difficult area to find parking.",
    avatar:
      "https://static.justpark.com/web/assets/carol.552348b3edcf442054e7a7306e638681.png",
  },
];

class home extends Component {
  constructor(props) {
    super(props);

    let startDate = new Date(currentStartDate);
    let endDate = new Date(currentEndDate);

    this.state = {
      locationSelected: null,
      startDate: startDate,
      endDate: endDate,
      datesValid: false,
      testimonials: testimonialData,
    };
    this.userLocationInputCallback = this.userLocationInputCallback.bind(this);
    this.userDateSelectionCallback = this.userDateSelectionCallback.bind(this);
    this.showParkingPlaces = this.showParkingPlaces.bind(this);
  }

  userDateSelectionCallback = (event) => {
    let date = new Date(event.target.value);
    this.setState(
      {
        [event.target.name]: date,
      },
      () => {
        this.checkDatesValidity();
      }
    );
  };

  checkDatesValidity() {
    const { startDate, endDate } = this.state;

    console.log("start and end dates");
    console.log(startDate);
    console.log(endDate);

    // makes sure both are not null
    if (startDate && endDate) {
      console.log("1");
      if (!(startDate > 0 && endDate > 0)) {
        console.log("2");
        // if startDate and endDate is invalid timestamp
        this.setState({ datesValid: false });
        return false;
      } else if (startDate > endDate) {
        console.log("3");
        // if end date is before start date, not valid
        this.setState({ datesValid: false });
        return false;
      } else if (endDate - startDate < 3600000) {
        console.log("4");
        // if less than an hour, not valid
        this.setState({ datesValid: false });
        return false;
      } else {
        // valid, sets datesValid to true, otherwise map doesn't initially load
        this.setState({ datesValid: true });
        return true;
      }
    } else {
      // if startDate || endDate == null, user hasn't picked anything yet
      this.setState({ datesValid: false });
      return false;
    }
  }

  // sends request to google places details api in order to turn
  // place id from user selection into gps location for the map
  userLocationInputCallback(location) {
    axios
      .get("/maps/api/place/details/json?", {
        params: {
          place_id: location.placeId,
          key: API_KEY,
          language: "en",
        },
      })
      .then((response) => {
        let lat = response.data.result.geometry.location.lat;
        let lng = response.data.result.geometry.location.lng;
        this.setState({
          locationSelected: {
            lat: lat,
            lng: lng,
            address: location.name,
            placeId: location.placeId,
          },
        });
      })
      .catch((err) => {
        console.log(`error getting place details: ${err}`);
      });

    this.checkDatesValidity();
  }

  showParkingPlaces() {
    const { locationSelected, startDate, endDate, datesValid } = this.state;

    console.log("missing check");
    console.log(locationSelected);
    console.log(startDate);
    console.log(endDate);
    console.log(datesValid);

    if (!locationSelected || !datesValid) {
      alert(
        "Selected location and dates are invalid. Please select all data again."
      );
      console.log("Invalid data");

      return;
    }

    this.props.history.push({
      pathname: "/search",
      state: {
        locationSelected: locationSelected,
        startDate: startDate,
        endDate: endDate,
        datesValid: datesValid,
      },
    });
  }

  renderSearchBar() {
    return (
      <div id="search_bar_container" style={{ marginTop: "100px" }}>
        <SearchBar
          parentCallback={(location) => {
            this.userLocationInputCallback(location);
          }}
        />
      </div>
    );
  }

  renderDateTimePicker() {
    const { classes } = this.props;

    console.log("rounded");

    console.log(currentStartDate);
    console.log(currentEndDate);

    return (
      <>
        <Grid>
          <Grid item xs={12}>
            <Tabs
              value="hour-day"
              variant="fullWidth"
              indicatorColor="primary"
              aria-label="Hourly / Monthly"
              className={classes.tabs}
            >
              <Tab
                label="HOURLY / DAILY"
                value="hour-day"
                className={classes.tab}
              />
              <Tab label="MONTHLY" value="month" className={classes.tab} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.3)" }}>
              <SearchBar
                parentCallback={(location) => {
                  this.userLocationInputCallback(location);
                }}
              />
            </Paper>
          </Grid>
          <Paper className={classes.dateRange}>
            <form noValidate>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} className={classes.startDate}>
                  <TextField
                    id="Start"
                    name="startDate"
                    label="Arriving On"
                    type="datetime-local"
                    fullWidth={true}
                    defaultValue={currentStartDate}
                    onChange={this.userDateSelectionCallback}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: { fontWeight: "700" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="End"
                    name="endDate"
                    label="Leaving On"
                    type="datetime-local"
                    fullWidth={true}
                    defaultValue={currentEndDate}
                    onChange={this.userDateSelectionCallback}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: { fontWeight: "700" },
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Button
          className={classes.searchButton}
          variant="contained"
          color="primary"
          fullWidth={true}
          size="large"
          onClick={this.showParkingPlaces}
        >
          Show parking spaces
        </Button>
      </>
    );
  }

  heroRender() {
    const { classes, width } = this.props;

    return (
      <div className={classes.hero}>
        <Grid container direction={width === "xs" ? "row" : "row-reverse"}>
          <Grid item xs={12} sm={6}>
            <div className={classes.heroRight}>
              <img
                src={heroFirst}
                className={classes.heroImageFirst}
                alt="hero first"
              />
              <img
                src={heroSecond}
                className={classes.heroImageSecond}
                alt="hero second"
              />
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className={classes.heroContent}>
              <div className={classes.heroContentInner}>
                <h1 className={classes.heroTitle}>Find parking in seconds</h1>
                <p className={classes.heroDescriptionMobile}>
                  Choose from millions of spaces
                </p>
                <p className={classes.heroDescriptionDesktop}>
                  Choose from millions of available spaces, or reserve your
                  space in advance. Join over 5.5 million drivers enjoying easy
                  parking.
                </p>
                {this.renderDateTimePicker()}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  downloadAppRender() {
    const { classes } = this.props;

    return (
      <div className={classes.downloadApp}>
        <img
          className={classes.downloadAppImage}
          src={phone}
          alt="device shot"
        />
        <div className={classes.downloadAppRight}>
          <h2>There is more to live the app</h2>
          <div>
            <p>Reminder for when your booking ends</p>
            <p>Never run the risk of fines</p>
          </div>
          <div>
            <p>Apple and Google Pay supported</p>
            <p>
              Pay using Google or Apple Pay for convenience and speed. You’ll
              receive a receipt like normal.
            </p>
          </div>
          <div>
            <p>Extend if you need more time</p>
            <p>If you need to extend your booking you can!</p>
          </div>
          <div>
            <ul className={classes.downloadAppIcons}>
              <li style={{ width: "50%", display: "inline-block" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://apps.apple.com/us/app/prked-1-car-parking-app/id1483160216"
                  style={{ display: "block", paddingRight: "0.2rem" }}
                >
                  <img
                    src={appstore}
                    alt="AppStore"
                    style={{ width: "100%", maxWidth: "140px" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  parkingMadeEasyRender() {
    const { classes } = this.props;

    return (
      <div className={classes.parkingMadeEasy}>
        <Typography variant="h4" color="primary" align="center">
          Parking Made Easy
        </Typography>
        <div className={classes.parkingMadeEasyItems}>
          <div className={classes.parkingMadeEasyItem}>
            <img
              src={map}
              width="100%"
              height="100%"
              style={{ maxWidth: "250px" }}
              alt="Wherever, whatever"
            />
            <Typography variant="h5" color="primary" align="center">
              Wherever, whatever
            </Typography>
            <p>Choose from millions of spaces across the UK</p>
            <p>Find your best option for every car journey</p>
          </div>
          <div className={classes.parkingMadeEasyItem}>
            <img
              src={creditCard}
              width="100%"
              height="100%"
              style={{ maxWidth: "250px" }}
              alt="Peace of mind"
            />
            <Typography variant="h5" color="primary" align="center">
              Peace of mind
            </Typography>
            <p>View information on availability, price and resrcitions</p>
            <p>Reserve in advance at over 45,000+ locations</p>
          </div>
          <div className={classes.parkingMadeEasyItem}>
            <img
              src={seamless}
              width="100%"
              height="100%"
              style={{ maxWidth: "250px" }}
              alt="Seamless experience"
            />
            <Typography variant="h5" color="primary" align="center">
              Seamless experience
            </Typography>
            <p>Pay for Prked spaces via the app or website</p>
            <p>Follow easy directions and access instructions</p>
          </div>
        </div>
      </div>
    );
  }

  testimonialRender() {
    const { testimonials } = this.state;
    const { classes, width } = this.props;
    const centerSlidePercentages = {
      xs: 100,
      sm: 55,
      md: 45,
      lg: 38,
      xl: 30,
    };

    return (
      <div
        style={{
          backgroundColor: "#f8f9fb",
          padding: "6rem 1rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" className={classes.testimonialTitle}>
          What <b>users</b> are saying
        </Typography>
        <p style={{ maxWidth: "500px", margin: "0 auto 2rem" }}>
          Don't just take our word for it - check out some of the latest
          customer reviews for our parking spaces
        </p>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          autoPlay={false}
          emulateTouch
          infiniteLoop
          centerMode
          centerSlidePercentage={centerSlidePercentages[width]}
        >
          {testimonials.map((item) => {
            return (
              <Paper className={classes.testimonialItem}>
                <p>{item.comment}</p>
                <div className={classes.testimonialAvatar}>
                  <Avatar
                    src={item.avatar}
                    style={{
                      margin: "30px auto",
                      width: "70px",
                      height: "70px",
                    }}
                    alt="Avatar"
                  />
                </div>
                <div>{item.name}</div>
                <div>{item.location}</div>
                <div>
                  <Rating value={item.rating} readOnly />
                </div>
              </Paper>
            );
          })}
        </Carousel>
      </div>
    );
  }

  // the render after user has initially selected a location
  mainRender() {
    return (
      <div>
        {this.renderDateTimePicker()}
        <ListingExplorer
          chosenLocation={this.state.locationSelected}
          timeDelta={this.state.endDate - this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
      </div>
    );
  }

  render() {
    <p>Loading...</p>;

    // if (!this.state.locationSelected) {
    // comment next line and uncomment ^ so it starts without valid date for testing

    if (!this.state.locationSelected || !this.state.datesValid) {
      //return this.renderDateTimePicker();
      return (
        <>
          {this.heroRender()}
          {this.downloadAppRender()}
          {this.parkingMadeEasyRender()}
          {this.testimonialRender()}
          <Footer />
        </>
      );
    } else {
      //this.props.history.push("/search");
      let address = this.state.locationSelected.address;
      let lat = this.state.locationSelected.lat;
      let lng = this.state.locationSelected.lng;
      let id = this.state.locationSelected.placeId;
      this.props.history.push({
        pathname: "/search",
        //search: `?lat=${lat}&long=${long}&place_id=${id}&arriving=${this.state.startDate}&leaving=${this.state.endDate}`,
        search: `?lat=${lat}&lng=${lng}&place_id=${id}&address=${address}&arriving=${this.state.startDate}&leaving=${this.state.endDate}`,
        state: {
          locationSelected: this.state.locationSelected,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          datesValid: this.state.datesValid,
        },
      });
      return (
        <>
          {this.heroRender()}
          {this.downloadAppRender()}
          {this.parkingMadeEasyRender()}
          {this.testimonialRender()}
          <Footer />
        </>
      );
    }
  }
}

export default withWidth()(makeStyles(styles)(home));
