import { useState, useEffect } from "react";
import type {
  Word,
  GrammarFeedback,
} from "../interfaces/vocabulary.interface";
import { validateGrammarWithGemini } from "../services/api_gemini";

import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Button,
  CardActions,
  CardContent,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { CheckCircle, XCircle } from "lucide-react";
import { updateWordSupabase } from "../services/supabaseService";
import { useNavigate } from "react-router";

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
  console.log("wordsList",wordsList);
  const [currentWord, setCurrentWord] = useState<Word>();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: GrammarFeedback = await validateGrammarWithGemini(
        data.sentence,
        data.word
      );
      console.log(response);
      setGrammarFeedback(response);
      if (response.isCorrect) {
        if (wordsList.length > 0) {
          setWordsList(wordsList.slice(1));
          const wordUpdate = wordsList[0];
          wordUpdate.sentence.push(data.sentence);
          wordUpdate.level += 1;
          wordUpdate.nextReviewDate = new Date(Date.now() + intervals[wordUpdate.level] * 24 * 60 * 60 * 1000).toDateString();
          wordUpdate.dias.push(intervals[wordUpdate.level]);
          updateWord(wordUpdate);
        }
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const firstWord = () => {
    setCurrentWord(wordsList[0]);
  };
  useEffect(() => {
    if (wordsList.length > 0) {
      firstWord();
    }
    else {
      navigate("/vocabulary");
      console.log("No words");
    }
  }, [wordsList]);

  const updateWord = async (word: Word) => {
    const response = await updateWordSupabase(word);
    if (response.length == 0) {
      console.error("Error updating word:" + word.word);
      return []; 
    }
    return response;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Agregar nueva palabra */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CardContent sx={{ backgroundColor: "#f5f5f5", padding: 2 }}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: 18, color: "#4a148c" }}
            >
              Word Review
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: "#4a148c" }} >
              {currentWord?.word}
              <Typography variant="body2" className="ml-2" sx={{ color: "#4a148c" }} {...register("word")}>
                ({currentWord?.level}/{6})
              </Typography>
              <input type="text" value={currentWord?.word}  {...register("word")} hidden />
            </Typography>
            <Typography variant="body2" sx={{ color: "#4a148c", mb: 1.5 }}>
              Definition
            </Typography>
            <Typography variant="body2" sx={{ color: "#4a148c" }}>
              {currentWord?.definition}
            </Typography>
            <Typography variant="body2" sx={{ color: "#4a148c", mb: 1.5 }}>
              Sentence
            </Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Write a sentence using this word"
              style={{ width: "100%", backgroundColor: "#fff" }}
              {...register("sentence")}
            />
          </CardContent>
          <CardActions sx={{ backgroundColor: "#4a148c", padding: 1 }}>
            <Button startIcon={<CheckCircle />} size="small" type="submit" sx={{ color: "#fff" }}>
              Add
            </Button>
          </CardActions>
        </form>
      </div>
      {grammarFeedback.isCorrect == false && grammarFeedback.explanation != "" && grammarFeedback.suggestion != "" && (
        <div className="mt-8 bg-yellow-200 p-4 rounded-lg">
          <div className="flex items-center">
            <XCircle className="mr-2 text-yellow-600" size={24} />
            <p className="text-yellow-700 font-bold">La oración no es correcta.</p>
          </div>
          <p className="text-yellow-700">{grammarFeedback.explanation}</p>
          <p className="text-yellow-700 font-bold">Sugerencia: {grammarFeedback.suggestion}</p>
        </div>
      )}
    </div>
  );
};
