import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function TenderForm() {
  const [value, setValue] = useState(0); // Tabs
  const [submittedData, setSubmittedData] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Status options (same pattern as BQ form)
  const STATUS_OPTIONS = [
    "Submitted",
    "In Progress",
    "Pending",
    "Rejected",
    "Approved",
  ];

  const fieldGrid = { xs: 12, md: 6 };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // 🌟 Common styling for inputs (from BQForm)
  const commonFieldSx = {
    minWidth: "270px",
    "& .MuiInputBase-root": {
      height: 58,
      fontSize: "1.06rem",
      backgroundColor: "rgba(255,255,255,0.75)",
      borderRadius: "12px",
      backdropFilter: "blur(6px)",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.05rem",
      fontWeight: 600,
      transform: "translate(14px, 10px) scale(1)",
    },
  };

  const selectFieldSx = {
    ...commonFieldSx,
    "& .MuiSelect-select": {
      padding: "16px",
    },
  };

  const onSubmit = (data) => {
    console.log("Submitted Tender Data:", data);
    setSubmittedData(data);
    setSubmitSuccess(true);

    // 👉 Integrate POST API here if needed:
    // axios.post("http://localhost:8082/YourTenderAPI", data)
    //   .then(...)
    //   .catch(...);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  const handleCloseSnackbar = () => setSubmitSuccess(false);

  const handleDownloadJSON = () => {
    if (!submittedData) return;
    const blob = new Blob([JSON.stringify(submittedData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Tender_Form_Data.json";
    link.click();
  };

  return (
    <Container maxWidth="xl" sx={{ p: 0 }}>
      <Box
        sx={{
          mt: { xs: 7, sm: 7 },
          ml: { xs: 0, sm: 8, md: 10, lg: 12 },
          mr: 2,
        }}
      >
        {/* 🌟 TABS (same look as BQForm) */}
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#0d47a1",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#1565c0",
            },
            mb: 3,
          }}
        >
          <Tab label="Create Data" />
          <Tab label="View Data" />
        </Tabs>

        {/* 🌟 CREATE TAB */}
        {value === 0 && (
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, sm: 3 },
              background: "rgba(255,255,255,0.85)",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#0A3D91" }}
              >
                Tender Management Form
              </Typography>
              <Typography variant="body1" sx={{ color: "#37474F" }}>
                Kindly fill all required fields to create a new tender record
              </Typography>
            </Box>

            {/* FORM START */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {[
                // SECTION 1: Tender Details
                {
                  title: "📋 Tender Details",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="tenderName"
                          control={control}
                          rules={{ required: "Tender Name is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Tender Name"
                              fullWidth
                              required
                              error={!!errors.tenderName}
                              helperText={errors.tenderName?.message}
                              autoComplete="off"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="customerName"
                          control={control}
                          rules={{ required: "Customer Name is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Customer Name"
                              fullWidth
                              required
                              error={!!errors.customerName}
                              helperText={errors.customerName?.message}
                              autoComplete="off"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="customerAddress"
                          control={control}
                          rules={{ required: "Customer Address is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Customer Address"
                              fullWidth
                              required
                              error={!!errors.customerAddress}
                              helperText={errors.customerAddress?.message}
                              autoComplete="off"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="tenderDate"
                          control={control}
                          rules={{ required: "Tender Date is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Tender Date"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.tenderDate}
                              helperText={errors.tenderDate?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="tenderReferenceNo"
                          control={control}
                          rules={{
                            required: "Tender Reference No is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Tender Reference No"
                              required
                              fullWidth
                              error={!!errors.tenderReferenceNo}
                              helperText={errors.tenderReferenceNo?.message}
                              autoComplete="off"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="tenderType"
                          control={control}
                          rules={{ required: "Tender Type is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Tender Type"
                              required
                              fullWidth
                              error={!!errors.tenderType}
                              helperText={errors.tenderType?.message}
                              autoComplete="off"
                              placeholder="e.g., Open, Limited, Single Bid"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="website"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Website (optional)"
                              fullWidth
                              error={!!errors.website}
                              helperText={
                                errors.website?.message ||
                                "URL of tender site, if any"
                              }
                              placeholder="https://..."
                              autoComplete="off"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ),
                },

                // SECTION 2: RFP Information
                {
                  title: "📑 RFP Information",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="rfpReceivedOn"
                          control={control}
                          rules={{
                            required: "RFP Received on is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="RFP Received On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.rfpReceivedOn}
                              helperText={errors.rfpReceivedOn?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="rfpDueDate"
                          control={control}
                          rules={{ required: "RFP Due Date is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="RFP Due Date"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.rfpDueDate}
                              helperText={errors.rfpDueDate?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ),
                },

                // SECTION 3: Bid Owner & EMD Value
                {
                  title: "👤 Bid Owner & 💰 EMD Value",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="bidOwner"
                          control={control}
                          rules={{ required: "Bid Owner is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Bid Owner"
                              fullWidth
                              required
                              error={!!errors.bidOwner}
                              helperText={errors.bidOwner?.message}
                              autoComplete="off"
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="valueEMDInCrore"
                          control={control}
                          rules={{
                            required: "Value of EMD in Crore is required",
                            // min: { value: 0, message: "EMD must be positive" },
                            // validate: (val) => {
                            //   if (val === "" || val == null)
                            //     return "Enter a valid amount";
                            //   const fl = parseFloat(val);
                            //   if (isNaN(fl)) return "Enter a valid number";
                            //   if (fl < 0) return "Must be positive";
                            //   if (!/^\d+(\.\d{1,2})?$/.test(val + ""))
                            //     return "Max 2 decimals";
                            //   return true;
                            // },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Value of EMD (Crore)"
                              fullWidth
                              required
                              error={!!errors.valueEMDInCrore}
                              // helperText={
                              //   errors.valueEMDInCrore?.message ||
                              //   "Enter up to 2 decimal places"
                              // }
                              // InputProps={{
                              //   step: "0.01",
                              //   min: "0",
                              //   endAdornment: (
                              //     <Typography sx={{ ml: 1 }}>Cr</Typography>
                              //   ),
                              // }}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ),
                },

                // SECTION 4: Approval Workflow
                {
                  title: "✅ Approval Workflow",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="dmktgInPrincipalApprovalRxdOn"
                          control={control}
                          rules={{
                            required:
                              "Dmktg In-Principal Approval is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Dmktg In-Principal Approval Rxd On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={
                                !!errors.dmktgInPrincipalApprovalRxdOn
                              }
                              helperText={
                                errors.dmktgInPrincipalApprovalRxdOn?.message
                              }
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="sellingPriceApprovalInitiatedOn"
                          control={control}
                          rules={{
                            required:
                              "Selling Price Approval Initiated is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Selling Price Approval Initiated On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={
                                !!errors.sellingPriceApprovalInitiatedOn
                              }
                              helperText={
                                errors.sellingPriceApprovalInitiatedOn?.message
                              }
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="bidSubmittedOn"
                          control={control}
                          rules={{ required: "Bid Submitted On is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Bid Submitted On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.bidSubmittedOn}
                              helperText={errors.bidSubmittedOn?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="approvalSBUFinanceOn"
                          control={control}
                          rules={{
                            required: "Approval from SBU Finance is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Approval from SBU Finance On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.approvalSBUFinanceOn}
                              helperText={errors.approvalSBUFinanceOn?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="approvalGMOn"
                          control={control}
                          rules={{
                            required: "Approval from GM is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Approval from GM"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.approvalGMOn}
                              helperText={errors.approvalGMOn?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="sentToFinanceGMDmktgApprovalRxdOn"
                          control={control}
                          rules={{
                            required:
                              "Sent to Finance GM on Dmktg Approval Rxd On is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Sent to Finance GM on Dmktg Approval Rxd On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={
                                !!errors.sentToFinanceGMDmktgApprovalRxdOn
                              }
                              helperText={
                                errors.sentToFinanceGMDmktgApprovalRxdOn
                                  ?.message
                              }
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item {...fieldGrid}>
                        <Controller
                          name="dmktgApprovalRxdOn"
                          control={control}
                          rules={{
                            required: "Dmktg Approval Rxd On is required",
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Dmktg Approval Rxd On"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.dmktgApprovalRxdOn}
                              helperText={errors.dmktgApprovalRxdOn?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ),
                },

                // SECTION 5: Status & Tracking
                {
                  title: "📊 Status & Tracking",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item {...fieldGrid}>
                        <Controller
                          name="presentStatus"
                          control={control}
                          rules={{ required: "Present Status is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Present Status"
                              fullWidth
                              required
                              error={!!errors.presentStatus}
                              helperText={
                                errors.presentStatus?.message ||
                                "Select current tracking status"
                              }
                              sx={selectFieldSx}
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </Grid>
                    </Grid>
                  ),
                },
              ].map((section, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                    transition: "0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}
                    >
                      {section.title}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {section.content}
                  </CardContent>
                </Card>
              ))}

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button
                  type="submit"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.7,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #1565c0, #4ea5ff)",
                    color: "#fff",
                  }}
                >
                  Submit Tender
                </Button>

                <Button
                  size="large"
                  type="button"
                  onClick={handleReset}
                  sx={{
                    px: 5,
                    py: 1.7,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1565c0",
                    border: "2px solid #1565c0",
                    borderRadius: 3,
                  }}
                >
                  Reset Form
                </Button>
              </Box>
            </form>

            {/* Snackbar */}
            <Snackbar
              open={submitSuccess}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Tender form submitted successfully!
              </Alert>
            </Snackbar>

            {/* JSON PREVIEW */}
            {submittedData && (
              <Box sx={{ mt: 5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    📊 Submitted Data (JSON)
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleDownloadJSON}
                  >
                    Download JSON
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    backgroundColor: "#1e1e1e",
                    color: "#d4d4d4",
                    fontFamily: "monospace",
                    borderRadius: 2,
                    maxHeight: 420,
                    overflow: "auto",
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </Paper>
              </Box>
            )}
          </Paper>
        )}

        {/* 🌟 VIEW TAB (placeholder like BQForm) */}
        {value === 1 && (
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              View Data
            </Typography>
            <Typography variant="body1" sx={{ color: "#455A64" }}>
              (You can integrate a GET API here later to show saved Tender
              details.)
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
