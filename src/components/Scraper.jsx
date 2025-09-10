import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Paper
} from "@mui/material";

import EditCard from "./EditCard";
import CopyCard from "./CopyCard";
import PreviewCard from "./PreviewCard";

// ScraperForm Component
function ScraperForm({ url, setUrl, loading, errorMsg, handleSubmit }) {
  return (
    <Paper sx={{ p: 2, mb: 3, maxWidth: 600, mx: "auto" }} elevation={2}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ whiteSpace: "nowrap", fontWeight: "bold", color: "primary.main" }}
        >
          Free Generate Meta Tags
        </Typography>

        <TextField
          label="Website URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          size="small"
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

// Utility Functions
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

async function fetchPage(url) {
  const encoded = encodeURIComponent(url);
  const proxy = `https://api.allorigins.win/raw?url=${encoded}`;
  const res = await axios.get(proxy, { responseType: "text" });
  return res.data;
}

0
//Scraper Component
export default function Scraper() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [meta, setMeta] = useState(null); // initially null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setErrorMsg("");
    setMeta(null); // reset before fetching

    try {
      let targetUrl = url.trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = "https://" + targetUrl;
      }
      const html = await fetchPage(targetUrl);
      const data = parseMeta(html, targetUrl);

      // only set meta if something is found
      if (data.title || data.description || data.image) {
        setMeta(data);
      } else {
        setErrorMsg("No meta tags found for this URL");
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
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:4}}>
            <EditCard meta={meta} setMeta={setMeta} />
          </Grid>
          <Grid size={{xs:12, md:4}}>
            <CopyCard meta={meta} copyToClipboard={copyToClipboard} />
          </Grid>
          <Grid size={{xs:12, md:4}}>
            <PreviewCard meta={meta} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
