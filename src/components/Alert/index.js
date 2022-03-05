import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { alertService, AlertType } from "../../_services";

const propTypes = {
  id: PropTypes.string,
};

const defaultProps = {
  id: "default-alert",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={20} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedAlert() {
  const [open, setOpen] = React.useState(false);
  const [alerts, setAlerts] = React.useState([]);
  const history = useNavigate();
  const { id } = useParams();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      // clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // filter out alerts without 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
          return filteredAlerts;
        });

        //open the dialog
        setOpen(true);
      } else {
        // add alert to array
        setAlerts((alerts) => [...alerts, alert]);
      }
    });

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe & unlisten to avoid memory leaks
      subscription.unsubscribe();
      // history({ state });
    };
  }, []);

  function cssClasses(alert) {
    if (!alert) return;

    const classes = [];

    const alertTypeClass = {
      [AlertType.Success]: "success",
      [AlertType.Error]: "error",
      [AlertType.Info]: "info",
      [AlertType.Warning]: "warning",
    };

    classes.push(alertTypeClass[alert.type]);

    return classes;
  }

  if (!alerts.length) return null;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {
        alerts.map((alert, index) => 
          <Snackbar
            key={index}
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity={cssClasses(alert).toString()} sx={{ width: '100%' }}>
              <span dangerouslySetInnerHTML={{ __html: alert.message }} />
            </Alert>
          </Snackbar>
        )
      }
    </Stack>
  );
}

CustomizedAlert.propTypes = propTypes;
CustomizedAlert.defaultProps = defaultProps;
