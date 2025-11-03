/*button {
  background: linear-gradient(135deg, #7C5CF4, #5A40D0);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 63, 244, 0.4);
}
*/

export const styles = {
  typography: {
    grammarTopic: {
      fontWeight: "600",
      fontFamily: "Poppins",
      fontSize: "0.9rem",
      color: "#20243E",
      backgroundColor: "#FFC857",
      borderRadius: "1.25rem",
      padding: "1.125rem",
    },
    titleGrammar: {
      color: "#ffffff",
      fontSize: "2rem",
      fontWeight: "700",
      fontFamily: "Poppins",
      padding: "0.8rem",
    },
  },
  paper: {
    mainContent: {
      backgroundColor: "#4650ba",
      borderRadius: "0.875rem",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.03)",
      padding: "2.5rem",
      marginBlock: "1.6rem",
    },
  },
  box: {
    mainContent: {
      p: 2,
      width: "100%",
      height: "100vh",
      backgroundColor: "#e9e7ff",
    },
    card: {
      width: "100%",
      display: "grid",  
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 2fr))',
      gap: 2,
    },
  },
  explainingBox: {
    container: {
      backgroundColor: "#ffffff",
      borderRadius: "0.875rem",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.03)",
      padding: "1.6rem",
    },
    title: {
      color: "#4650ba",
      fontSize: "1.1rem",
      fontWeight: "600",
    },
    text: {
      backgroundColor: "#FFFFFF",
      borderRadius: "0.875rem",
      fontSize: "0.95rem",
      color: "#20243E",
      lineHeight: "1.5",
      padding: "0.5rem",
    },
  },
  formulateBox: {
    container: {
      backgroundColor: "#7C5CF4",
      border: "none",
      borderRadius: "12px",
      padding: "10px 20px",
      marginBlock: "1.6rem",
    },
    title: {
      fontWeight: "700",
      transition: "transform 0.2s, box-shadow 0.2s",
      color: "#FFFFFF",
      fontSize: "1rem",
    },
    text: {
      transition: "transform 0.2s, box-shadow 0.2s",
      borderRadius: "0.875rem",
      fontSize: "0.95rem",
      color: "#fffffd",
      lineHeight: "1.5",
      padding: "0.5rem",
    },
    hover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(124, 92, 244, 0.4)",
    },
  },
};
