import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, Button, Paper, Typography, Select, MenuItem } from '@mui/material';
import StudentTable from './Table';
import './App.css';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';

const StudentManager = () => {
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryData, setEntryData] = useState({ id: null, name: '', email: '', rollNumber: '', branch: '', year: '' });
  const [editingMode, setEditingMode] = useState(false);
  const formRef = useRef(null); // 🔹 Reference to the form

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch(USERS_API);
      const users = await response.json();
      
      const combinedData = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        rollNumber: `R${user.id * 100}`,
        branch: ['CSE', 'ECE', 'ME', 'CE'][user.id % 4],
        year: (user.id % 4) + 1
      }));

      setEntries(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEntryData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    // Check if all fields are filled
    if (!entryData.name || !entryData.email || !entryData.rollNumber || !entryData.branch || !entryData.year) {
      alert("Please fill all fields before submitting.");
      return;
    }
  
    editingMode ? modifyEntry(entryData.id) : addEntry();
    resetForm();
  };
  

  const addEntry = () => {
    setEntries([{ id: Date.now(), ...entryData }, ...entries]);
  };

  const modifyEntry = (id) => {
    setEntries(entries.map(item => (item.id === id ? { ...item, ...entryData } : item)));
  };

  const removeEntry = (id) => {
    setEntries(entries.filter(item => item.id !== id));
  };

  const editEntry = (entry) => {
    setEntryData(entry);
    setEditingMode(true);

    // 🔹 Scroll to the form smoothly
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetForm = () => {
    setEntryData({ id: null, name: '', email: '', rollNumber: '', branch: '', year: '' });
    setEditingMode(false);
  };

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="container" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.15)', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h3" gutterBottom align="center" className="header" style={{ color: 'dark blue' }}>
        Student Record System
      </Typography>

      {/* 🔹 Ref applied to the form for scrolling */}
      <Paper ref={formRef} elevation={3} className="form-container" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(15px)', padding: '20px', borderRadius: '10px' }}>
        <form onSubmit={handleFormSubmit} className="form">
          <TextField fullWidth label="Full Name" name="name" value={entryData.name} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Email Address" name="email" value={entryData.email} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Roll Number" name="rollNumber" value={entryData.rollNumber} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Branch" name="branch" value={entryData.branch} onChange={handleInputChange} margin="normal" />

          {/* Dropdown for Year Selection */}
          <Select fullWidth name="year" value={entryData.year} onChange={handleInputChange} displayEmpty margin="normal">
            <MenuItem value="" disabled>Select Year</MenuItem>
            <MenuItem value={1}>1st Year</MenuItem>
            <MenuItem value={2}>2nd Year</MenuItem>
            <MenuItem value={3}>3rd Year</MenuItem>
            <MenuItem value={4}>4th Year</MenuItem>
          </Select>

          <div className="button-group">
            <Button type="submit" variant="contained" style={{ background: '#3f51b5', color: '#ffffff' }}>
              {editingMode ? 'Update' : 'Add'}
            </Button>
            <Button variant="outlined" onClick={resetForm} style={{ borderColor: '#f50057', color: '#f50057' }}>
              Reset
            </Button>
          </div>
        </form>
      </Paper>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search Students"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        margin="normal"
        style={{ background: 'rgba(255, 255, 255, 0.3)', borderRadius: '5px' }}
      />

      {/* Render the Table with Filtered Data */}
      <StudentTable entries={filteredEntries} editEntry={editEntry} removeEntry={removeEntry} />
    </Container>
  );
};

export default StudentManager;
