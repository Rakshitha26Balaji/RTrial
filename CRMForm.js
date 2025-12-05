import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  Snackbar,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Old reference options (kept as comment)
// const tenderTypeOptions = ["ST","MT"];
// const document TypeOptions ["PDF", "DOC", "XLS", "Others"];

const tenderTypeOptions = ["ST", "MT"];
const documentTypeOptions = ["PDF", "DOC", "XLS", "Others"];

const CRMLeadForm = (props) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [value, setValue] = useState(0);
  const [orderData, setOrderData] = useState([]);

  // Old style (kept as comment)
  // const props = { 
  //   ServerIp: "http://localhost:8882",
  //   Location: "hardwritten",
  // };
  // const API = "/getCRHLeads";
  // const SaveDataURL = props.ServerIp + API;

  const defaultServerIp = "http://localhost:8882";
  const serverIp = props?.ServerIp || defaultServerIp;

  const SaveDataURL = `${serverIp}/CreateCRMLead`;
  const GetDataURL = `${serverIp}/GetDomesticLead`; // or /GetCRMLead based on backend

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leadID: "",
      issueDate: "",
      tenderName: "",
      organisation: "",
      documentType: "",
      tenderType: "",
      emdInCrore: "",
      approxTenderValueCrore: "",
      lastDateSubmission: "",
      preBidDate: "",
      teamAssigned: "",
      remarks: "",
      corrigendumInfo: "",
      // OperatorId:
      // OperatorName:
      // OperatorRole:
      // OperatorSBU:
    },
  });

  // ✅ WORKING onSubmit
  const onSubmit = (data) => {
    console.log("Raw Form Data:", data);

    // Convert string numbers to actual numbers with 2 decimal precision
    const formattedData = {
      leadID: data.leadID,
      issueDate: data.issueDate,
      tenderName: data.tenderName,
      organisation: data.organisation,
      documentType: data.documentType,
      tenderType: data.tenderType,
      emdInCrore:
        data.emdInCrore !== ""
          ? parseFloat(parseFloat(data.emdInCrore).toFixed(5))
          : null,
      approxTenderValueCrore:
        data.approxTenderValueCrore !== ""
          ? parseFloat(parseFloat(data.approxTenderValueCrore).toFixed(5))
          : null,
      // emdInCrore:data.emdInCrore,
      // approxTenderValueCrore:data.approxTenderValueCrore,
      lastDateSubmission: data.lastDateSubmission,
      preBidDate: data.preBidDate,
      teamAssigned: data.teamAssigned,
      remarks: data.remarks || "",
      corrigendumInfo: data.corrigendumInfo || "",
      OperatorId: "291536",
      OperatorName: "Vivek Kumar Singh",
      OperatorRole: "Lead Owner",
      OperatorSBU: "Software SBU",
      submittedAt: new Date().toISOString(),
    };

    console.log(
      "Frontend Form Data:",
      JSON.stringify(formattedData, null, 2)
    );

    // Old console block kept as comment:
    // console.log(
    //   "Budgetary Quotation Data:",
    //   JSON.stringify(formattedData, null, 2)
    // );

    axios
      .post(SaveDataURL, formattedData)
      .then((response) => {
        // console.log("formattedData after ")
        console.log("Server Response:", response.data);
        setSubmittedData(formattedData);
        setSubmitSuccess(true);
      })
      .catch((error) => console.log(error.message));
  };

  // 🔁 OLD DUPLICATE onSubmit KEPT AS COMMENT
  /*
  const onSubmit = (data) => {

  console.log(data);

  // Convert string numbers to actual numbers with 2 decimal precision

  const formattedData = {

  leadID: data.leadID,

  issueDate: data.issueDate,

  tenderName: data.tenderName,

  organisation: data.organisation,

  document Type: data.document Type,

  tenderType: data.tenderType,

  emdInCrore: parseFloat(parseFloat(data.emdCrore).toFixed(5)),

  approx TenderValueCrore:

  parseFloat(parseFloat(data.approxTenderValueCrore).toFixed(5)), // emdInCrore:data.emdInCrore,

  //approxTenderValueCrore:data.approxTenderValueCrore,

  lastDateSubmission: data.lastDateSubmission,

  preBidDate: data.preBidDate,

  teamAssigned: data.teamAssigned,

  remarks: data.remarks || "",

  corrigendumInfo: data.corrigendumInfo || "",

  OperatorId: "291536",

  OperatorName: "Vivek Kumar Singh",

  OperatorRole: "Lead Owner",

  OperatorSBU: "Software SBU",

  }; submittedAt: new Date().toISOString(),

  2)); console.log("Frontend Form Data:", JSON.stringify(formattedData, null,

  // console.log(
  // "Budgetary Quotation Data:",
  // JSON.stringify(formattedData, null, 2)
  //);

  axios

  .post(SaveDataURL, formattedData)

  .then((response) => {

  // console.log("formattedData after ")

  console.log(response.data);

  setSubmittedData(formattedData);

  setSubmitSuccess(true);

  }; }) .catch((error) => console.log(error.message));
  };
  */

  // RESET
  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  // Old style kept as comment:
  // const handleReset = () => { }; reset(); setSubmittedData(null);

  // SNACKBAR CLOSE
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
  };

  // Old style kept:
  // const handleCloseSnackbar = () => { }; setSubmitSuccess(false);

  // DOWNLOAD JSON
  const handleDownloadJSON = () => {
    // Old commented logic kept:
    // if (submittedData) {
    // const dataStr = JSON.stringify(submittedData, null, 2);
    // const dataBlob = new Blob([dataStr], { type: "application/json" });
    // const url = URL.createObjectURL(dataBlob); const link document.createElement("a"); link.href url; link.download budgetary-quotation-$( submittedData.serialNumber }-${Date.now()).json"; link.click(); URL.revokeObjectURL(url);

    if (!submittedData) return;

    const dataStr = JSON.stringify(submittedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    // We don't know serialNumber exists; use timestamp only:
    link.download = `budgetary-quotation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    axios
      .get(GetDataURL)
      .then((response) => {
        // console.log("formattedData after ")
        //console.log(response.data);
        setOrderData(response.data);
      })
      .catch((error) => console.log(error.message));
    // ), [SaveDataURL]);
  }, [GetDataURL]);

  return (
    <Container maxWidth="lg" className="tender-container">
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        sx={{ mb: 2 }}
      >
        <Tab label="Create CRM Lead" />
        <Tab label="View CRM Leads" />
      </Tabs>

      {value === 0 && (
        <Paper
          elevation={3}
          sx={{ p: { xs: 2, sm: 4 }, backgroundColor: "#ffffff" }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" className="section-title">
              CRM Leads Form
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill all details below to submit the CRM lead form
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="tender-card">
              <CardContent>
                <Typography variant="h6" className="section-title">
                  CRM Lead Details
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  {[
                    ["leadID", "Lead ID"],
                    ["issueDate", "Issue Date", "date"],
                    ["tenderName", "Tender Name"],
                    ["organisation", "Organisation"],
                  ].map(([name, label, type]) => (
                    <Grid item xs={12} md={6} key={name}>
                      <Controller
                        name={name}
                        control={control}
                        rules={{ required: `${label} is required` }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            type={type || "text"}
                            label={label}
                            InputLabelProps={{ shrink: true }}
                            className="text-field-style"
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}

                  {/* Document Type */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="documentType"
                      control={control}
                      rules={{ required: "Document Type is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Document Type"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors.documentType}
                          helperText={errors.documentType?.message}
                        >
                          {documentTypeOptions.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Tender Type */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="tenderType"
                      control={control}
                      rules={{ required: "Tender Type is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Tender Type"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors.tenderType}
                          helperText={errors.tenderType?.message}
                        >
                          {tenderTypeOptions.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* EMD Value */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="emdInCrore"
                      control={control}
                      rules={{ required: "EMD value is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          // type="number"
                          label="EMD in Crore"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors.emdInCrore}
                          helperText={errors.emdInCrore?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Approx Tender Value */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="approxTenderValueCrore"
                      control={control}
                      rules={{
                        required: "Approx Tender Value is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          // type="number"
                          label="Approx Tender Value in Crore"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors.approxTenderValueCrore}
                          helperText={
                            errors.approxTenderValueCrore?.message
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/* Last Date of Submission */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="lastDateSubmission"
                      control={control}
                      rules={{
                        required:
                          "Last Date of Submission is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="date"
                          fullWidth
                          label="Last Date of Submission"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors.lastDateSubmission}
                          helperText={
                            errors.lastDateSubmission?.message
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/* Pre Bid Date */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="preBidDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="datetime-local"
                          fullWidth
                          label="Pre-bid Date & Time"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                        />
                      )}
                    />
                  </Grid>

                  {/* Team Assigned */}
                  <Grid item xs={12}>
                    <Controller
                      name="teamAssigned"
                      control={control}
                      rules={{ required: "Team Assigned is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Team Assigned"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors.teamAssigned}
                          helperText={errors.teamAssigned?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Remarks */}
                  <Grid item xs={12}>
                    <Controller
                      name="remarks"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={2}
                          label="Remarks"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                        />
                      )}
                    />
                  </Grid>

                  {/* Corrigendum */}
                  <Grid item xs={12}>
                    <Controller
                      name="corrigendumInfo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Corrigendums Date & File"
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* BUTTONS */}
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="btn-submit"
              >
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type="button"
                variant="outlined"
                size="large"
                className="btn-reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </form>

          {/* SUCCESS SNACKBAR */}
          <Snackbar
            open={submitSuccess}
            autoHideDuration={4500}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              CRM Lead submitted successfully!
            </Alert>
          </Snackbar>

          {/* JSON PREVIEW */}
          {submittedData && (
            <Box sx={{ mt: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  Submitted Data (JSON)
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={handleDownloadJSON}
                >
                  Download JSON
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  backgroundColor: "#f1f1f1",
                  maxHeight: 450,
                  overflow: "auto",
                  borderRadius: 2,
                }}
              >
                <pre>
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
        </Paper>
      )}

      {value === 1 && (
        <ViewCRMLeadData ViewData={orderData} />
      )}
    </Container>
  );
};

function ViewCRMLeadData(props) {
  // Old debug:
  // console.log("props viewCRMLeadData", props. ViewData.data);

  const ViewData = props.ViewData;

  return (
    <>
      <Typography
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontWeight: "bold",
          color: "#000",
          fontSize: "1.4rem",
          textSizeAdjust: "auto",
          textAlign: "center",
          backgroundColor: "lavender",
        }}
      >
        User Profile Created List
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
              >
                LeadID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Issue Date
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Tender Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Organisation
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Document Type
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Tender Type
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                EMD in Cr
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Approx Tender Value in Cr
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Last Date of Submission
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Pre-bid Date
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Team Assigned
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Remarks
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "15px" }}
                align="left"
              >
                Corrigendum Date & File
              </TableCell>
              {/* 
              <TableCell style={{ fontweight: "bolder", fontSize: 15px' }}
              align="left">Created date</TableCell> 
              */}
            </TableRow>
          </TableHead>

          <TableBody>
            {ViewData?.data
              ? ViewData.data.map((row, index) => (
                  <TableRow key={row.id || index}>
                    {/* (defaultValues: [
                      leadID:
                      issueDate:
                      tenderName:
                      organisation:
                      document Type:
                      tender Type:
                      emdInCrore:
                      approxTenderValueCrore:
                      lastDateSubmission:
                      preBidDate:
                      teamAssigned:
                      remarks:",
                      corrigendumInfo:"
                      }} */}
                    <TableCell component="th" scope="row">
                      {row.leadID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.issueDate}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.tenderName}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.organisation}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.documentType}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.tenderType}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.emdInCrore}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.approxTenderValueCrore}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.lastDateSubmission}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.preBidDate}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.teamAssigned}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.remarks}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.corrigendumInfo}
                    </TableCell>
                    {/* <TableCell align="left">{row.dateCreated}</TableCell> */}
                  </TableRow>
                ))
              : ViewData?.map((row, index) => (
                  <TableRow key={row.id || index}>
                    <TableCell component="th" scope="row">
                      {row.leadID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.issueDate}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.tenderName}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.organisation}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.documentType}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.tenderType}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.emdInCrore}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.approxTenderValueCrore}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.lastDateSubmission}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.preBidDate}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.teamAssigned}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.remarks}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px" }}
                      align="left"
                    >
                      {row.corrigendumInfo}
                    </TableCell>
                    {/* <TableCell align="left">{row.dateCreated}</TableCell> */}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CRMLeadForm;
