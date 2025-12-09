import React, { useState } from "react";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function BQForm() {
  const [value, setValue] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const classificationOptions = ["Defence", "Non-Defence"];
  const statusOptions = [
    "Submitted",
    "In Progress",
    "Pending",
    "Rejected",
    "Approved",
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    setSubmittedData(data);
    setSubmitSuccess(true);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  const handleCloseSnackbar = () => setSubmitSuccess(false);

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(submittedData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BQ_Form_Data.json";
    link.click();
  };

  // 🌟 Common styling for inputs
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
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#0A3D91" }}
              >
                Budgetary Quotation Form
              </Typography>
              <Typography variant="body1" sx={{ color: "#37474F" }}>
                Kindly fill all required details to create a new quotation
              </Typography>
            </Box>

            {/* FORM START */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {[
                // SECTION 1
                {
                  title: "📋 BQ Details & 👤 Customer Information",
                  content: (
                    <Grid container spacing={2}>
                      {[
                        { name: "bqTitle", label: "BQ Title" },
                        { name: "referenceNo", label: "Reference Number" },
                        { name: "customer", label: "Customer" },
                        { name: "leadOwner", label: "Lead Owner" },
                      ].map((f) => (
                        <Grid key={f.name} item xs={12} md={6}>
                          <Controller
                            name={f.name}
                            control={control}
                            rules={{ required: `${f.label} is required` }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={f.label}
                                fullWidth
                                required
                                error={!!errors[f.name]}
                                helperText={errors[f.name]?.message}
                                sx={commonFieldSx}
                              />
                            )}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ),
                },

                // SECTION 2
                {
                  title: "Classification & 💰 Financial Information",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="classification"
                          control={control}
                          rules={{ required: "Classification is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Defence / Non-Defence"
                              fullWidth
                              required
                              sx={selectFieldSx}
                              error={!!errors.classification}
                              helperText={errors.classification?.message}
                            >
                              {classificationOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </Grid>

                      {[
                        {
                          name: "estimatedValueWithoutGST",
                          label: "Estimated Value without GST",
                        },
                        {
                          name: "estimatedValueWithGST",
                          label: "Estimated Value with GST",
                        },
                      ].map((item) => (
                        <Grid item key={item.name} xs={12} md={6}>
                          <Controller
                            name={item.name}
                            control={control}
                            rules={{
                              required: `${item.label} is required`,
                              pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={item.label}
                                type="number"
                                fullWidth
                                required
                                sx={commonFieldSx}
                                error={!!errors[item.name]}
                                helperText={errors[item.name]?.message}
                              />
                            )}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ),
                },

                // SECTION 3 — FIXED (DATE FIELD COLOR ISSUE)
                {
                  title: "📅 Submission Details",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Controller
                          name="dateLetterSubmission"
                          control={control}
                          rules={{ required: "Date is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Date of Letter Submission"
                              type="date"
                              fullWidth
                              required
                              InputLabelProps={{ shrink: true }}
                              error={!!errors.dateLetterSubmission}
                              helperText={errors.dateLetterSubmission?.message}
                              sx={{
                                ...commonFieldSx,
                                "& .MuiInputBase-root": {
                                  height: 85,
                                  backgroundColor: "rgba(255,255,255,0.75)", // FIX ✔
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ),
                },

                // SECTION 4 — FIXED (COMPETITOR FIELD COLOR ISSUE)
                {
                  title: "📝 Additional Information",
                  content: (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Controller
                          name="competitor"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Competitor (Optional)"
                              multiline
                              rows={3}
                              fullWidth
                              sx={{
                                ...commonFieldSx,
                                "& .MuiInputBase-root": {
                                  height: "auto",
                                  padding: "10px",
                                  backgroundColor: "rgba(255,255,255,0.75)", // FIX ✔
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
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
                              sx={selectFieldSx}
                              error={!!errors.presentStatus}
                              helperText={errors.presentStatus?.message}
                            >
                              {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
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
                    background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
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
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
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
                  Submit BQ
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
            <Snackbar open={submitSuccess} onClose={handleCloseSnackbar} autoHideDuration={6000}>
              <Alert severity="success" sx={{ width: "100%" }}>
                Form submitted successfully!
              </Alert>
            </Snackbar>

            {/* JSON PREVIEW */}
            {submittedData && (
              <Box sx={{ mt: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
                  <pre style={{ margin: 0 }}>{JSON.stringify(submittedData, null, 2)}</pre>
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
              (You can integrate GET API here later to show saved Budgetary Quotations.)
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
