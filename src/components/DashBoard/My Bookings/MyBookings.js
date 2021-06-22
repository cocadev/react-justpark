import React, { Component } from "react";
import InProgress from "./InProgress";
import Past from "./Past";
import Upcoming from "./Upcoming";
import { Tabs, Tab, withStyles, Container } from "@material-ui/core";
import { connect } from "react-redux";
import CustomText from "../../Atom/CustomText";

const styles = () => ({
  tabs: {
    borderBottom: '1px solid #cdd3db'
  },
  tab: {
    textTransform: 'none',
    maxWidth: 120,
    fontSize: 16
  },
});

class MyBookings extends Component {
  state = {
    tabValue: 0,
  };
  mapUserDetailsToState = () => { };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;
    const handleTabsChange = (event, newValue) => {
      this.setState({ tabValue: newValue });
    };
    return (
      <Container style={{marginTop: 40 }}>
        <CustomText type={'title'} title={'My Bookings'}/><br/>
        <Tabs
          value={tabValue}
          onChange={handleTabsChange}
          variant="fullWidth"
          indicatorColor="primary"
          aria-label="In progress"
          className={classes.tabs}
        >
          <Tab label="In progress" {...a11yProps(0)} className={classes.tab} />
          <Tab label="Upcoming" {...a11yProps(1)} className={classes.tab} />
          <Tab label="Past" {...a11yProps(2)} className={classes.tab} />
        </Tabs>
        <TabPanel value={tabValue} index={0} >
          <InProgress userId={this.props.userId} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Upcoming userId={this.props.userId} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Past userId={this.props.userId} />
        </TabPanel>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  booking: state.booking,
});

function a11yProps(index) {
  return {
    id: `listings-tab-${index}`,
    "aria-controls": `listings-tabpanel-${index}`,
  };
}

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

export default connect(mapStateToProps)(withStyles(styles)(MyBookings));
