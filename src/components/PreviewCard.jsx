import React from "react";
import { Paper, Typography, Box, useMediaQuery, useTheme, Divider } from "@mui/material";

export default function PreviewCard({ meta }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  
  const cardStyle = {
    p: isMobile ? 1.5 : 2,
    background: theme.palette.grey[50],
    borderRadius: 14,
    boxShadow: theme.shadows[2],
    maxWidth: 420,
    margin: "0 auto",
  };

 
  const previewBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    p: isMobile ? 1 : 1.5,
    mb: isMobile ? 1 : 1.5,
    width: "100%",
    maxWidth: 340,
  };

  const imageStyle = {
    width: "100%",
    maxHeight: isMobile ? 90 : 120,
    objectFit: "cover",
    borderRadius: 6,
    marginBottom: isMobile ? 1 : 1.5,
  };

  const titleStyle = {
    fontWeight: 600,
    mb: 0.5,
    textAlign: "center",
    fontSize: isMobile ? "1rem" : "1.1rem",
  };

  const descStyle = {
    color: theme.palette.text.secondary,
    textAlign: "center",
    mb: 0.5,
    fontSize: isMobile ? "0.85rem" : "0.95rem",
  };

  return (
    <Paper sx={cardStyle} elevation={3}>
      <Typography variant={isMobile ? "subtitle1" : "h6"} align="center" gutterBottom>
        Preview
      </Typography>
      <Divider sx={{ mb: isMobile ? 1 : 1.5 }} />

      
      <Box sx={previewBoxStyle}>
        <Typography variant={isMobile ? "body1" : "subtitle1"} sx={{ mb: 0.5 }}>
          Facebook
        </Typography>
        {meta.image && (
          <img src={meta.image} alt="Preview" style={imageStyle} />
        )}
        <Typography sx={titleStyle}>{meta.title}</Typography>
        <Typography sx={descStyle}>{meta.description}</Typography>
      </Box>

      <Divider sx={{ my: isMobile ? 1 : 1.5 }} />

      
      <Box sx={previewBoxStyle}>
        <Typography variant={isMobile ? "body1" : "subtitle1"} sx={{ mb: 0.5 }}>
          Twitter
        </Typography>
        {meta.image && (
          <img src={meta.image} alt="Preview" style={imageStyle} />
        )}
        <Typography sx={titleStyle}>{meta.title}</Typography>
        <Typography sx={descStyle}>{meta.description}</Typography>
      </Box>
    </Paper>
  );
}