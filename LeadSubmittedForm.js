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
  const [value, setValue] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // ⭐ Updated common styling (label shrinks above border on focus)
  const commonFieldSx = {
    minWidth: "270px",
    "& .MuiInputBase-root": {
      height: 58,
      fontSize: "1.06rem",
      backgroundColor: "rgba(255,255,255,0.75)",
      borderRadius: "12px",
      backdropFilter: "blur(6px)",
      paddingLeft: "12px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.05rem",
      fontWeight: 600,
      transition: "all 0.22s ease",
      marginLeft: "4px",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(10px, -10px) scale(0.85)", // shrink ABOVE border
      background: "white",
      padding: "0 6px",
      borderRadius: "6px",
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
        {/* 🌟 Tabs */}
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
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#0A3D91" }}
              >
                Lead Submission Form
              </Typography>
              <Typography variant="body1" sx={{ color: "#37474F" }}>
                Kindly fill all required fields to create a new tender record
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {[
                // SECTION 1: Tender Details
                {
                  title: "📋 Tender Details",
                  fields: (
                    <Grid container spacing={2}>
                      {[
                        {
                          label: "Tender Name",
                          name: "tenderName",
                          required: true,
                        },
                        {
                          label: "Customer Name",
                          name: "customerName",
                          required: true,
                        },
                        {
                          label: "Customer Address",
                          name: "customerAddress",
                          required: true,
                        },
                        {
                          label: "Tender Date",
                          type: "date",
                          name: "tenderDate",
                          required: true,
                          shrink: true,
                        },
                        {
                          label: "Tender Reference No",
                          name: "tenderReferenceNo",
                          required: true,
                        },
                        {
                          label: "Tender Type",
                          name: "tenderType",
                          required: true,
                          placeholder: "e.g., Open, Limited, Single Bid",
                        },
                        {
                          label: "Website (optional)",
                          name: "website",
                          placeholder: "https://...",
                        },
                      ].map(
                        (
                          {
                            label,
                            name,
                            required,
                            type,
                            shrink,
                            placeholder,
                          },
                          index
                        ) => (
                          <Grid item {...fieldGrid} key={index}>
                            <Controller
                              name={name}
                              control={control}
                              rules={required ? { required: `${label} is required` } : {}}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label={label}
                                  type={type || "text"}
                                  fullWidth
                                  required={required}
                                  error={!!errors[name]}
                                  helperText={errors[name]?.message}
                                  placeholder={placeholder}
                                  InputLabelProps={shrink ? { shrink: true } : {}}
                                  sx={commonFieldSx}
                                />
                              )}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  ),
                },

                // SECTION 2: RFP Information
                {
                  title: "📑 RFP Information",
                  fields: (
                    <Grid container spacing={2}>
                      {[
                        {
                          label: "RFP Received On",
                          name: "rfpReceivedOn",
                          required: true,
                          type: "date",
                          shrink: true,
                        },
                        {
                          label: "RFP Due Date",
                          name: "rfpDueDate",
                          required: true,
                          type: "date",
                          shrink: true,
                        },
                      ].map(
                        ({ label, name, required, type, shrink }, index) => (
                          <Grid item {...fieldGrid} key={index}>
                            <Controller
                              name={name}
                              control={control}
                              rules={{ required: `${label} is required` }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label={label}
                                  type={type}
                                  fullWidth
                                  required
                                  error={!!errors[name]}
                                  helperText={errors[name]?.message}
                                  InputLabelProps={{ shrink }}
                                  sx={commonFieldSx}
                                />
                              )}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  ),
                },

                // SECTION 3: Bid Owner & EMD
                {
                  title: "👤 Bid Owner & 💰 EMD Value",
                  fields: (
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
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Value of EMD (Crore)"
                              fullWidth
                              required
                              error={!!errors.valueEMDInCrore}
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
                  title: "🗓️ Approval Workflow",
                  fields: (
                    <Grid container spacing={2}>
                      {[
                        {
                          name: "dmktgInPrincipalApprovalRxdOn",
                          label: "Dmktg In-Principal Approval Rxd On",
                        },
                        {
                          name: "sellingPriceApprovalInitiatedOn",
                          label: "Selling Price Approval Initiated On",
                        },
                        {
                          name: "bidSubmittedOn",
                          label: "Bid Submitted On",
                        },
                        {
                          name: "approvalSBUFinanceOn",
                          label: "Approval from SBU Finance On",
                        },
                        { name: "approvalGMOn", label: "Approval from GM" },
                        {
                          name: "sentToFinanceGMDmktgApprovalRxdOn",
                          label: "Sent to Finance GM on Dmktg Approval Rxd On",
                        },
                        { name: "dmktgApprovalRxdOn", label: "Dmktg Approval Rxd On" },
                      ].map(({ name, label }, index) => (
                        <Grid item {...fieldGrid} key={index}>
                          <Controller
                            name={name}
                            control={control}
                            rules={{ required: `${label} is required` }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={label}
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                error={!!errors[name]}
                                helperText={errors[name]?.message}
                                sx={commonFieldSx}
                              />
                            )}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ),
                },

                // SECTION 5: Status & Tracking
                {
                  title: "📊 Status & Tracking",
                  fields: (
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
                              helperText={errors.presentStatus?.message}
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
                    {section.fields}
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

            {/* JSON Preview */}
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
                  <Button variant="contained" color="success" onClick={handleDownloadJSON}>
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

        {/* 🌟 VIEW TAB */}
        {value === 1 && (
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              View Data
            </Typography>
            <Typography variant="body1" sx={{ color: "#455A64" }}>
              (Later you can integrate GET API to show stored Tender submissions here.)
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
