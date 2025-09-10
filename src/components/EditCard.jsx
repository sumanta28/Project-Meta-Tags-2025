import React from "react";
import { Paper, Typography, TextField } from "@mui/material";

export default function EditCard({ meta, setMeta }) {
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Edit
      </Typography>
      <TextField
        label="Title"
        fullWidth
        value={meta.title}
        onChange={(e) => setMeta({ ...meta, title: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={meta.description}
        onChange={(e) => setMeta({ ...meta, description: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Image URL"
        fullWidth
        value={meta.image}
        onChange={(e) => setMeta({ ...meta, image: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Canonical URL"
        fullWidth
        value={meta.canonical}
        onChange={(e) => setMeta({ ...meta, canonical: e.target.value })}
      />
    </Paper>
  );
}
