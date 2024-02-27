import React, { useState, useEffect } from "react";
import InvestmentCSS from "./Investments.module.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@material-ui/core";

const apiUrl = "https://money-xg9v.onrender.com/api/v1/investment";

function Investments() {
  const [invType, setInvType] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [matAmount, setMatAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [curValue, setCurValue] = useState("");
  const [investmentData, setInvestmentData] = useState([]);
  const [filterInvType, setFilterInvType] = useState("");
  const [filterInvAmount, setFilterInvAmount] = useState("");
  const [filterMatAmount, setFilterMatAmount] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterCurValue, setFilterCurValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userId = localStorage.getItem("userId");

  const fetchInvestmentData = async () => {
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.get(`${apiUrl}/user/${userId}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setInvestmentData(response.data.investment);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchInvestmentData();
    }
  }, [userId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordId = uuid();
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.post(
        apiUrl,
        {
          userId: localStorage.getItem("userId"),
          recordid: recordId,
          collectionname: "investments",
          details: {
            investmentType: invType,
            investedAmount: invAmount,
            maturityAmount: matAmount,
            startDate: startDate,
            endDate: endDate,
            currentValue: curValue,
          },
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Data saved Successfully");
        // Refresh investment data after successful save
        fetchInvestmentData(); // Call fetchInvestmentData to update investmentData state
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    setInvType("");
    setInvAmount("");
    setMatAmount("");
    setStartDate("");
    setEndDate("");
    setCurValue("");
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={InvestmentCSS.page_container3}>
      <div className={InvestmentCSS.container3}>
        <div className={InvestmentCSS.form_container3}>
          <form onSubmit={handleSubmit}>
            <h2>Your Investments</h2>
            <div className={InvestmentCSS.form_group3}>
              <div className={InvestmentCSS.form_column}>
                <label>Investment Type</label>
                <input
                  type="text"
                  id="invType"
                  placeholder="Enter Investment Type"
                  value={invType}
                  onChange={(e) => setInvType(e.target.value)}
                />

                <label>Investment Amount</label>
                <input
                  type="text"
                  id="invAmount"
                  placeholder="Enter Investment Amount"
                  value={invAmount}
                  onChange={(e) => setInvAmount(e.target.value)}
                />

                <label>Maturity Amount</label>
                <input
                  type="text"
                  id="matAmount"
                  placeholder="Enter Maturity Amount"
                  value={matAmount}
                  onChange={(e) => setMatAmount(e.target.value)}
                />
              </div>

              <div className={InvestmentCSS.form_column}>
                <label>Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Enter Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label>End Date</label>
                <input
                  type="date"
                  id="endDate"
                  placeholder="Enter End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />

                <label>Current Value</label>
                <input
                  type="text"
                  id="curValue"
                  placeholder="Enter Current Value"
                  value={curValue}
                  onChange={(e) => setCurValue(e.target.value)}
                />
              </div>
            </div>
            <div className={InvestmentCSS.right_column1}>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>

        <div className={InvestmentCSS.table_container}>
          <h2> Investments Table</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Investment Type</TableCell>
                  <TableCell>Invested Amount</TableCell>
                  <TableCell>Maturity Amount</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Current Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? investmentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : investmentData
                ).map((investment) =>
                  investment.details.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.investmentType}</TableCell>
                      <TableCell>{detail.investedAmount}</TableCell>
                      <TableCell>{detail.maturityAmount}</TableCell>
                      <TableCell>
                        {detail.startDate
                          ? new Date(detail.startDate).toLocaleDateString()
                          : ""}
                      </TableCell>
                      <TableCell>
                        {detail.endDate
                          ? new Date(detail.endDate).toLocaleDateString()
                          : ""}
                      </TableCell>
                      <TableCell>{detail.currentValue}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={(investmentData && investmentData.length) || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
      </div>
    </div>
  );
}

export default Investments;
