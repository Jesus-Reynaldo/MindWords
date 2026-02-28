const font = {
  heading: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const vocabStyles: Record<string, any> = {
  /* ── Page wrapper ── */
  pageBackground: {
    width: "100%",
    minHeight: "100vh",
    background: "#f8f6ff",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: { xs: "320px", sm: "360px", md: "380px" },
      background:
        "linear-gradient(160deg, #1a0a33 0%, #2f0f57 35%, #5a1fad 70%, #7a00e9 100%)",
      zIndex: 0,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: "-20%",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(146,82,224,0.25) 0%, transparent 70%)",
      zIndex: 0,
      pointerEvents: "none",
    },
  },

  /* ── Inner content wrapper ── */
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    maxWidth: "960px",
    mx: "auto",
    px: { xs: 2, sm: 3 },
    py: { xs: 3, sm: 4 },
  },

  /* ── Hero header ── */
  heroTitle: {
    color: "#ffffff",
    fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
    fontWeight: 700,
    fontFamily: font.heading,
    letterSpacing: "-0.02em",
    textAlign: "center",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: { xs: "0.85rem", md: "0.95rem" },
    fontFamily: font.body,
    textAlign: "center",
    mt: 0.5,
  },
  wordCountPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontWeight: 600,
    fontFamily: font.body,
    fontSize: "0.85rem",
    color: "#f5f0ff",
    bgcolor: "rgba(255,255,255,0.15)",
    borderRadius: "1.25rem",
    px: 2,
    py: 0.5,
    border: "1px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
  },
  heroButton: {
    textTransform: "none",
    fontWeight: 600,
    fontFamily: font.body,
    fontSize: { xs: "0.85rem", md: "0.92rem" },
    bgcolor: "rgba(255,255,255,0.15)",
    color: "#ffffff",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
    px: { xs: 2.5, md: 3 },
    py: 1.1,
    transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.25)",
      border: "1px solid rgba(255,255,255,0.4)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    },
  },

  /* ── Form card ── */
  formCard: {
    background: "#ffffff",
    borderRadius: "1rem",
    boxShadow:
      "0 1px 3px rgba(47,15,87,0.06), 0 4px 16px rgba(47,15,87,0.04)",
    border: "1px solid rgba(146,82,224,0.08)",
    p: { xs: 2.5, sm: 3.5 },
    mb: 3,
  },
  sectionTitle: {
    color: "#1a0a33",
    fontSize: { xs: "1.1rem", md: "1.25rem" },
    fontWeight: 700,
    fontFamily: font.heading,
    letterSpacing: "-0.01em",
    mb: 2,
  },
  fieldLabel: {
    color: "#3d3556",
    fontSize: "0.82rem",
    fontWeight: 600,
    fontFamily: font.body,
    mb: 0.5,
  },

  /* ── Text fields ── */
  textField: {
    "& .MuiOutlinedInput-root": {
      fontFamily: font.body,
      fontSize: "0.9rem",
      borderRadius: "0.75rem",
      backgroundColor: "#faf8ff",
      "& fieldset": {
        borderColor: "#e4d9f7",
      },
      "&:hover fieldset": {
        borderColor: "#c4b5fd",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7a00e9",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: font.body,
      fontSize: "0.88rem",
      color: "#6b5b8a",
      "&.Mui-focused": {
        color: "#7a00e9",
      },
    },
  },

  /* ── Search icon button ── */
  searchButton: {
    color: "#7a00e9",
    bgcolor: "rgba(122,0,233,0.08)",
    borderRadius: "0.625rem",
    "&:hover": {
      bgcolor: "rgba(122,0,233,0.15)",
    },
  },

  /* ── Submit / primary button ── */
  submitButton: {
    textTransform: "none",
    fontWeight: 600,
    fontFamily: font.body,
    fontSize: "0.92rem",
    background: "linear-gradient(135deg, #7a00e9 0%, #5b21b6 100%)",
    color: "#ffffff",
    borderRadius: "0.75rem",
    px: 3.5,
    py: 1.2,
    boxShadow: "0 4px 14px rgba(122,0,233,0.3)",
    transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
    "&:hover": {
      background: "linear-gradient(135deg, #6b00d4 0%, #4c1d95 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(122,0,233,0.35)",
    },
  },

  /* ── Chips ── */
  chipType: {
    fontFamily: font.body,
    fontWeight: 600,
    fontSize: "0.78rem",
    bgcolor: "#ede9fe",
    color: "#5b21b6",
    border: "1px solid #c4b5fd",
  },
  chipSynonym: {
    fontFamily: font.body,
    fontWeight: 500,
    fontSize: "0.78rem",
    bgcolor: "#dcfce7",
    color: "#166534",
    border: "1px solid #86efac",
  },
  chipAntonym: {
    fontFamily: font.body,
    fontWeight: 500,
    fontSize: "0.78rem",
    bgcolor: "#ffe4e6",
    color: "#9f1239",
    border: "1px solid #fda4af",
  },
  chipLabel: {
    color: "#6b5b8a",
    fontSize: "0.78rem",
    fontWeight: 600,
    fontFamily: font.body,
    mr: 0.5,
  },

  /* ── Grammar feedback alert ── */
  feedbackAlert: {
    borderRadius: "0.875rem",
    border: "1px solid #fde68a",
    bgcolor: "#fffbeb",
    p: { xs: 2, md: 2.5 },
    mt: 2,
  },
  feedbackTitle: {
    color: "#92400e",
    fontWeight: 700,
    fontFamily: font.body,
    fontSize: "0.92rem",
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 0.5,
  },
  feedbackText: {
    color: "#78350f",
    fontFamily: font.body,
    fontSize: "0.88rem",
    lineHeight: 1.6,
  },
  feedbackSuggestion: {
    color: "#78350f",
    fontFamily: font.body,
    fontSize: "0.88rem",
    fontWeight: 600,
    mt: 0.5,
  },

  /* ── Word card (list) ── */
  wordCard: {
    background: "#ffffff",
    borderRadius: "1rem",
    boxShadow:
      "0 1px 3px rgba(47,15,87,0.06), 0 4px 16px rgba(47,15,87,0.04)",
    border: "1px solid rgba(146,82,224,0.08)",
    overflow: "hidden",
    transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        "0 8px 24px rgba(47,15,87,0.1), 0 4px 12px rgba(122,0,233,0.06)",
      border: "1px solid rgba(146,82,224,0.15)",
    },
  },
  wordCardContent: {
    p: { xs: 2, md: 2.5 },
  },
  wordTitle: {
    color: "#1a0a33",
    fontSize: { xs: "1rem", md: "1.1rem" },
    fontWeight: 700,
    fontFamily: font.heading,
    letterSpacing: "-0.01em",
  },
  wordDefinition: {
    color: "#3d3556",
    fontSize: { xs: "0.85rem", md: "0.9rem" },
    fontFamily: font.body,
    lineHeight: 1.6,
    mt: 0.5,
  },
  wordMeta: {
    color: "#6b5b8a",
    fontSize: "0.78rem",
    fontFamily: font.body,
  },

  /* ── Level dots ── */
  levelDot: (active: boolean) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    bgcolor: active ? "#7a00e9" : "#e4d9f7",
    transition: "background-color 0.2s",
  }),

  /* ── Review progress bar ── */
  progressContainer: {
    bgcolor: "rgba(255,255,255,0.15)",
    borderRadius: "1rem",
    height: 8,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  progressBar: (pct: number) => ({
    height: "100%",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #a78bfa 0%, #ffffff 100%)",
    borderRadius: "1rem",
    transition: "width 0.5s ease",
  }),
  progressText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "0.82rem",
    fontFamily: font.body,
    fontWeight: 500,
    textAlign: "center",
    mt: 0.5,
  },

  /* ── Review card ── */
  reviewCard: {
    background: "#ffffff",
    borderRadius: "1rem",
    boxShadow:
      "0 1px 3px rgba(47,15,87,0.06), 0 8px 32px rgba(47,15,87,0.08)",
    border: "1px solid rgba(146,82,224,0.1)",
    p: { xs: 3, md: 4 },
  },
  reviewWordDisplay: {
    color: "#1a0a33",
    fontSize: { xs: "1.8rem", md: "2.2rem" },
    fontWeight: 700,
    fontFamily: font.heading,
    letterSpacing: "-0.02em",
    textAlign: "center",
  },
  definitionBox: {
    bgcolor: "#f8f6ff",
    borderRadius: "0.875rem",
    border: "1px solid #e4d9f7",
    p: { xs: 1.5, md: 2 },
    mt: 2,
  },
  definitionLabel: {
    color: "#5b21b6",
    fontSize: "0.78rem",
    fontWeight: 700,
    fontFamily: font.body,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    mb: 0.5,
  },
  definitionText: {
    color: "#3d3556",
    fontSize: { xs: "0.9rem", md: "0.95rem" },
    fontFamily: font.body,
    lineHeight: 1.6,
  },

  /* ── Sentence list in review ── */
  sentenceItem: {
    color: "#3d3556",
    fontSize: "0.88rem",
    fontFamily: font.body,
    lineHeight: 1.6,
    pl: 2,
    borderLeft: "2px solid #e4d9f7",
    my: 0.5,
  },

  /* ── Search / filter input ── */
  searchField: {
    "& .MuiOutlinedInput-root": {
      fontFamily: font.body,
      fontSize: "0.88rem",
      borderRadius: "0.75rem",
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: "#e4d9f7",
      },
      "&:hover fieldset": {
        borderColor: "#c4b5fd",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7a00e9",
        borderWidth: "2px",
      },
    },
  },

  /* ── Completion state ── */
  completionCard: {
    background: "#ffffff",
    borderRadius: "1rem",
    boxShadow:
      "0 1px 3px rgba(47,15,87,0.06), 0 8px 32px rgba(47,15,87,0.08)",
    border: "1px solid rgba(146,82,224,0.1)",
    p: { xs: 4, md: 5 },
    textAlign: "center",
  },
  completionTitle: {
    color: "#1a0a33",
    fontSize: { xs: "1.4rem", md: "1.6rem" },
    fontWeight: 700,
    fontFamily: font.heading,
    mb: 1,
  },
  completionText: {
    color: "#6b5b8a",
    fontSize: "0.95rem",
    fontFamily: font.body,
  },
};
