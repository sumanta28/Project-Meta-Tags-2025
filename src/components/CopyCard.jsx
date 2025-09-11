import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyCard({ meta, copyToClipboard }) {
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
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        mb={1.5}
        gap={isMobile ? 1 : 0}
      >
        <Typography variant={isMobile ? "h6" : "h5"}>
          Copy Meta Tags
        </Typography>
        <Tooltip title="Copy All">
          <IconButton onClick={() => copyToClipboard(buildMetaHTML(meta))}>
            <ContentCopyIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={{ mb: isMobile ? 1 : 2 }} />
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontSize: isMobile ? "0.85rem" : "1rem",
          fontFamily: "monospace",
          background: theme.palette.background.paper,
          borderRadius: 8,
          padding: isMobile ? "8px" : "12px",
          width: "100%",
          margin: 0,
        }}
      >
        {buildMetaHTML(meta)}
      </pre>
    </Paper>
  );

  function buildMetaHTML(data) {
    return `
<title>${data.title}</title>
<meta name="description" content="${data.description}" />
<meta property="og:title" content="${data.title}" />
<meta property="og:description" content="${data.description}" />
<meta property="og:image" content="${data.image}" />
<link rel="canonical" href="${data.canonical}" />
    `.trim();
  }
}


