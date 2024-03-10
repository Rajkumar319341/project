import React, { useState } from "react";
import {
  Grid,
  Card,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import axios from "axios";

const userId = localStorage.getItem("userId");
console.log("UserId:", userId);

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 305,
    margin: "0 auto",
    background: "linear-gradient(135deg, rgb(0, 7, 61), #2196f3)",
    padding: theme.spacing(2),
    color: "#fff",
    cursor: "pointer",
  },
  dialogContent: {
    minWidth: 400,
    maxHeight: "70vh",
    overflowY: "auto",
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
              {incomeData.map((userIncome, index) => (
                <React.Fragment key={index}>
                  {userIncome.accountDetails.map((accountDetail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{accountDetail.recordId}</TableCell>
                      <TableCell>{accountDetail.accountId}</TableCell>
                      <TableCell>{accountDetail.description}</TableCell>
                      <TableCell>{accountDetail.amount}</TableCell>
                      <TableCell>
                        {
                          new Date(accountDetail.dot)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
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
                      <TableCell>
                        {
                          new Date(accountDetail.dot)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
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

const InsuranceDialog = ({ open, handleClose, insuranceData }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Insurance Details</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {insuranceData.map((insurance, index) => (
                <TableRow key={index}>
                  <TableCell>{insurance.insuranceType}</TableCell>
                  <TableCell>{insurance.policyTerm}</TableCell>
                  <TableCell>{insurance.premiumAmount}</TableCell>
                  <TableCell>
                    {insurance.startDate
                      ? new Date(insurance.startDate)
                          .toISOString()
                          .split("T")[0]
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {insurance.endDate
                      ? new Date(insurance.endDate).toISOString().split("T")[0]
                      : "-"}
                  </TableCell>

                  <TableCell>{insurance.premiumPayingTerm}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

const InvestmentDialog = ({ open, handleClose, investmentData }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Investment Details</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {investmentData.map((userInvestment, index) => (
                <React.Fragment key={index}>
                  {userInvestment.details.map((investmentDetail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{investmentDetail.investmentType}</TableCell>
                      <TableCell>{investmentDetail.investedAmount}</TableCell>
                      <TableCell>{investmentDetail.maturityAmount}</TableCell>
                      <TableCell>
                        {
                          new Date(investmentDetail.startDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
                      <TableCell>
                        {
                          new Date(investmentDetail.endDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
                      <TableCell>{investmentDetail.currentValue}</TableCell>
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
  const [openInvestment, setOpenInvestment] = useState(false);
  const [openInsurance, setOpenInsurance] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [insuranceData, setInsuranceData] = useState([]);

  const handleIncomeClick = () => {
    setOpenIncome(true);
    axios
      .get(`https://money-xg9v.onrender.com/api/v1/income/user/${userId}`)
      .then((response) => {
        console.log("Income data response:", response);
        console.log("Income data response Data:", response.data);
        console.log("Income data response Data Income:", response.data.income);
        console.log(
          "Income data response Data Income AccountDetails:",
          response.data.income[0].accountDetails
        );
        setIncomeData(response.data.income);
      })
      .catch((error) => {
        console.error("Error fetching income data:", error);
      });
  };

  const handleExpenseClick = () => {
    setOpenExpense(true);
    axios
      .get(`https://money-xg9v.onrender.com/api/v1/expense/user/${userId}`)
      .then((response) => {
        setExpenseData(response.data.expense);
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  };

  const handleInvestmentClick = () => {
    setOpenInvestment(true);
    axios
      .get(`https://money-xg9v.onrender.com/api/v1/investment/user/${userId}`)
      .then((response) => {
        setInvestmentData(response.data.investment);
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  };

  const handleInsuranceClick = () => {
    setOpenInsurance(true);
    axios
      .get(`https://money-xg9v.onrender.com/api/v1/insurances/user/${userId}`)
      .then((response) => {
        setInsuranceData(response.data.insurances);
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  };

  const handleCloseIncome = () => {
    setOpenIncome(false);
  };

  const handleCloseExpense = () => {
    setOpenExpense(false);
  };

  const handleCloseInvestment = () => {
    setOpenInvestment(false);
  };

  const handleCloseInsurance = () => {
    setOpenInsurance(false);
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
            <Typography variant="body1">Income Details</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} onClick={handleExpenseClick}>
            <Typography variant="h6" gutterBottom>
              Expenses
            </Typography>
            <Typography variant="body1">Expense Details</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} onClick={handleInvestmentClick}>
            <Typography variant="h6" gutterBottom>
              Investments
            </Typography>
            <Typography variant="body1">Investment Details</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} onClick={handleInsuranceClick}>
            <Typography variant="h6" gutterBottom>
              Insurance
            </Typography>
            <Typography variant="body1">Insurance Details</Typography>
          </Card>
        </Grid>
      </Grid>

      <IncomeDialog
        open={openIncome}
        handleClose={handleCloseIncome}
        incomeData={incomeData}
      />
      <ExpenseDialog
        open={openExpense}
        handleClose={handleCloseExpense}
        expenseData={expenseData}
      />
      <InvestmentDialog
        open={openInvestment}
        handleClose={handleCloseInvestment}
        investmentData={investmentData}
      />
      <InsuranceDialog
        open={openInsurance}
        handleClose={handleCloseInsurance}
        insuranceData={insuranceData}
      />
    </>
  );
};

export default Records;
