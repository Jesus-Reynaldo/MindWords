import { useState, useEffect } from "react";
import type {
  Word,
  GrammarFeedback,
} from "../interfaces/vocabulary.interface";
import { validateGrammarWithGemini } from "../services/api_gemini";

import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { updateWordSupabase } from "../services/supabaseService";
import { useNavigate } from "react-router";
import { vocabStyles } from "../styles/style";

type Inputs = {
  word: string;
  definition: string;
  sentence: string;
};

interface ReviewProps {
  words: Word[];
}
const intervals: number[] = [1, 2, 4, 7, 14, 30];

export const Review = ({ words }: ReviewProps) => {
  const navigate = useNavigate();
  const [grammarFeedback, setGrammarFeedback] = useState<GrammarFeedback>({
    isCorrect: false,
    explanation: "",
    suggestion: "",
  });
  const [wordsList, setWordsList] = useState<Word[]>(words);
  const [currentWord, setCurrentWord] = useState<Word>();
  const [showSentences, setShowSentences] = useState(false);
  const [totalWords] = useState(words.length);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: GrammarFeedback = await validateGrammarWithGemini(
        data.sentence,
        currentWord?.word || data.word
      );
      setGrammarFeedback(response);
      if (response.isCorrect) {
        setShowSuccess(true);
        if (wordsList.length > 0) {
          const wordUpdate = wordsList[0];
          wordUpdate.sentence.push(data.sentence);
          wordUpdate.level += 1;
          wordUpdate.nextReviewDate = new Date(
            Date.now() + intervals[wordUpdate.level] * 24 * 60 * 60 * 1000
          ).toDateString();
          wordUpdate.dias.push(intervals[wordUpdate.level]);
          updateWord(wordUpdate);

          setTimeout(() => {
            setWordsList(wordsList.slice(1));
            setShowSuccess(false);
            setGrammarFeedback({
              isCorrect: false,
              explanation: "",
              suggestion: "",
            });
            setShowSentences(false);
            reset();
          }, 1200);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (wordsList.length > 0) {
      setCurrentWord(wordsList[0]);
    } else {
      navigate("/vocabulary");
    }
  }, [wordsList, navigate]);

  const updateWord = async (word: Word) => {
    const response = await updateWordSupabase(word);
    if (response.length === 0) {
      console.error("Error updating word:" + word.word);
      return [];
    }
    return response;
  };

  const reviewedCount = totalWords - wordsList.length;
  const progressPct = totalWords > 0 ? (reviewedCount / totalWords) * 100 : 0;

  const renderLevelDots = (level: number, max = 6) => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {Array.from({ length: max }).map((_, i) => (
        <Box key={i} sx={vocabStyles.levelDot(i < level)} />
      ))}
    </Stack>
  );

  // Completion state
  if (wordsList.length === 0) {
    return (
      <Box sx={vocabStyles.pageBackground}>
        <Box sx={vocabStyles.contentWrapper}>
          <Box sx={{ textAlign: "center", mb: 4, pt: { xs: 2, md: 3 } }}>
            <Typography sx={vocabStyles.heroTitle}>Review</Typography>
          </Box>
          <Box sx={vocabStyles.completionCard}>
            <CheckCircle
              size={48}
              style={{ color: "#22c55e", marginBottom: 16 }}
            />
            <Typography sx={vocabStyles.completionTitle}>
              All caught up!
            </Typography>
            <Typography sx={vocabStyles.completionText}>
              You've reviewed all {totalWords} words for today.
            </Typography>
            <Button
              sx={{ ...vocabStyles.submitButton, mt: 3 }}
              onClick={() => navigate("/vocabulary")}
              startIcon={<BookOpen size={18} />}
              disableElevation
            >
              Go to Vocabulary
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={vocabStyles.pageBackground}>
      <Box sx={vocabStyles.contentWrapper}>
        {/* Hero header */}
        <Box sx={{ textAlign: "center", mb: 3, pt: { xs: 2, md: 3 } }}>
          <Typography sx={vocabStyles.heroTitle}>Review</Typography>

          {/* Progress bar */}
          <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
            <Box sx={vocabStyles.progressContainer}>
              <Box sx={vocabStyles.progressBar(progressPct)} />
            </Box>
            <Typography sx={vocabStyles.progressText}>
              {reviewedCount} of {totalWords} words reviewed
            </Typography>
          </Box>
        </Box>

        {/* Review card */}
        {currentWord && (
          <Box sx={vocabStyles.reviewCard}>
            {/* Success overlay */}
            {showSuccess && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 3,
                  animation: "fadeIn 0.3s ease",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "scale(0.9)" },
                    to: { opacity: 1, transform: "scale(1)" },
                  },
                }}
              >
                <CheckCircle
                  size={48}
                  style={{ color: "#22c55e", marginBottom: 8 }}
                />
                <Typography
                  sx={{
                    color: "#166534",
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Correct! Moving on...
                </Typography>
              </Box>
            )}

            {!showSuccess && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  {/* Word display */}
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={vocabStyles.reviewWordDisplay}>
                      {currentWord.word}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      {currentWord.type && (
                        <Chip
                          label={currentWord.type}
                          size="small"
                          sx={vocabStyles.chipType}
                        />
                      )}
                      {renderLevelDots(currentWord.level)}
                      <Typography sx={vocabStyles.wordMeta}>
                        Level {currentWord.level}/{6}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Definition */}
                  <Box sx={vocabStyles.definitionBox}>
                    <Typography sx={vocabStyles.definitionLabel}>
                      Definition
                    </Typography>
                    <Typography sx={vocabStyles.definitionText}>
                      {currentWord.definition}
                    </Typography>
                  </Box>

                  {/* Previous sentences */}
                  {currentWord.sentence.length > 0 && (
                    <Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        onClick={() => setShowSentences(!showSentences)}
                        sx={{ cursor: "pointer", mb: 1 }}
                      >
                        <Typography sx={vocabStyles.chipLabel}>
                          Previous sentences ({currentWord.sentence.length})
                        </Typography>
                        {showSentences ? (
                          <ChevronUp size={16} style={{ color: "#6b5b8a" }} />
                        ) : (
                          <ChevronDown size={16} style={{ color: "#6b5b8a" }} />
                        )}
                      </Stack>
                      <Collapse in={showSentences}>
                        {currentWord.sentence.map((s, i) => (
                          <Typography key={i} sx={vocabStyles.sentenceItem}>
                            {s}
                          </Typography>
                        ))}
                      </Collapse>
                    </Box>
                  )}

                  {/* Hidden word field for form submission */}
                  <input
                    type="hidden"
                    value={currentWord.word}
                    {...register("word")}
                  />

                  {/* New sentence input */}
                  <TextField
                    label="Write a new sentence using this word"
                    placeholder="Type your sentence here..."
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
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<CheckCircle size={18} />}
                      sx={vocabStyles.submitButton}
                      disableElevation
                    >
                      Submit
                    </Button>
                  </Box>
                </Stack>
              </form>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
