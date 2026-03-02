import { useEffect, useState } from "react";
import type { GrammarTopic } from "../interfaces/grammar.interface";
import { getGrammarTopicById } from "../services/supabaseGrammar";
import { useParams, useNavigate } from "react-router";
import { Loading } from "../../../shares/components/Loading";
import { GrammarTopicContent } from "../components/GrammarTopicContent";
import { GrammarTopicPracticing } from "../components/GrammarTopicPracticing";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { getLevelColor } from "../styles/style";

export const GrammarPage = () => {
  const { grammarId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [grammarTopic, setGrammarTopic] = useState<GrammarTopic | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "practice">("content");

  useEffect(() => {
    const fetchGrammarTopic = async () => {
      if (grammarId) {
        const topic = await getGrammarTopicById(grammarId);
        if (!topic) {
          navigate("/grammar");
          return;
        }
        setGrammarTopic(topic);
        setLoading(false);
      }
    };
    fetchGrammarTopic();
  }, [grammarId, navigate]);

  if (loading || !grammarTopic) {
    return <Loading />;
  }

  const levelColor = getLevelColor(grammarTopic.levelEnglish);

  return (
    <Box
      sx={{
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
          height: { xs: "200px", md: "240px" },
          background: "linear-gradient(160deg, #1a0a33 0%, #2f0f57 35%, #5a1fad 70%, #7a00e9 100%)",
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pt: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          px: { xs: 1.5, sm: 2.5, md: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <IconButton
            onClick={() => navigate("/grammar")}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ArrowLeft size={20} />
          </IconButton>
          <Chip
            label={grammarTopic.levelEnglish}
            size="small"
            sx={{
              bgcolor: levelColor.bg,
              color: levelColor.text,
              border: `1px solid ${levelColor.border}`,
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              height: 24,
            }}
          />
        </Box>
        <Typography
          sx={{
            color: "#ffffff",
            fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.9rem" },
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            maxWidth: 700,
            pl: { xs: 0.5, md: 0 },
          }}
        >
          {grammarTopic.title}
        </Typography>
      </Box>

      {/* Tab switcher (mobile only) */}
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          gap: 1,
          px: { xs: 1.5, sm: 2.5 },
          mb: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Button
          variant={activeTab === "content" ? "contained" : "outlined"}
          size="small"
          onClick={() => setActiveTab("content")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            borderRadius: "0.625rem",
            px: 2,
            ...(activeTab === "content"
              ? { bgcolor: "#fff", color: "#2f0f57", "&:hover": { bgcolor: "#f5f0ff" } }
              : {
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.05)" },
                }),
          }}
        >
          Lesson
        </Button>
        <Button
          variant={activeTab === "practice" ? "contained" : "outlined"}
          size="small"
          onClick={() => setActiveTab("practice")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            borderRadius: "0.625rem",
            px: 2,
            ...(activeTab === "practice"
              ? { bgcolor: "#fff", color: "#2f0f57", "&:hover": { bgcolor: "#f5f0ff" } }
              : {
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.05)" },
                }),
          }}
        >
          Practice
        </Button>
      </Box>

      {/* Two-panel content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 2.5, md: 4 },
          pb: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: { xs: 2, md: 3 },
          alignItems: "start",
        }}
      >
        {/* Content panel */}
        <Box sx={{ display: { xs: activeTab === "content" ? "block" : "none", lg: "block" } }}>
          <GrammarTopicContent grammarTopic={grammarTopic} />
        </Box>

        {/* Practice panel */}
        <Box sx={{ display: { xs: activeTab === "practice" ? "block" : "none", lg: "block" } }}>
          <GrammarTopicPracticing grammarTopic={grammarTopic} />
        </Box>
      </Box>
    </Box>
  );
};
