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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const [filterInvType, setFilterInvType] = useState("");
  const [filterInvAmount, setFilterInvAmount] = useState("");
  const [filterMatAmount, setFilterMatAmount] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterCurValue, setFilterCurValue] = useState("");

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
  const flattenedData = investmentData.flatMap(
    (investment) => investment.details
  );

  // Update totalRows calculation
  const totalRows = flattenedData.length;

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
                  placeholder="Start Date"
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
          <h2 style={{borderBottom:"2px solid #007bff",color:"#007bff",paddingBottom:"10px",fontSize:"24px"}}> Investments Table</h2>
          <TableContainer component={Paper} style={{ width: "700px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "80px" }}>
                    Investment Type
                    <input
                      type="text"
                      value={filterInvType}
                      onChange={(e) => setFilterInvType(e.target.value)}
                    />
                  </TableCell>
                  <TableCell style={{ width: "80px" }}>
                    Invested Amt
                    <input
                      type="text"
                      value={filterInvAmount}
                      onChange={(e) => setFilterInvAmount(e.target.value)}
                    />
                  </TableCell>
                  {/* <TableCell>
      Maturity Amount
      <input
        type="text"
        value={filterMatAmount}
        onChange={(e) => setFilterMatAmount(e.target.value)}
      />
    </TableCell> */}
                  <TableCell style={{ width: "80px" }}>
                    Start Date
                    <input
                      // type="date"
                      value={filterStartDate}
                      onChange={(e) => setFilterStartDate(e.target.value)}
                    />
                  </TableCell>
                  <TableCell style={{ width: "80px" }}>
                    End Date
                    <input
                      // type="date"
                      value={filterEndDate}
                      onChange={(e) => setFilterEndDate(e.target.value)}
                    />
                  </TableCell>
                  <TableCell style={{ width: "80px" }}>
                    Current Value
                    <input
                      type="text"
                      value={filterCurValue}
                      onChange={(e) => setFilterCurValue(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flattenedData
                  .filter((detail) => {
                    return (
                      detail.investmentType.includes(filterInvType) &&
                      detail.investedAmount.includes(filterInvAmount) &&
                      // detail.maturityAmount.includes(filterMatAmount) &&
                      (filterStartDate === "" ||
                        new Date(detail.startDate) >=
                          new Date(filterStartDate)) &&
                      (filterEndDate === "" ||
                        new Date(detail.endDate) <= new Date(filterEndDate)) &&
                      detail.currentValue.includes(filterCurValue)
                    );
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.investmentType}</TableCell>
                      <TableCell>{detail.investedAmount}</TableCell>
                      {/* <TableCell>{detail.maturityAmount}</TableCell> */}
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[7, 10, 25]}
            component="div"
            count={flattenedData.length}
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
