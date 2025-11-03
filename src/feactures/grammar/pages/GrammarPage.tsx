import { Box, Paper, Typography } from "@mui/material";
import { styles } from "../styles/style";
import { useEffect, useState } from "react";
import type { GrammarTopic } from "../interfaces/grammar.interface";
import { getGrammarTopicById } from "../services/supabaseGrammar";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Loading } from "../../../shares/components/Loading";

export const GrammarPage = () => {
  let {grammarId} = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [grammarTopic, setGrammarTopic] = useState<GrammarTopic | null>(null);

  useEffect(() => {
    const fetchGrammarTopic = async () => {
      if (grammarId){
        const topic: GrammarTopic | null = await getGrammarTopicById(grammarId);
        if (!topic){
          navigate("/");
        };
        setGrammarTopic(topic);
      };
    };
    fetchGrammarTopic();
  }, []);
  useEffect(() => {
    if (grammarTopic){
      setLoading(false);
    }
  }, [grammarTopic]);
  if (loading){
    return <Loading />;
  }
  return (
    <Box sx={styles.box.mainContent}>
      <Paper sx={styles.paper.mainContent}>
        <Typography variant="h2" sx={styles.typography.grammarTopic}>
          Grammar Topic
        </Typography>
        <Typography variant="h1" sx={styles.typography.titleGrammar}>
          {grammarTopic?.title}
        </Typography>
        <Box sx={styles.explainingBox.container}>
          <Typography variant="h6" sx={styles.explainingBox.title}>
            Explanation
          </Typography>
          <Typography variant="body1" sx={styles.explainingBox.text}>
            {grammarTopic?.explanation}
          </Typography>
        </Box>
        <Box sx={styles.formulateBox.container}>
          <Typography variant="h6" sx={styles.formulateBox.title}>
            Formulate
          </Typography>
          {grammarTopic?.formulates.map((formulate, index) => (
            <Typography variant="body1" sx={styles.formulateBox.text} key={index}>
              {formulate}
            </Typography>
          ))}
        </Box>
         <Box sx={styles.explainingBox.container}>
          <Typography variant="h6" sx={styles.explainingBox.title}>
            Examples
          </Typography>
          {grammarTopic?.examples.map((example, index) => (
            <Typography variant="body1" sx={styles.explainingBox.text} key={index}>
              {example}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
