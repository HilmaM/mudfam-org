import * as React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

// core components
import buttonStyle from "../../assets/jss/material-kit-react/buttonStyle.js";

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle
}));

const LoadingButton = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    progress,
    success,
    ...rest
  } = props;

  const classes = makeComponentStyles();

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [classes.buttonSuccess]: success,
    [className]: className
  });
  return (
    <div className={classes.buttonRoot}>
      <div className={classes.buttonWrapper}>
        <Button
          {...rest}
          ref={ref} 
          className={btnClasses}
        >
          {children}
        </Button>
        {progress ? <CircularProgress size={24} className={classes.buttonProgress} /> : undefined}
      </div>
    </div>
  );
});

LoadingButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "facebook",
    "twitter",
    "google",
    "github",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  children: PropTypes.node,
  success: PropTypes.bool,
  progress: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingButton;
