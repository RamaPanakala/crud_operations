import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
} from "@mui/material";

// Styles
const paperStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflowX: "auto", // Ensures table is scrollable on small screens
};

const headerStyle = {
  color: "#283593",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const tableHeaderRow = {
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
};

const tableRowStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(8px)",
  transition: "0.3s ease-in-out",
};

const textCellStyle = { color: "#2C3E50", fontWeight: "500" };

const editButtonStyle = {
  background: "linear-gradient(135deg, #4A90E2, #5C6BC0)",
  color: "#fff",
  borderRadius: "6px",
  textTransform: "capitalize",
};

const deleteButtonStyle = {
  background: "linear-gradient(135deg, #E53935, #D32F2F)",
  color: "#fff",
  borderRadius: "6px",
  textTransform: "capitalize",
};

const StudentTable = ({ entries, editEntry, removeEntry }) => {
  return (
    <Paper elevation={3} style={paperStyle}>
      <Typography variant="h5" gutterBottom align="center" style={headerStyle}>
        Student Records
      </Typography>

      <Table>
        <TableHead>
          <TableRow style={tableHeaderRow}>
            {["Name", "Email", "Roll Number", "Branch", "Year", "Edit", "Delete"].map(
              (text) => (
                <TableCell key={text} style={{ color: "#1A237E", fontWeight: "600" }}>
                  {text}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {entries.map((item) => (
            <TableRow key={item.id} style={tableRowStyle}>
              <TableCell style={textCellStyle}>{item.name}</TableCell>
              <TableCell style={textCellStyle}>{item.email}</TableCell>
              <TableCell style={textCellStyle}>{item.rollNumber}</TableCell>
              <TableCell style={textCellStyle}>{item.branch}</TableCell>
              <TableCell style={textCellStyle}>{item.year}</TableCell>
              <TableCell>
                <Button variant="contained" style={editButtonStyle} onClick={() => editEntry(item)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" style={deleteButtonStyle} onClick={() => removeEntry(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StudentTable;
