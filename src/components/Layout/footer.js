import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container, Typography, withStyles } from "@material-ui/core";

import style from "./footer.module.scss";
import logo from "../../images/logo.png";

const styles = (theme) => ({
  footerContent: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      "& > div": {
        textAlign: "center",
        margin: "10px 0",
      },
    },
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={style.footer}>
        <Container>
          <div className={`${style.footer__content} ${classes.footerContent}`}>
            <div>
              <Link to="/">
                <img src={logo} width="200" height="80" alt="Logo" />
              </Link>
              <p>Pakring when you need it</p>
              <p>Extra income when you don't</p>
            </div>
            <div>
              <Typography variant="h6">Our Services</Typography>
              <ul>
                <li>
                  <Link onClick={() => window.scrollTo(0, 0)}>
                    Find Parking
                  </Link>
                </li>
                <li>
                  <Link>Start Hosting</Link>
                </li>
                <li>
                  <Link>Prked for Business</Link>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h6">Resources</Typography>
              <ul>
                <li>
                  <a target="_blank" href="https://prked.zendesk.com/hc/en-us" rel="noreferrer">
                    FAQ's
                  </a>
                </li>
                <li>
                  <Link>Press</Link>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h6">Our Policies</Typography>
              <ul>
                <li>
                  <Link to="/privacy-policy" color="primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            CopyRight © {new Date().getFullYear()} Prked. All rights reserved.
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
