import React from 'react';

// MUI components
import { makeStyles } from "@mui/styles";
import PlayIcon from '@mui/icons-material/PlayArrow';

// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Parallax from "../components/Parallax/Parallax.js";

import styles from "../assets/jss/helper/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import WorkSection from "./Sections/WorkSection.js";

import landingImg from '../assets/img/landing-bg.jpg';

const useStyles = makeStyles(styles);

const Home = (props) => {
  const classes = useStyles();
 
  return (
    <>
      <Parallax filter image={landingImg}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayIcon sx={{ color: '#fff' }} size='large'/>
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <WorkSection />
        </div>
      </div>
    </>
  );
}

export default Home;
