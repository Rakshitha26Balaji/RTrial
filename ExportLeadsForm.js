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

export default function ExportLeadsForm({ OrderData }) {
  const [value, setValue] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tenderTypeOptions = ["Open", "Limited", "Single Bid"];
  const documentTypeOptions = ["EoI", "RFP", "Tender", "Corrigendum"];
  const civilDefenceOptions = ["Civil", "Defence"];
  const businessDomainOptions = ["Railways", "Metro", "Highways", "Oil & Gas"];
  const resultStatusOptions = ["Won", "Lost", "Participated", "Not Participated"];
  const openClosedOptions = ["Open", "Closed"];
  const presentStatusOptions = ["Submitted", "In Progress", "Pending", "Rejected", "Approved"];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  /** ⭐ Global field styling (same as TenderForm/DomesticForm) */
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
      transform: "translate(10px, -10px) scale(0.85)",
      background: "white",
      padding: "0 6px",
      borderRadius: "6px",
    },
  };

  const selectFieldSx = {
    ...commonFieldSx,
    "& .MuiSelect-select": { padding: "16px" },
  };

  const onSubmit = (data) => {
    console.log("Export Lead Data:", data);
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
    link.download = "Export_Lead_Data.json";
    link.click();
  };

  const fieldGrid = { xs: 12, md: 4 };

  return (
    <Container maxWidth="xl" sx={{ p: 0 }}>
      <Box sx={{ mt: { xs: 7, sm: 7 }, ml: { xs: 0, sm: 8, md: 10, lg: 12 }, mr: 2 }}>
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
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#0A3D91" }}>
                Export Leads Form
              </Typography>
              <Typography variant="body1" sx={{ color: "#37474F" }}>
                Kindly fill all required fields to create an export lead record
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* SECTION 1 */}
              <Card sx={{ mb: 3, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}>
                    📌 Export Lead Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {[
                      ["tenderName", "Tender Name"],
                      ["tenderReferenceNo", "Tender Reference No"],
                      ["customerName", "Customer Name"],
                      ["customerAddress", "Customer Address"],
                    ].map(([name, label]) => (
                      <Grid item {...fieldGrid} key={name}>
                        <Controller
                          name={name}
                          control={control}
                          rules={{ required: `${label} is required` }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label={label}
                              error={!!errors[name]}
                              helperText={errors[name]?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                    ))}

                    {/* Tender Type */}
                    <Grid item {...fieldGrid}>
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
                            error={!!errors.tenderType}
                            helperText={errors.tenderType?.message}
                            sx={selectFieldSx}
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
                  </Grid>
                </CardContent>
              </Card>

              {/* SECTION 2 */}
              <Card sx={{ mb: 3, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}>
                    🏷 Classification & Financial Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {/* Document Type */}
                    <Grid item {...fieldGrid}>
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
                            error={!!errors.documentType}
                            helperText={errors.documentType?.message}
                            sx={selectFieldSx}
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

                    {/* Lead Owner */}
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="leadOwner"
                        control={control}
                        rules={{ required: "Lead Owner is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Lead Owner"
                            error={!!errors.leadOwner}
                            helperText={errors.leadOwner?.message}
                            sx={commonFieldSx}
                          />
                        )}
                      />
                    </Grid>

                    {/* Civil / Defence */}
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="civilOrDefence"
                        control={control}
                        rules={{ required: "Civil / Defence selection is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="Civil / Defence"
                            error={!!errors.civilOrDefence}
                            helperText={errors.civilOrDefence?.message}
                            sx={selectFieldSx}
                          >
                            {civilDefenceOptions.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Business Domain */}
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="businessDomain"
                        control={control}
                        rules={{ required: "Business Domain is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="Business Domain"
                            error={!!errors.businessDomain}
                            helperText={errors.businessDomain?.message}
                            sx={selectFieldSx}
                          >
                            {businessDomainOptions.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* SECTION 3 – VALUES */}
              <Card sx={{ mb: 3, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}>
                    📊 Values
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="valueOfEMD"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Value of EMD" fullWidth sx={commonFieldSx} />
                        )}
                      />
                    </Grid>

                    <Grid item {...fieldGrid}>
                      <Controller
                        name="estimatedValueInCrWithoutGST"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Estimated Value in Cr without GST"
                            fullWidth
                            sx={commonFieldSx}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item {...fieldGrid}>
                      <Controller
                        name="submittedValueInCrWithoutGST"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Submitted Value in Cr without GST"
                            fullWidth
                            sx={commonFieldSx}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* SECTION 4 – Submission Timeline */}
              <Card sx={{ mb: 3, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}>
                    🗓 Submission Timeline
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {[
                      ["tenderDated", "Tender Dated"],
                      ["lastDateOfSub", "Last Date of Submission"],
                    ].map(([name, label]) => (
                      <Grid item {...fieldGrid} key={name}>
                        <Controller
                          name={name}
                          control={control}
                          rules={{ required: `${label} is required` }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              type="date"
                              label={label}
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              error={!!errors[name]}
                              helperText={errors[name]?.message}
                              sx={commonFieldSx}
                            />
                          )}
                        />
                      </Grid>
                    ))}

                    <Grid item {...fieldGrid}>
                      <Controller
                        name="soleOrConsortium"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Sole / Consortium" fullWidth sx={commonFieldSx} />
                        )}
                      />
                    </Grid>

                    <Grid item {...fieldGrid}>
                      <Controller
                        name="prebidMeetingDateTime"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="datetime-local"
                            label="Pre-Bid Meeting Date & Time"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={commonFieldSx}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* SECTION 5 – Competitors & Results */}
              <Card sx={{ mb: 3, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}>
                    🏆 Competitors & Results
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid item xs={12}>
                    <Controller
                      name="competitorsInfo"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Competitors Info" fullWidth sx={commonFieldSx} />
                      )}
                    />
                  </Grid>

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {/* Result Status */}
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="wonLostParticipated"
                        control={control}
                        rules={{ required: "Result Status is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Won / Lost / Participated / Not Participated"
                            fullWidth
                            error={!!errors.wonLostParticipated}
                            helperText={errors.wonLostParticipated?.message}
                            sx={selectFieldSx}
                          >
                            {resultStatusOptions.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Open / Closed */}
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="openClosed"
                        control={control}
                        rules={{ required: "Open / Closed is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Open / Closed"
                            fullWidth
                            error={!!errors.openClosed}
                            helperText={errors.openClosed?.message}
                            sx={selectFieldSx}
                          >
                            {openClosedOptions.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Order Won */}
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="orderWonValueInCrWithoutGST"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Order Won Value in Crore (without GST)"
                            sx={commonFieldSx}
                          />
                        )}
                      />
                    </Grid>

                    {/* Present Status */}
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
                            error={!!errors.presentStatus}
                            helperText={errors.presentStatus?.message}
                            sx={selectFieldSx}
                          >
                            {presentStatusOptions.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* SECTION 6 – Reason & Info */}
              <Card sx={{ mb: 3, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0A3D91" }}>
                    📝 Reason & Info
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item {...fieldGrid}>
                      <Controller
                        name="reasonForLossingOpp"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Reason for Losing / Participated / Not Participating"
                            fullWidth
                            sx={commonFieldSx}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item {...fieldGrid}>
                      <Controller
                        name="corrigendumsDateFile"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Corrigendum Info" fullWidth sx={commonFieldSx} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* BUTTONS */}
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
                  Submit Tender
                </Button>

                <Button
                  type="button"
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
                Export lead submitted successfully!
              </Alert>
            </Snackbar>

            {/* JSON Preview */}
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
                    maxHeight: 500,
                    overflow: "auto",
                  }}
                >
                  <pre style={{ margin: 0 }}>{JSON.stringify(submittedData, null, 2)}</pre>
                </Paper>
              </Box>
            )}
          </Paper>
        )}

        {value === 1 && OrderData && (
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              View Data
            </Typography>
            <Typography variant="body1" sx={{ color: "#455A64" }}>
              (Later you can integrate GET API to show Export Leads data here.)
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
