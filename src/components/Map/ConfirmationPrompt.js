import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSpaceData } from "../../redux/actions/dataActions";
import SpotTripInfo from "./SpotTripInfo";
import CloseIcon from '@material-ui/icons/Close';
import { Tabs, Tab, withStyles } from "@material-ui/core";
import heroFirst from "../../images/c.png";

const styles = () => ({
  tabs: {
    borderBottom: '1px solid #cdd3db',
  },
  tab: {
    textTransform: 'none',
    width: 120,
    minWidth: 120,
    fontSize: 13
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 12,
    fontFamily: 'Nunito, Avenir, sans-serif',
    background: '#fff',
  },
  bgImg: {
    height: 130,
    width: 160,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 8
  },
});

class ConfirmationPrompt extends React.Component {
  constructor(props) {
    super(props);

    console.log(`props into confirmation prompt`);
    console.log(props);
    this.state = {
      userId: props.userId,
      spotId: props.spotId,
      timeDelta: props.timeDelta,
      price: props.price,
      spot: props.spot,
      startDate: props.startDate,
      endDate: props.endDate,
      tabValue: 0,
      more: false
    };
  }

  displayHumanReadableDate(date) {
    let hours = date.getHours();
    let pm = "AM";
    if (hours >= 12) {
      pm = "PM";
      hours = hours - 12;
    }
    return `${date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}  ${hours}:${date.getMinutes()} ${pm}`;
  }

  handleConfirm = (event) => {
    this.props.setSpaceData(this.props, this.props.history);
  };

