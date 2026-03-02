import { Box, Paper, Typography } from "@mui/material";
import { styles } from "../styles/style";
import type { GrammarTopic } from "../interfaces/grammar.interface";
import { BookOpen, Lightbulb, List } from "lucide-react";

interface Props {
  grammarTopic: GrammarTopic;
}

export const GrammarTopicContent = ({ grammarTopic }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "1rem",
        boxShadow: "0 1px 3px rgba(47,15,87,0.06), 0 4px 16px rgba(47,15,87,0.04)",
        border: "1px solid rgba(146,82,224,0.08)",
        overflow: "hidden",
        p: { xs: 2, sm: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {/* Explanation */}
      <Box sx={styles.explainingBox.container}>
        <Typography variant="h6" sx={styles.explainingBox.title}>
          <Lightbulb size={16} color="#5b21b6" />
          Explanation
        </Typography>
        <Typography variant="body1" sx={styles.explainingBox.text}>
          {grammarTopic.explanation}
        </Typography>
      </Box>

      {/* Formulates */}
      <Box sx={styles.formulateBox.container}>
        <Typography variant="h6" sx={styles.formulateBox.title}>
          <List size={16} color="#ffffff" />
          Structure
        </Typography>
        {grammarTopic.formulates.map((formulate, index) => (
          <Typography variant="body1" sx={styles.formulateBox.text} key={index}>
            {formulate}
          </Typography>
        ))}
      </Box>

      {/* Examples */}
      <Box sx={styles.explainingBox.container}>
        <Typography variant="h6" sx={styles.explainingBox.title}>
          <BookOpen size={16} color="#5b21b6" />
          Examples
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {grammarTopic.examples.map((example, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 1.2,
                alignItems: "baseline",
              }}
            >
              <Typography
                sx={{
                  color: "#a78bfa",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  minWidth: 20,
                }}
              >
                {index + 1}.
              </Typography>
              <Typography variant="body1" sx={styles.explainingBox.text}>
                {example}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
