// import React from "react";
// import { Container } from "@mui/material";
// import Scraper from "./components/Scraper";
// import ResponsiveAppBar from "./components/Navbar"

// export default function App() {
//   return (
//     <>
//       <ResponsiveAppBar />
//       <Container sx={{ mt: 4 }}>
//         <Scraper />
//       </Container>
//     </>
//   );
// }

import React from "react";
import { Container, Box } from "@mui/material";
import Scraper from "./components/Scraper";
import ResponsiveAppBar from "./components/Navbar";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <ResponsiveAppBar />
      <Container sx={{ mt: 4 }}>
        <Scraper />
      </Container>
       <Toaster richColors position="top-right" />
    </Box>
  );
}
