import React, { useState } from 'react';
import { Grid, Card, makeStyles, Typography, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 305,
    margin: '0 auto', 
    background: "linear-gradient(135deg, rgb(0, 7, 61), #2196f3)", 
    padding: theme.spacing(2), 
    color: '#fff', 
    cursor: 'pointer', 
  },
  dialogContent: {
    minWidth: 400,
    maxHeight: '70vh',
    overflowY: 'auto',
  },
}));

const IncomeDialog = ({ open, handleClose, incomeData }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Income Details</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {incomeData.map((income, index) => (
                <React.Fragment key={index}>
                  {income.accountDetails.map((accountDetail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{accountDetail.recordId}</TableCell>
                      <TableCell>{accountDetail.accountId}</TableCell>
                      <TableCell>{accountDetail.description}</TableCell>
                      <TableCell>{accountDetail.amount}</TableCell>
                      <TableCell>{new Date(accountDetail.dot).toISOString().split('T')[0]}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

const ExpenseDialog = ({ open, handleClose, expenseData }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Expense Details</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {expenseData.map((expense, index) => (
                <React.Fragment key={index}>
                  {expense.accountDetails.map((accountDetail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{accountDetail.recordId}</TableCell>
                      <TableCell>{accountDetail.accountId}</TableCell>
                      <TableCell>{accountDetail.description}</TableCell>
                      <TableCell>{accountDetail.amount}</TableCell>
                      <TableCell>{new Date(accountDetail.dot).toISOString().split('T')[0]}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

const Records = () => {
  const classes = useStyles();
  const [openIncome, setOpenIncome] = useState(false); 
  const [openExpense, setOpenExpense] = useState(false); 
  const [incomeData, setIncomeData] = useState([]); 
  const [expenseData, setExpenseData] = useState([]); 

  const handleIncomeClick = () => {
    setOpenIncome(true);
    axios.get('https://money-xg9v.onrender.com/api/v1/income')
      .then(response => {
        setIncomeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching income data:', error);
      });
  };

  const handleExpenseClick = () => {
    setOpenExpense(true);
    axios.get('https://money-xg9v.onrender.com/api/v1/expense')
      .then(response => {
        setExpenseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching expense data:', error);
      });
  };

  const handleCloseIncome = () => {
    setOpenIncome(false);
  };

  const handleCloseExpense = () => {
    setOpenExpense(false);
  };

  return (
    <>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} onClick={handleIncomeClick}>
            <Typography variant="h6" gutterBottom>
              Income
            </Typography>
            <Typography variant="body1">
              Income Details
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} onClick={handleExpenseClick}>
            <Typography variant="h6" gutterBottom>
              Expenses
            </Typography>
            <Typography variant="body1">
              Expense Details
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} onClick={handleExpenseClick}>
            <Typography variant="h6" gutterBottom>
              Investments
            </Typography>
            <Typography variant="body1">
              Investment Details
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} >
            <Typography variant="h6" gutterBottom>
              Insurance
            </Typography>
            <Typography variant="body1">
              Insurance Details
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <IncomeDialog open={openIncome} handleClose={handleCloseIncome} incomeData={incomeData} />
      <ExpenseDialog open={openExpense} handleClose={handleCloseExpense} expenseData={expenseData} />
    </>
  );
};

export default Records;
