import React from "react";
import { Paper, Typography, Box } from "@mui/material";

export default function PreviewCard({ meta }) {
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Preview
      </Typography>

      {/* Facebook Preview */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Facebook</Typography>
        {meta.image && (
          <img
            src={meta.image}
            alt="Preview"
            style={{
              width: "100%",
              borderRadius: 8,
              marginBottom: 8,
            }}
          />
        )}
        <Typography variant="body1">{meta.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {meta.description}
        </Typography>
      </Box>

      {/* Twitter Preview */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Twitter</Typography>
        {meta.image && (
          <img
            src={meta.image}
            alt="Preview"
            style={{
              width: "100%",
              borderRadius: 8,
              marginBottom: 8,
            }}
          />
        )}
        <Typography variant="body1">{meta.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {meta.description}
        </Typography>
      </Box>
    </Paper>
  );
}
