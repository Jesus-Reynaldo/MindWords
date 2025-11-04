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
    console.log(topic, levelEnglish)
    try {
      const topicGenerated: GrammarTopic = await generateGrammarTopicWithGemini(topic, levelEnglish);
      if(topicGenerated){
        const topic: GrammarTopic = {
          title: topicGenerated.title,
          levelEnglish: topicGenerated.levelEnglish,
          explanation: topicGenerated.explanation,
          formulates: topicGenerated.formulates,
          examples: topicGenerated.examples,
          createdAt: new Date().toISOString(),
        }
        const topicInsert = await insertGrammarTopic(topic);
        if(topicInsert){
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
        <Typography variant="h5" component="h5" sx={{ fontWeight: 600 }}>
          Add Grammar
        </Typography>
      </DialogTitle>
      <DialogContent sx={modalStyles.dialogContent}>
        <DialogContentText sx={modalStyles.dialogContentText}>
          To add a new grammar topic, please fill in the details below.
        </DialogContentText>
        <form id="add-grammar-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="normal"
            type="text"
            fullWidth
            variant="outlined"
            {...register("topic", { required: true })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
            <InputLabel id="level-english-label">English Level</InputLabel>
            <Select
              label="English Level"
              {...register("levelEnglish", { required: true })}
            >
              <MenuItem value="A1">A1 - Beginner</MenuItem>
              <MenuItem value="A2">A2 - Elementary</MenuItem>
              <MenuItem value="B1">B1 - Intermediate</MenuItem>
              <MenuItem value="B2">B2 - Upper-Intermediate</MenuItem>
              <MenuItem value="C1">C1 - Advanced</MenuItem>
              <MenuItem value="C2">C2 - Proficiency</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions sx={modalStyles.dialogActions}>
        <Button onClick={onClose} sx={{ color: "#757575" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-grammar-form"
          variant="contained"
          sx={{ backgroundColor: "#2e0f56" }}
        >
          Add Grammar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
