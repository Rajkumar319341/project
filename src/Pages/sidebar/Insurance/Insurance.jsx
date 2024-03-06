import React, { useState, useEffect } from "react";
import axios from "axios";
import InsuranceCSS from "./Insurance.module.css";
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

const apiUrl = "https://money-xg9v.onrender.com/api/v1/insurances";

function Insurance() {
  const [insuranceType, setInsuranceType] = useState("");
  const [policyTerm, setPolicyTerm] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [premiumDueDate, setPremiumDueDate] = useState("");
  const [premiumPayingTerm, setPremiumPayingTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insuranceData, setInsuranceData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const [insuranceTypeFilter, setInsuranceTypeFilter] = useState("");
  const [policyTermFilter, setPolicyTermFilter] = useState("");
  const [premiumAmountFilter, setPremiumAmountFilter] = useState("");
  const [premiumDueDateFilter, setPremiumDueDateFilter] = useState("");
  const [premiumPayingTermFilter, setPremiumPayingTermFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/user/${localStorage.getItem("userId")}`
        );

        setInsuranceData(response.data.insurances);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = btoa("c4eadmin:admin@123");
      const response = await axios.post(
        apiUrl,
        {
          userId: localStorage.getItem("userId"),
          insuranceType,
          policyTerm,
          premiumAmount,
          premiumDueDate,
          premiumPayingTerm,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log("Response:", response);
      if (response.status === 201) {
        console.log("Data saved Successfully");
        setInsuranceData([...insuranceData, response.data]);
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    setInsuranceType("");
    setPolicyTerm("");
    setPremiumAmount("");
    setPremiumDueDate("");
    setPremiumPayingTerm("");
    setStartDate("");
    setEndDate("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredInsuranceData = insuranceData
    .filter((insurance) =>
      insurance.insuranceType?.includes(insuranceTypeFilter)
    )
    .filter((insurance) => insurance.policyTerm?.includes(policyTermFilter))
    .filter((insurance) =>
      insurance.premiumAmount?.includes(premiumAmountFilter)
    )
    .filter((insurance) =>
      insurance.premiumDueDate?.includes(premiumDueDateFilter)
    )
    .filter((insurance) =>
      insurance.premiumPayingTerm?.includes(premiumPayingTermFilter)
    )
    .filter((insurance) => insurance.startDate?.includes(startDateFilter))
    .filter((insurance) => insurance.endDate?.includes(endDateFilter));

  return (
    <div className={InsuranceCSS.container}>
      <div className={InsuranceCSS.form_container}>
        <form onSubmit={handleSubmit}>
          <h2>Your Insurance Details</h2>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="insuranceType">Insurance Type</label>
            <input
              type="text"
              id="insuranceType"
              placeholder="Enter Insurance Type"
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="policyTerm">Policy Term</label>
            <input
              type="text"
              id="policyTerm"
              placeholder="Enter Policy Term"
              value={policyTerm}
              onChange={(e) => setPolicyTerm(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="premiumAmount">Premium Amount</label>
            <input
              type="text"
              id="premiumAmount"
              placeholder="Enter Premium Amount"
              value={premiumAmount}
              onChange={(e) => setPremiumAmount(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="premiumDueDate">Premium Due Date</label>
            <input
              type="date"
              id="premiumDueDate"
              value={premiumDueDate}
              onChange={(e) => setPremiumDueDate(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="premiumPayingTerm">Premium Paying Term</label>
            <input
              type="text"
              id="premiumPayingTerm"
              placeholder="Enter Premium Paying Term"
              value={premiumPayingTerm}
              onChange={(e) => setPremiumPayingTerm(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>

      <div className={InsuranceCSS.table_container}>
        <h2 style={{borderBottom:"2px solid #007bff",color:"#007bff",paddingBottom:"10px",fontSize:"24px"}}>Insurance Details</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Insurance Type
                  <TextField
                    value={insuranceTypeFilter}
                    onChange={(e) => setInsuranceTypeFilter(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  Policy Term
                  <TextField
                    value={policyTermFilter}
                    onChange={(e) => setPolicyTermFilter(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  Premium Amount
                  <TextField
                    value={premiumAmountFilter}
                    onChange={(e) => setPremiumAmountFilter(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  Pre Due Date
                  <TextField
                    value={premiumDueDateFilter}
                    onChange={(e) => setPremiumDueDateFilter(e.target.value)}
                  />
                </TableCell>
                {/* <TableCell>
                  Premium Paying Term
                  <TextField
                    value={premiumPayingTermFilter}
                    onChange={(e) => setPremiumPayingTermFilter(e.target.value)}
                  />
                </TableCell> */}
                <TableCell>
                  Start Date
                  <TextField
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  End Date
                  <TextField
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredInsuranceData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredInsuranceData
              ).map((insurance) => (
                <TableRow key={insurance._id}>
                  <TableCell>{insurance.insuranceType}</TableCell>
                  <TableCell>{insurance.policyTerm}</TableCell>
                  <TableCell>{insurance.premiumAmount}</TableCell>
                  <TableCell>{insurance.premiumDueDate}</TableCell>
                  {/* <TableCell>{insurance.premiumPayingTerm}</TableCell> */}
                  <TableCell>
                    {insurance.startDate &&
                      insurance.startDate.substring(0, 10)}
                  </TableCell>
                  <TableCell>
                    {insurance.endDate && insurance.endDate.substring(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[7, 10, 25]}
          component="div"
          count={filteredInsuranceData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default Insurance;