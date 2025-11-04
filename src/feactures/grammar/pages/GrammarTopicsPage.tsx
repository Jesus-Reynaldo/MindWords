import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { styles } from "../styles/style";
import { useEffect, useState } from "react";
import type { GrammarTopic } from "../interfaces/grammar.interface";
import { getGrammarTopics } from "../services/supabaseGrammar";
import { Loading } from "../../../shares/components/Loading";
import { useNavigate } from "react-router";
import { BookOpen, Plus } from 'lucide-react';
import { generateGrammarTopicWithGemini } from "../services/api_grammar_gemini";
import { AddGrammarModal } from "../components/AddGrammarModal";

export const GrammarTopicsPage = () => {
  const navigate = useNavigate();
  const [grammarTopics, setGrammarTopics] = useState<GrammarTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchGrammarTopics = async () => {
      const topics: GrammarTopic[] = await getGrammarTopics();
      setGrammarTopics(topics);
      const topic = await generateGrammarTopicWithGemini("Paired Conjunctions: Both ... And; Not Only ... But Also; Either ... Or; Neither ... Nor", "C1");
      console.log("Topic: ",topic);
    };
    fetchGrammarTopics();

  }, []);
  /*if (grammarTopics.length == 0) {
    return (
      <Box sx={styles.box.mainContent}>
        <Typography variant="h2" sx={styles.typography.grammarTopic}>
          No grammar topics found
        </Typography>
      </Box>
    );
  }*/

  useEffect(() => {
    if (grammarTopics) {
      setLoading(false);
    }
  }, [grammarTopics]);
  if (loading) {
    return <Loading />;
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={styles.box.mainContent}>
      <Typography variant="h2" sx={styles.mainTitle}>
        Grammar Topics
      </Typography>
      <Button variant="contained"  size="large" sx={styles.addGrammarButton} onClick={handleOpenModal} startIcon={<Plus />}>
        Add a new topic
      </Button>
      <Box sx={styles.box.card}>
        {grammarTopics.map((grammarTopic, index) => (
          <Card sx={styles.paper.mainContent} key={index}>
            <CardActionArea
              onClick={() => navigate(`/grammar/${grammarTopic?.id}`)}
              sx={{
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
                },
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Box sx={{minHeight: "100px" , display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <Typography variant="subtitle1" sx={styles.typography.cardTitle}>
                    {grammarTopic?.title}
                  </Typography>
                </Box>
                <Box sx={styles.level.container}>
                  <Typography variant="h6" sx={styles.explainingBox.title}>
                    Level
                  </Typography>
                  <Typography variant="body1" sx={styles.explainingBox.text}>
                    {grammarTopic?.levelEnglish}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" sx={styles.typography.grammarTopic } onClick={() => navigate(`/grammar/${grammarTopic?.id}`)}><BookOpen /> See </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <AddGrammarModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};
