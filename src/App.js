import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

//Components
import Navbar from "./components/Navbar";

//HOC
import Layout from "./components/Layout/layout";

//Pages
import FirebaseAuth from "./components/Auth/FirebaseUI";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import MyProfile from "./pages/myProfile";
import MyBookings from "./pages/myBookings";
import MyVehicles from "./pages/myVehicles";
import BookingInfo from "./pages/bookingInfo";
import MyPaymentMethods from "./pages/myPaymentMethods";
import Checkout from "./pages/checkout";
import MapPage from "./pages/mapPage";
import StreetView from "./pages/streetview";
import TermsAndConditions from "./pages/termsAndConditions.js";
import PrivacyPolicy from "./pages/privacyPolicy.js";

const theme = createMuiTheme(themeFile);

class App extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Prked - The Parking App | Find parking in seconds</title>
        </Helmet>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router>
                <Route exact path="/streetview" component={StreetView} />
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/auth/login" component={FirebaseAuth} />
                  <Route exact path="/registration" component={FirebaseAuth} />
                  <Route exact path="/search" component={MapPage} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route
                    exact
                    path="/dashboard/profile"
                    component={Layout(MyProfile)}
                  />
                  <Route exact path="/checkout" component={Checkout} />

                  <Route
                    exact
                    path="/dashboard/bookings"
                    component={Layout(MyBookings)}
                  />

                  <Route
                    exact
                    path="/dashboard/vehicles"
                    component={Layout(MyVehicles)}
                  />

                  {/* <Route exact path="/vehicles" component={MyVehicles} /> */}
                  <Route exact path="/bookinginfo" component={BookingInfo} />
                  <Route
                    exact
                    path="/paymentmethods"
                    component={Layout(MyPaymentMethods)}
                  />
                  <Route
                    exact
                    path="/terms-and-conditions"
                    component={TermsAndConditions}
                  />
                  <Route
                    exact
                    path="/privacy-policy"
                    component={PrivacyPolicy}
                  />
                </Switch>
              </Router>
            </PersistGate>
          </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
