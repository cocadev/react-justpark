import React, { Component } from "react";
import axios from "axios";

import { Grid, Button, Paper, withStyles } from "@material-ui/core";
import SearchBar from "../components/Map/Search bar/SearchBar";
import ListingExplorer from "../components/Map/ListingExplorer";
import CalendarSelector from "../components/Map/Search bar/CalendarSelector";
import Moment from "moment";
import "../home.css";
import {
  TextField,
} from "@material-ui/core";

const API_KEY = process.env.REACT_APP_API_KEY;
const currentDate = Moment(new Date()).format("YYYY-MM-DDTHH:mm");

const styles = (theme) => ({
  label: {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(0, 0, 0, .54)",
    lineHeight: 1,
  },
  searchButton: {
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 12,
    width: 120
  },
});

class mapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationSelected: null,
      startDate: null,
      endDate: null,
      datesValid: true,
    };
    this.listingExplorerComponent = React.createRef();
    this.state = this.props.location.state;
    this.userLocationInputCallback = this.userLocationInputCallback.bind(this);
    this.userDateSelectionCallback = this.userDateSelectionCallback.bind(this);
  }

  handleClick = () => {
    this.listingExplorerComponent.current.changeTime(
      this.state.startDate,
      this.state.endDate
    );
  };

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
    // makes sure both are not null
    if (startDate && endDate) {
      if (!(startDate > 0 && endDate > 0)) {
        // if startDate and endDate is invalid timestamp
        return false;
      } else if (startDate > endDate) {
        // if end date is before start date, not valid
        return false;
      } else if (endDate - startDate < 3600000) {
        // if less than an hour, not valid
        return false;
      } else {
        // valid, sets datesValid to true, otherwise map doesn't initially load
        this.setState({ datesValid: true });
        this.listingExplorerComponent.current.changeTime(startDate, endDate);
        return true;
      }
    } else {
      // if startDate || endDate == null, user hasn't picked anything yet
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
        this.listingExplorerComponent.current.changeTime(
          this.state.startDate,
          this.state.endDate
        );
      })
      .catch((err) => {
        console.log(`error getting place details: ${err}`);
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

  renderDateTimePickerOld() {
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar
            value={this.state.locationSelected.address}
            parentCallback={(location) => {
              this.userLocationInputCallback(location);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <TextField
              id="Start"
              name="startDate"
              label="Arriving On"
              type="datetime-local"
              fullWidth={true}
              defaultValue={currentDate}
              onChange={this.userDateSelectionCallback}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { fontWeight: "700" },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <label className={classes.label}>End: </label>
            <CalendarSelector
              start={false}
              parentCallback={(date, start) => {
                this.userDateSelectionCallback(date, start);
              }}
              selectedTime={this.state.endDate}
            />
          </Paper>
        </Grid>
        <Button onClick={this.handleClick}>button</Button>
      </Grid>
    );
  }

  renderDateTimePicker() {
    const { classes } = this.props;

    let startDate = Moment(new Date(this.state.startDate)).format(
      "YYYY-MM-DDTHH:mm"
    );
    let endDate = Moment(new Date(this.state.endDate)).format(
      "YYYY-MM-DDTHH:mm"
    );

    return (
      <Paper style={{ padding: "0 10px" }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <SearchBar
              value={this.state.locationSelected.address}
              parentCallback={(location) => {
                this.userLocationInputCallback(location);
              }}
            />
          </Grid>
          <form noValidate>
            <Grid container spacing={2} style={{marginTop: 0}}>
              <Grid item xs={12} sm={6} className={classes.startDate}>
                <TextField
                  id="Start"
                  variant="outlined"
                  name="startDate"
                  label="Arriving On"
                  type="datetime-local"
                  fullWidth={true}
                  defaultValue={startDate}
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
                  variant="outlined"
                  name="endDate"
                  label="Leaving On"
                  type="datetime-local"
                  fullWidth={true}
                  defaultValue={endDate}
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
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              size="large"
              className={classes.searchButton}
              onClick={this.handleClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  // the render after user has initially selected a location
  mainRender() {
    return (
      <>
        {this.renderDateTimePicker()}
        <ListingExplorer
          ref={this.listingExplorerComponent}
          chosenLocation={this.state.locationSelected}
          timeDelta={this.state.endDate - this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        ></ListingExplorer>
      </>
    );
  }

  render() {
    <p>Loading...</p>;

    // if (!this.state.locationSelected) {
    // comment next line and uncomment ^ so it starts without valid date for testing

    if (!this.state.locationSelected || !this.state.datesValid) {
      return this.renderDateTimePicker();
    } else {
      return this.mainRender();
    }
  }
}

export default withStyles(styles)(mapPage);
