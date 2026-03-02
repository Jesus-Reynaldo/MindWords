import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { modalStyles } from "../styles/modal.style";
import { useForm } from "react-hook-form";
import { generateGrammarTopicWithGemini } from "../services/api_grammar_gemini";
import type { GrammarTopic } from "../interfaces/grammar.interface";
import { insertGrammarTopic } from "../services/supabaseGrammar";
import { Sparkles } from "lucide-react";

interface AddGrammarModalProps {
  open: boolean;
  onClose: () => void;
}

interface Inputs {
  topic: string;
  levelEnglish: string;
}

export const AddGrammarModal = ({ open, onClose }: AddGrammarModalProps) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const { topic, levelEnglish } = data;
    try {
      const topicGenerated: GrammarTopic = await generateGrammarTopicWithGemini(topic, levelEnglish);
      if (topicGenerated) {
        const newTopic: GrammarTopic = {
          title: topicGenerated.title,
          levelEnglish: topicGenerated.levelEnglish,
          explanation: topicGenerated.explanation,
          formulates: topicGenerated.formulates,
          examples: topicGenerated.examples,
          createdAt: new Date().toISOString(),
        };
        const topicInsert = await insertGrammarTopic(newTopic);
        if (topicInsert) {
          onClose();
          reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={modalStyles.dialog}>
      <DialogTitle sx={modalStyles.dialogTitle}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Sparkles size={18} />
          New Grammar Topic
        </Typography>
      </DialogTitle>
      <DialogContent sx={modalStyles.dialogContent}>
        <DialogContentText sx={modalStyles.dialogContentText}>
          Enter a grammar topic and level. Our AI will generate a complete lesson with explanations, structures, and examples.
        </DialogContentText>
        <form id="add-grammar-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            label="Grammar topic"
            placeholder="e.g. Present Perfect Continuous"
            margin="normal"
            type="text"
            fullWidth
            variant="outlined"
            {...register("topic", { required: true })}
            sx={{ ...modalStyles.textField, mb: 2 }}
          />
          <FormControl fullWidth margin="normal" sx={{ ...modalStyles.select, mb: 1 }}>
            <InputLabel id="level-english-label">English Level</InputLabel>
            <Select
              label="English Level"
              {...register("levelEnglish", { required: true })}
            >
              <MenuItem value="A1">A1 - Beginner</MenuItem>
              <MenuItem value="A2">A2 - Elementary</MenuItem>
              <MenuItem value="B1">B1 - Intermediate</MenuItem>
              <MenuItem value="B2">B2 - Upper Intermediate</MenuItem>
              <MenuItem value="C1">C1 - Advanced</MenuItem>
              <MenuItem value="C2">C2 - Proficiency</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions sx={modalStyles.dialogActions}>
        <Button onClick={onClose} sx={modalStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-grammar-form"
          variant="contained"
          sx={modalStyles.submitButton}
        >
          Generate Lesson
        </Button>
      </DialogActions>
    </Dialog>
  );
};
