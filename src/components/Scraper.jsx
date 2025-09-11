import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EditCard from "./EditCard";
import CopyCard from "./CopyCard";
import PreviewCard from "./PreviewCard";
import { toast } from "sonner";


function ScraperForm({ url, setUrl, loading, errorMsg, handleSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        p: isMobile ? 2 : 3,
        background: theme.palette.grey[50],
        borderRadius: 16,
        boxShadow: theme.shadows[2],
        maxWidth: 900,
        margin: "0 auto",
        mb: 3,
      }}
      elevation={4}
    >
      <Typography
        variant={isMobile ? "h6" : "h5"}
        align="center"
        sx={{ fontWeight: "bold", color: "primary.main", mb: isMobile ? 1.5 : 2 }}
        gutterBottom
      >
        Free Generate Meta Tags
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          label="Website URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          size="small"
          sx={{ mb: isMobile ? 1.5 : 0 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={20} /> : "Check"}
        </Button>
      </Box>
      {errorMsg && (
        <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
          {errorMsg}
        </Typography>
      )}
    </Paper>
  );
}


function parseMeta(htmlString, baseUrl) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const title =
    doc.querySelector("meta[property='og:title']")?.content ||
    doc.querySelector("title")?.innerText ||
    "";
  const description =
    doc.querySelector("meta[property='og:description']")?.content ||
    doc.querySelector("meta[name='description']")?.content ||
    "";
  const image =
    doc.querySelector("meta[property='og:image']")?.content ||
    doc.querySelector("meta[name='twitter:image']")?.content ||
    "";
  const canonical =
    doc.querySelector("link[rel='canonical']")?.href || baseUrl;

  return { title, description, image, canonical, baseUrl };
}

// async function fetchPage(url) {
//   const encoded = encodeURIComponent(url);
//   const proxy = `https://api.allorigins.win/raw?url=${encoded}`;
//   const res = await axios.get(proxy, { responseType: "text" });
//   return res.data;
// }

async function fetchPage(url) {
  const encoded = encodeURIComponent(url);
  const proxy = `https://api.codetabs.com/v1/proxy?quest=${encoded}`;
  const res = await axios.get(proxy, { responseType: "text" });
  return res.data;
}

export default function Scraper() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [meta, setMeta] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setErrorMsg("");
    setMeta(null);

    try {
      let targetUrl = url.trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = "https://" + targetUrl;
      }
      const html = await fetchPage(targetUrl);
      const data = parseMeta(html, targetUrl);

      
      if (data.title || data.description || data.image) {
        setMeta(data);
        toast.success("Successfully fetched all the meta data");
      } else {
        setErrorMsg("No meta tags found for this URL");
        toast.error("No meta tags found");
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.warn("Copy failed", e);
    }
  };

  return (
    <>
      <ScraperForm
        url={url}
        setUrl={setUrl}
        loading={loading}
        errorMsg={errorMsg}
        handleSubmit={handleSubmit}
      />

      {meta && (
        <Grid container spacing={3} sx={{ px: 1 }}>
          <Grid size={{xs:12, sm:12, md:4}}>
            <EditCard meta={meta} setMeta={setMeta} />
          </Grid>
          <Grid size={{xs:12, sm:12, md:4}}>
            <CopyCard meta={meta} copyToClipboard={copyToClipboard} />
          </Grid>
          <Grid size={{xs:12, sm:12, md:4}}>
            <PreviewCard meta={meta} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
