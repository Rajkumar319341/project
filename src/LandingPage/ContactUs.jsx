import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Rajkumar from './Images/Rajkumar.jpeg'
import Shashank from './Images/shashnk.jpeg'
import hanmant from './Images/hanmant.jpg'
import vishwanath from './Images/vishwanath.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 300,
    margin: theme.spacing(2),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  media: {
    height: 200,
  },
  darkText: {
    color: '#333', 
  },
}));

const ContactUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{background:"linear-gradient(135deg, rgb(0, 7, 61), #2196f3)"}}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={Rajkumar}
              title="Person 1"
              
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Rajkumar
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Contact No: 7259785184
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Address: 123 Main Street, City, Country
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={vishwanath}
              title="Person 2"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Vishwanath
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Contact No: 9353138570
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Address: 456 Park Avenue, City, Country
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={hanmant}
              title="Person 3"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Hanmant
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Contact No: 7795118224
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Address: 789 Elm Street, City, Country
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={Shashank}
              title="Person 4"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" compohanent="h2">
                Shashank P
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Contact No: 9880560777
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.darkText}>
                Address: 567 Oak Street, City, Country
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;
