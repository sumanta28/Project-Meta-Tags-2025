import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyCard({ meta, copyToClipboard }) {
  const buildMetaHTML = (data) => {
    return `
<title>${data.title}</title>
<meta name="description" content="${data.description}" />
<meta property="og:title" content="${data.title}" />
<meta property="og:description" content="${data.description}" />
<meta property="og:image" content="${data.image}" />
<link rel="canonical" href="${data.canonical}" />
    `.trim();
  };

  return (
    <Paper sx={{ p: 2, bgcolor: "#f9f9f9",  border: "1px solid #ddd", 
    borderRadius: 2,        
  }} elevation={3}
    >
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="h6">Copy Meta Tags</Typography>
        <Tooltip title="Copy All">
          <IconButton onClick={() => copyToClipboard(buildMetaHTML(meta))}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "0.85rem",
          fontFamily: "monospace",
        }}
      >
        {buildMetaHTML(meta)}
      </pre>
    </Paper>
  );
}
