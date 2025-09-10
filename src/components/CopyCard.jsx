// import React from "react";
// import {
//   Paper,
//   Typography,
//   IconButton,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// export default function CopyCard({ meta, copyToClipboard }) {
//   const buildMetaHTML = (data) => {
//     return `
// <title>${data.title}</title>
// <meta name="description" content="${data.description}" />
// <meta property="og:title" content="${data.title}" />
// <meta property="og:description" content="${data.description}" />
// <meta property="og:image" content="${data.image}" />
// <link rel="canonical" href="${data.canonical}" />
//     `.trim();
//   };

//   return (
//     <Paper sx={{ p: 2, bgcolor: "#f9f9f9",  border: "1px solid #ddd", 
//     borderRadius: 2,        
//   }} elevation={3}
//     >
//       <Box display="flex" justifyContent="space-between" mb={1}>
//         <Typography variant="h6">Copy Meta Tags</Typography>
//         <Tooltip title="Copy All">
//           <IconButton onClick={() => copyToClipboard(buildMetaHTML(meta))}>
//             <ContentCopyIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>
//       <pre
//         style={{
//           whiteSpace: "pre-wrap",
//           fontSize: "0.85rem",
//           fontFamily: "monospace",
//         }}
//       >
//         {buildMetaHTML(meta)}
//       </pre>
//     </Paper>
//   );
// }


import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyCard({ meta, copyToClipboard }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true for mobile screens

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
    <Paper
      sx={{
        p: isMobile ? 1 : 2, // smaller padding for mobile
        bgcolor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: 2,
        overflowX: "auto", // enable horizontal scroll on small screens
      }}
      elevation={3}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"} // stack on mobile
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        mb={1}
        gap={isMobile ? 1 : 0}
      >
        <Typography variant={isMobile ? "subtitle1" : "h6"}>
          Copy Meta Tags
        </Typography>
        <Tooltip title="Copy All">
          <IconButton onClick={() => copyToClipboard(buildMetaHTML(meta))}>
            <ContentCopyIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
      </Box>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: isMobile ? "0.75rem" : "0.85rem",
          fontFamily: "monospace",
        }}
      >
        {buildMetaHTML(meta)}
      </pre>
    </Paper>
  );
}