  render() {
    const { classes, mobile } = this.props;
    const { tabValue, more } = this.state;
    const handleTabsChange = (event, newValue) => {
      this.setState({ tabValue: newValue });
    };
    return (
      <div
        id="confirmationPrompt"
        style={{
          backgroundColor: "#fff",
          borderRadius: 4,
          margin: mobile ? 0 : 10,
          padding: 12,
          marginTop: mobile ? 0 : -40,
          height: mobile ? 820 : '100%',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container style={{ }}>
              <Grid item xs={5}></Grid>
              {/*<Grid item xs={7}>
                {this.state.spot.street_number} {this.state.spot.street_name}
      </Grid>*/}
              <CloseIcon style={{ position: 'absolute', top: 18, right: 18 }} onClick={() => {
                this.props.cancelCallback();
              }} />
              <Grid item xs={5}></Grid>

              <Grid item xs={12} style={{ fontSize: 11 }}>
                <br />
                <span style={{ color: '#0f7277', fontSize: 12, fontWeight: '600' }}>RESERVABLE</span>&nbsp;
                <span style={{ fontWeight: '600' }}>{this.state.spot.spot_name}</span>&nbsp;


                {this.state.spot.city} {this.state.spot.state}
                {", "}
                {this.state.spot.postal_code}
                <br /><br />

                <img src="https://static.justpark.com/web/assets/star_gradient.75024a73aacaf3b77173356d2786e03b.svg" />
                <img src="https://static.justpark.com/web/assets/star_gradient.75024a73aacaf3b77173356d2786e03b.svg" />
                <img src="https://static.justpark.com/web/assets/star_gradient.75024a73aacaf3b77173356d2786e03b.svg" />
                <img src="https://static.justpark.com/web/assets/star_gradient.75024a73aacaf3b77173356d2786e03b.svg" />
                <img src="https://static.justpark.com/web/assets/star_gradient.75024a73aacaf3b77173356d2786e03b.svg" />
                <span>(1,818)</span>
                <br />
              </Grid>
            </Grid>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 11, justifyContent: 'space-between', padding: 3 }}>
              <div>
                Parking from <br />
                <span style={{ fontSize: 14, fontWeight: '600', lineHeight: 1.7 }}>
                  {this.displayHumanReadableDate(this.state.startDate)}
                </span>
              </div>
              <img src="https://static.justpark.com/web/assets/arrow_right_short.dc2fef277bd6adc401b9007b9765d345.svg" />

              <div>
                Parking until< br />
                <span style={{ fontSize: 14, fontWeight: '600', lineHeight: 1.7 }}>
                  {this.displayHumanReadableDate(this.state.endDate)}
                </span>
              </div>
            </div>

            <br />
            <SpotTripInfo
              price={Number.parseFloat(this.state.price).toPrecision(4)}
            ></SpotTripInfo>
            
          </Grid>

          <Tabs
            value={tabValue}
            onChange={handleTabsChange}
            // variant="fullWidth"
            indicatorColor="primary"
            aria-label="Information"
            className={classes.tabs}
          >
            <Tab label="Information" {...a11yProps(0)} className={classes.tab} />
            <Tab label="Reviews" {...a11yProps(1)} className={classes.tab} />
            <Tab label="How to Park" {...a11yProps(2)} className={classes.tab} />
          </Tabs>
          <TabPanel value={tabValue} index={0} >
            <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: 490 }}>
              <br />
              <div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', background: '#eef9ff', padding: 16, color: '#2f9fed', fontWeight: '700', fontSize: 16 }}>
                  <img
                    src={heroFirst}
                    style={{ width: 20, height: 20, marginRight: 27, marginLeft: 7 }}
                    alt="hero first"
                  />
                  <div style={{ lineHeight: 1.8 }}>
                    Inside Congestion Charge Zone £15 per day. Click here to learn how to pay this.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 11, lineHeight: 3, padding: '25px 1px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 90 }}>
                  <img src='https://static.justpark.com/web/assets/is_sheltered.de41d105c2c3fe43bf621e7d4492dd16.svg' />
                  <div>Sheltered</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 90 }}>
                  <img src='https://static.justpark.com/web/assets/has_security_guards.6722c1c1f80704810005da391a36262c.svg' />
                  <div>Guarded</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 90 }}>
                  <img src='https://static.justpark.com/web/assets/has_cctv.e9c9de8e52a4148f21fa215e205d135a.svg' />
                  <div>CCTV</div>
                </div>
              </div>

              <div style={{ fontSize: 13 }}>
                This car park is within the Congestion Charging Zone.
                <br /><br />
                Please not: due to a pillar and the shutter system the entrance to the car park is narrow and so is only suitable for small vehicles.<br /><br />

                <div onClick={() => this.setState({ more: !more })} style={{ color: '#0f7277', cursor: 'pointer' }}>Read {!more ? 'more' : 'less'} &nbsp;
                  <img src={!more ? 'https://static.justpark.com/web/assets/arrow_down.8cc77bd81836246bc46bbef4768c59cc.svg' : 'https://static.justpark.com/web/assets/arrow_up.ef0fbbe4b4d9d62b38e4d2455de28baa.svg'} />
                </div>

                {more && <div><br />
                  Entry height restriction is 2m, internal height in some places as low as (1.4m).<br /><br />

                  This space is not recommended for larger cars and vehicles.The car park is on level ground, with no steps. <br />Please ensure to input your vehicle registration at time of booking or you may be liable to a parking charge notice.<br /><br />
                  Monday - Saturday<br />
                  06:00 - 23:59<br />
                  Up to 1 hour - £4.20<br />
                  1 hour to 2 hours - £6.40<br />
                  2 hours to 3 hours - £8.60<br />
                  3 hours to 4 hours - £10.80<br />
                  Over 4 hours - £14.50<br />
                  Weekly - £99.00<br /><br />

                  Sunday - Sunday<br />
                  07:00 - 23:59<br />
                  Up to 1 hour - £3.70<br />
                  1 hour to 2 hours - £5.40<br />
                  2 hours to 3 hours - £7.10<br />
                  3 hours to 4 hours - £8.10<br />
                  Over 4 hours - £10.50<br /><br />

                  Monday - Saturday<br />
                  06:00 - 23:59<br />
                  Up to 1 hour - £4.20<br />
                  1 hour to 2 hours - £6.40<br />
                  2 hours to 3 hours - £8.60<br />
                  3 hours to 4 hours - £10.80<br />
                  Over 4 hours - £14.50<br />
                  Weekly - £99.00<br />

                  Sunday - Sunday <br /><br />
                  07:00 - 23:59<br />
                  Up to 1 hour - £3.70<br />
                  1 hour to 2 hours - £5.40<br />
                  2 hours to 3 hours - £7.10<br />
                  3 hours to 4 hours - £8.10<br />
                  Over 4 hours - £10.50 <br />
                </div>}
                <br />
              </div>
              <br />
              <div style={{ border: '1px solid #333', borderRadius: 4, padding: 9, fontSize: 13, fontWeight: '500', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src='https://static.justpark.com/web/assets/streetview-dark.d0dacb6d2e6d7edbea935da98342245e.svg' /> &nbsp;
                View streetview
              </div>

              <Grid container className={classes.row}>
                <img className={classes.bgImg} src={'https://uploads.justpark.com/cdn/media/uploaded/listing-photos/5ab0dea7a37fe-normal.jpg'} />
                <img className={classes.bgImg} style={{marginRight: 0}} src={'https://uploads.justpark.com/cdn/media/uploaded/listing-photos/5ab0deaabae00-normal.jpg'} />
              </Grid>

              <br />
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <div>
              2
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <div>
              3
            </div>
          </TabPanel>

          {/* <Grid item xs={5}>
            <p style={{ textAlign: "right", marginRight: "2ch" }}>
              Total price
            </p>
          </Grid>
          <Grid item xs={7}>
            <p>${Number.parseFloat(this.state.price).toPrecision(4)}</p>
          </Grid>
          <Grid item xs={5}>
            <p style={{ textAlign: "right", marginRight: "2ch" }}>Start Date</p>
          </Grid>
          <Grid item xs={7}>
            <p>{this.displayHumanReadableDate(this.state.startDate)}</p>
          </Grid>
          <Grid item xs={5}>
            <p style={{ textAlign: "right", marginRight: "2ch" }}>End Date</p>
          </Grid>
          <Grid item xs={7}>
            <p>{this.displayHumanReadableDate(this.state.endDate)}</p>
          </Grid> */}
          <Button
            style={{ width: "100%", marginLeft: "auto", marginTop: 8 }}
            variant="contained"
            color="primary"
            onClick={this.handleConfirm}
          >
            Reserve for $0. 00
          </Button>

        </Grid>
      </div>
    );
  }
}

ConfirmationPrompt.propTypes = {
  setSpaceData: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  setSpaceData,
};

const mapStateToProps = (state) => ({
  listing: state.listing,
});

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ConfirmationPrompt))
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`listings-tabpanel-${index}`}
      aria-labelledby={`listings-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `listings-tab-${index}`,
    "aria-controls": `listings-tabpanel-${index}`,
  };
}