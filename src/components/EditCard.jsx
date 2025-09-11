import React from "react";
import { Paper, Typography, TextField, useMediaQuery, useTheme, Divider } from "@mui/material";

export default function EditCard({ meta, setMeta }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 const cardStyle = {
  p: isMobile ? 2 : 3,
  background: theme.palette.grey[50],
  borderRadius: 16,
  boxShadow: theme.shadows[2],
  maxWidth: 900,
  margin: "0 auto",
};
  return (
    <Paper sx={cardStyle} elevation={4}>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom align="center">
        Edit Meta Tags
      </Typography>
      <Divider sx={{ mb: isMobile ? 2 : 3 }} />
      <TextField
        label="Title"
        fullWidth
        value={meta.title}
        onChange={(e) => setMeta({ ...meta, title: e.target.value })}
        sx={{ mb: isMobile ? 1.5 : 2 }}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={meta.description}
        onChange={(e) => setMeta({ ...meta, description: e.target.value })}
        sx={{ mb: isMobile ? 1.5 : 2 }}
      />
      <TextField
        label="Image URL"
        fullWidth
        value={meta.image}
        onChange={(e) => setMeta({ ...meta, image: e.target.value })}
        sx={{ mb: isMobile ? 1.5 : 2 }}
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