import React, { useState, useEffect } from "react";
import { Plus, SearchIcon, AlertTriangle } from "lucide-react";
import type {
  Word,
  GrammarFeedback,
  DefineWord,
} from "../interfaces/vocabulary.interface";
import {
  defineWordWithGemini,
  validateGrammarWithGemini,
} from "../services/api_gemini";

import { useForm, type SubmitHandler } from "react-hook-form";
import { TableListVocabulary } from "../components/TableListVocabulary";
import { getWords, insertWord } from "../services/supabaseService";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { vocabStyles } from "../styles/style";

type Inputs = {
  word: string;
  definition: string;
  sentence: string;
};
const intervals: number[] = [1, 2, 4, 7, 14, 30, 45, 60, 90, 120];

const VocabularyApp: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [type, setType] = useState<string>("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [antonyms, setAntonyms] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [grammarFeedback, setGrammarFeedback] = useState<GrammarFeedback>({
    isCorrect: false,
    explanation: "",
    suggestion: "",
  });

  const { register, handleSubmit, reset, watch, setValue } = useForm<Inputs>();

  useEffect(() => {
    const fetchWords = async () => {
      const words: Word[] = await getWords();
      setWords(words);
    };
    fetchWords();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: GrammarFeedback = await validateGrammarWithGemini(
        data.sentence,
        data.word
      );
      setGrammarFeedback(response);
      if (response.isCorrect) {
        addNewWord(data);
        reset();
        setValue("word", "");
        setValue("definition", "");
        setValue("sentence", "");
        setType("");
        setSynonyms([]);
        setAntonyms([]);
        setGrammarFeedback({ isCorrect: false, explanation: "", suggestion: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewWord = async (data: Inputs) => {
    const word: Word = {
      word: data.word,
      definition: data.definition,
      sentence: [data.sentence],
      level: 0,
      nextReviewDate: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toDateString(),
      dateAdded: new Date().toDateString(),
      dias: [intervals[0]],
      type: type,
      synonyms: synonyms,
      antonyms: antonyms,
    };
    const words: Word[] = await insertWord(word);
    setWords((prevWords) => [...prevWords, word]);

    console.log(words);
    localStorage.setItem("words", JSON.stringify([...words, word]));
  };

  const searchDefinitionWord = async (word: string) => {
    try {
      const response: DefineWord = await defineWordWithGemini(word);
      setValue("definition", response.definition || "");
      setSynonyms(response.synonyms || []);
      setAntonyms(response.antonyms || []);
      setType(response.type || "");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={vocabStyles.pageBackground}>
      <Box sx={vocabStyles.contentWrapper}>
        {/* Hero header */}
        <Box sx={{ textAlign: "center", mb: 4, pt: { xs: 2, md: 3 } }}>
          <Typography sx={vocabStyles.heroTitle}>Vocabulary</Typography>
          <Typography sx={vocabStyles.heroSubtitle}>
            Build your English vocabulary with spaced repetition
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2.5 }}
          >
            <Box sx={vocabStyles.wordCountPill}>
              {words.length} {words.length === 1 ? "word" : "words"}
            </Box>
            <Button
              startIcon={<Plus size={18} />}
              sx={vocabStyles.heroButton}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Add Word"}
            </Button>
          </Stack>
        </Box>

        {/* Add word form */}
        {showForm && (
          <Box sx={vocabStyles.formCard}>
            <Typography sx={vocabStyles.sectionTitle}>
              Add New Word
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5}>
                {/* Word + Definition row */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                >
                  <TextField
                    label="Word / Expression"
                    placeholder="Example: serendipity"
                    fullWidth
                    size="small"
                    sx={vocabStyles.textField}
                    {...register("word", { required: true })}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={vocabStyles.searchButton}
                              onClick={() =>
                                searchDefinitionWord(
                                  watch("word")?.trim() || ""
                                )
                              }
                              size="small"
                            >
                              <SearchIcon size={18} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <TextField
                    label="Definition"
                    placeholder="Definition in English"
                    fullWidth
                    size="small"
                    sx={vocabStyles.textField}
                    {...register("definition")}
                    slotProps={{
                      input: {
                        readOnly: false,
                      },
                      inputLabel: {
                        shrink: !!watch("definition"),
                      },
                    }}
                  />
                </Stack>

                {/* Type / Synonyms / Antonyms chips */}
                {(type || synonyms.length > 0 || antonyms.length > 0) && (
                  <Stack
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                    useFlexGap
                    alignItems="center"
                  >
                    {type && (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography sx={vocabStyles.chipLabel}>
                          Type:
                        </Typography>
                        <Chip label={type} size="small" sx={vocabStyles.chipType} />
                      </Stack>
                    )}
                    {synonyms.length > 0 && (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography sx={vocabStyles.chipLabel}>
                          Synonyms:
                        </Typography>
                        {synonyms.map((s) => (
                          <Chip
                            key={s}
                            label={s}
                            size="small"
                            sx={vocabStyles.chipSynonym}
                          />
                        ))}
                      </Stack>
                    )}
                    {antonyms.length > 0 && (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography sx={vocabStyles.chipLabel}>
                          Antonyms:
                        </Typography>
                        {antonyms.map((a) => (
                          <Chip
                            key={a}
                            label={a}
                            size="small"
                            sx={vocabStyles.chipAntonym}
                          />
                        ))}
                      </Stack>
                    )}
                  </Stack>
                )}

                {/* Sentence */}
                <TextField
                  label="Example sentence / Mental association"
                  placeholder="Write an example sentence that helps you remember the word"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  sx={vocabStyles.textField}
                  {...register("sentence", { required: true })}
                />

                {/* Grammar feedback */}
                {!grammarFeedback.isCorrect &&
                  grammarFeedback.explanation &&
                  grammarFeedback.suggestion && (
                    <Box sx={vocabStyles.feedbackAlert}>
                      <Typography sx={vocabStyles.feedbackTitle}>
                        <AlertTriangle size={18} />
                        The sentence is not correct
                      </Typography>
                      <Typography sx={vocabStyles.feedbackText}>
                        {grammarFeedback.explanation}
                      </Typography>
                      <Typography sx={vocabStyles.feedbackSuggestion}>
                        Suggestion: {grammarFeedback.suggestion}
                      </Typography>
                    </Box>
                  )}

                {/* Submit */}
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    sx={vocabStyles.submitButton}
                    disableElevation
                  >
                    Add Word
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        )}

        {/* Word list */}
        <TableListVocabulary words={words} />
      </Box>
    </Box>
  );
};

export default VocabularyApp;
