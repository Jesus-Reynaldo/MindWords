import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { styles, getLevelColor } from "../styles/style";
import { useEffect, useState } from "react";
import type { GrammarTopic } from "../interfaces/grammar.interface";
import { getGrammarTopics } from "../services/supabaseGrammar";
import { Loading } from "../../../shares/components/Loading";
import { useNavigate } from "react-router";
import { BookOpen, Plus, Sparkles, ArrowRight, GraduationCap } from "lucide-react";
import { AddGrammarModal } from "../components/AddGrammarModal";

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const GrammarTopicsPage = () => {
  const navigate = useNavigate();
  const [grammarTopics, setGrammarTopics] = useState<GrammarTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchGrammarTopics = async () => {
      const topics: GrammarTopic[] = await getGrammarTopics();
      setGrammarTopics(topics);
      setLoading(false);
    };
    fetchGrammarTopics();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={styles.box.mainContent}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pt: { xs: 3.5, sm: 4.5, md: 5.5 },
          pb: { xs: 7, sm: 9, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* Counter pill */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.8,
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "2rem",
            px: 1.8,
            py: 0.5,
            mb: 0.5,
          }}
        >
          <Sparkles size={13} color="#c4b5fd" />
          <Typography
            sx={{
              color: "#c4b5fd",
              fontSize: "0.78rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}
          >
            {grammarTopics.length} topic{grammarTopics.length !== 1 && "s"}
          </Typography>
        </Box>

        <Typography variant="h2" sx={styles.mainTitle}>
          Grammar Topics
        </Typography>

        <Typography
          sx={{
            color: "rgba(196,181,253,0.7)",
            fontSize: { xs: "0.85rem", md: "0.95rem" },
            fontFamily: "'DM Sans', sans-serif",
            textAlign: "center",
            maxWidth: "420px",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 1,
          }}
        >
          Master English grammar with AI-powered lessons
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ ...styles.addGrammarButton, mt: 1 }}
          onClick={() => setOpenModal(true)}
          startIcon={<Plus size={16} />}
        >
          New topic
        </Button>
      </Box>

      {/* Content */}
      <Box
        sx={{
          px: { xs: 1.5, sm: 2.5, md: 4 },
          pb: 6,
          mt: { xs: -4, sm: -5, md: -5 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {grammarTopics.length === 0 ? (
          /* Empty state */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: { xs: 6, md: 10 },
              px: 2,
              gap: 2,
              bgcolor: "#ffffff",
              borderRadius: "1.25rem",
              boxShadow: "0 2px 12px rgba(47,15,87,0.06)",
              maxWidth: 440,
              mx: "auto",
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "1rem",
                background: "linear-gradient(135deg, #ede9fe, #f3e8ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap size={30} color="#7a00e9" strokeWidth={1.8} />
            </Box>
            <Typography
              sx={{
                color: "#1a0a33",
                fontSize: "1.15rem",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              No topics yet
            </Typography>
            <Typography
              sx={{
                color: "#7c6f9b",
                fontSize: "0.88rem",
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "center",
                maxWidth: 300,
                lineHeight: 1.6,
              }}
            >
              Create your first grammar topic and our AI will build a complete lesson for you.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              startIcon={<Plus size={16} />}
              sx={{
                mt: 0.5,
                textTransform: "none",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                bgcolor: "#7a00e9",
                borderRadius: "0.75rem",
                px: 2.5,
                py: 1,
                boxShadow: "0 4px 14px rgba(122,0,233,0.25)",
                "&:hover": { bgcolor: "#6600c7" },
              }}
            >
              Create first topic
            </Button>
          </Box>
        ) : (
          /* Cards grid */
          <Box sx={styles.box.card}>
            {grammarTopics.map((topic, index) => {
              const levelColor = getLevelColor(topic.levelEnglish);
              const levelIndex = LEVEL_ORDER.indexOf(topic.levelEnglish);

              return (
                <Card
                  key={topic.id ?? index}
                  sx={{
                    ...styles.paper.mainContent,
                    opacity: 0,
                    animation: "fadeUp 0.45s ease-out forwards",
                    animationDelay: `${index * 0.06}s`,
                    "@keyframes fadeUp": {
                      from: { opacity: 0, transform: "translateY(16px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/grammar/${topic.id}`)}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      p: 0,
                    }}
                  >
                    {/* Color accent bar */}
                    <Box
                      sx={{
                        height: 3,
                        width: "100%",
                        background: `linear-gradient(90deg, ${levelColor.border}, ${levelColor.bg})`,
                      }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        p: { xs: 2, md: 2.5 },
                        flex: 1,
                        "&:last-child": { pb: { xs: 2, md: 2.5 } },
                      }}
                    >
                      {/* Level badge + dots */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Chip
                          label={topic.levelEnglish}
                          size="small"
                          sx={{
                            bgcolor: levelColor.bg,
                            color: levelColor.text,
                            border: `1px solid ${levelColor.border}`,
                            fontWeight: 700,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.7rem",
                            letterSpacing: "0.06em",
                            height: 24,
                            boxShadow: `0 2px 8px ${levelColor.glow}`,
                          }}
                        />
                        <Box sx={{ display: "flex", gap: 0.4 }}>
                          {LEVEL_ORDER.map((_, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                bgcolor:
                                  i <= levelIndex ? levelColor.border : "#e8e5f0",
                                transition: "background-color 0.3s",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Title */}
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          minHeight: { xs: 48, md: 56 },
                        }}
                      >
                        <Typography sx={styles.typography.cardTitle}>
                          {topic.title}
                        </Typography>
                      </Box>

                      {/* Footer */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pt: 1.2,
                          borderTop: "1px solid #f0ecf8",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.6,
                          }}
                        >
                          <BookOpen size={13} color="#a89cc4" />
                          <Typography
                            sx={{
                              color: "#a89cc4",
                              fontSize: "0.74rem",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {topic.examples?.length || 0} example
                            {(topic.examples?.length || 0) !== 1 && "s"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.3,
                            color: "#b8aed1",
                            transition: "all 0.3s ease",
                            ".MuiCardActionArea-root:hover &": {
                              color: "#7a00e9",
                              gap: 0.6,
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.74rem",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            Study
                          </Typography>
                          <ArrowRight size={13} />
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>

      <AddGrammarModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};
