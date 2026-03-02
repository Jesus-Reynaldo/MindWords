const font = {
  heading: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalStyles: Record<string, any> = {
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "1rem",
      overflow: "hidden",
      maxWidth: { xs: "95vw", sm: 480 },
      width: "100%",
      boxShadow: "0 24px 64px rgba(47,15,87,0.2)",
    },
  },
  dialogTitle: {
    background: "linear-gradient(135deg, #2f0f57 0%, #5b21b6 100%)",
    color: "#fff",
    py: 2.5,
    px: { xs: 2.5, md: 3 },
    fontFamily: font.heading,
  },
  dialogContent: {
    bgcolor: "#fff",
    py: 3,
    px: { xs: 2.5, md: 3 },
  },
  dialogContentText: {
    mb: 2.5,
    color: "#5d4a7a",
    fontFamily: font.body,
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  dialogActions: {
    bgcolor: "#fff",
    px: { xs: 2.5, md: 3 },
    pb: 2.5,
    pt: 1.5,
    borderTop: "1px solid #f0ecf8",
    gap: 1,
  },
  cancelButton: {
    textTransform: "none",
    fontWeight: 500,
    fontFamily: font.body,
    color: "#7c6f9b",
    borderRadius: "0.625rem",
    px: 2,
    "&:hover": {
      bgcolor: "#f8f6ff",
    },
  },
  submitButton: {
    textTransform: "none",
    fontWeight: 600,
    fontFamily: font.body,
    fontSize: "0.9rem",
    bgcolor: "#7a00e9",
    color: "#fff",
    borderRadius: "0.625rem",
    px: 2.5,
    boxShadow: "0 2px 8px rgba(122,0,233,0.2)",
    "&:hover": {
      bgcolor: "#6600c7",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.625rem",
      fontFamily: font.body,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#a78bfa",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7a00e9",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: font.body,
      "&.Mui-focused": {
        color: "#7a00e9",
      },
    },
  },
  select: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.625rem",
      fontFamily: font.body,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#a78bfa",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7a00e9",
        borderWidth: 2,
      },
    },
  },
};
