import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  button: {
    textTransform: 'none',
    marginRight: theme.spacing(2),
    width: '150px',
     
    marginBottom: theme.spacing(2), // Add bottom spacing
  },

  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%', // Adjusted for larger screens
      marginLeft: '120px',
    },
  },
  topic: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  description: {
      marginBottom: theme.spacing(2),
      color: '#555',
  },
  topicContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const Tutorials = () => {
  const classes = useStyles();
  const [insurances, setInsurances] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [activeTopic, setActiveTopic] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://money-xg9v.onrender.com/api/v1/tutorial',
          {
            headers: {
              Authorization: 'BASIC ' + btoa('admin:admi@1234')
            }
          }
        );
        const initialInsurances = response.data.map((insurance) => ({
          ...insurance,
          showDetails: false,
        }));
        setInsurances(initialInsurances);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleInsuranceClick = (topic) => {
    setActiveSection(topic);
    setActiveTopic('');
  };
  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  };

  return (
    <>
      <br />
      <br />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <div className={classes.buttonContainer}>
            {insurances.map((insurance, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleInsuranceClick(insurance.topic)}
              >
                {insurance.topic}
              </Button>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} className={classes.contentContainer}>
        <div>
          {insurances.map((insurance, index) => (
            <div key={index} style={{ display: insurance.topic === activeSection ? 'block' : 'none' }}>
              {insurance.details.map((detail, detailIndex) => (
                <div key={detailIndex} className={classes.topicContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleTopicClick(detail.topic)}
                  >
                    {detail.topic}
                  </Button>
                  <div style={{ display: detail.topic === activeTopic ? 'block' : 'none' }}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="body1" className={classes.description}>
                          {detail.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Grid>
      </Grid>
    </>
  );
};

export default Tutorials;