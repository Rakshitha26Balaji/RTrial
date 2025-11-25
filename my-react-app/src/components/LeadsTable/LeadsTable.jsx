import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Toolbar, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import "./LeadsTable.css";

export default function LeadsTable() {
  const [counter, setCounter] = useState(2);

  const [rows, setRows] = useState([
    {
      id: 1,
      slno: 1,
      leadTitle: "Sample Lead",
      customer: "ABC Corp",
      type: "IDST",
      date: "25/11/2025",
      value: "12.5",
      status: "BQ Submitted",
      owner: "E1",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "slno", headerName: "Sl. No", minWidth: 90, flex: 0.5 },
    { field: "leadTitle", headerName: "Lead Title", minWidth: 150, flex: 1, editable: true },
    { field: "customer", headerName: "Customer", minWidth: 150, flex: 1, editable: true },
    {
      field: "type",
      headerName: "IDST/IUST",
      minWidth: 120,
      flex: 0.6,
      editable: true,
      type: "singleSelect",
      valueOptions: ["IDST", "IUST"],
      renderCell: (params) => (
        <Chip
          label={params.value}
          className={params.value === "IDST" ? "chip-idst" : "chip-iust"}
        />
      ),
    },
    { field: "date", headerName: "Date", minWidth: 120, flex: 0.6, editable: true },
    { field: "value", headerName: "Value (Cr)", minWidth: 140, flex: 0.7, editable: true },
    {
      field: "status",
      headerName: "Status",
      minWidth: 160,
      flex: 0.8,
      editable: true,
      type: "singleSelect",
      valueOptions: ["BQ Submitted", "Not Submitted"],
      renderCell: (params) => (
        <Chip
          label={params.value}
          className={params.value === "BQ Submitted" ? "chip-submitted" : "chip-not"}
        />
      ),
    },
    {
      field: "owner",
      headerName: "Lead Owner",
      minWidth: 140,
      flex: 0.7,
      editable: true,
      type: "singleSelect",
      valueOptions: ["E1", "E2"],
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 90,
      flex: 0.5,
      renderCell: (params) => (
        <Button className="delete-btn" onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: counter,
        slno: counter,
        leadTitle: "",
        customer: "",
        type: "",
        date: "",
        value: "",
        status: "",
        owner: "",
      },
    ]);
    setCounter(counter + 1);
  };

  return (
  <Box className="table-wrapper">

    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddRow}
      className="add-btn"
    >
      Add Row
    </Button>

    <div className="grid-container">
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        autoHeight
        disableColumnResize={false}
        processRowUpdate={(newRow) => newRow}
        sx={{
          borderRadius: "10px",
          backgroundColor: "white",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#003366",
            color: "darkblue",
            fontSize: "16px",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#e8f3ff",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f8fbff",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#d6eaff",
            cursor: "pointer",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #b8cbe0",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
        }}
      />
    </div>
  </Box>
);
}