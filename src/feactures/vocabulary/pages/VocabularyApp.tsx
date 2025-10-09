import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, XCircle } from 'lucide-react';
import type { Word, GrammarFeedback } from '../interfaces/vocabulary.interface';
import { validateGrammarWithGemini } from '../services/api_gemini';

import { useForm, type SubmitHandler } from "react-hook-form"
import { TableListVocabulary } from '../components/TableListVocabulary';
import { getWords, insertWord } from '../services/supabaseService';

type Inputs = {
  word: string;
  definition: string;
  sentence: string;
}
const intervals: number[] = [1, 2, 4, 7, 14, 30];

const VocabularyApp: React.FC = () => {
  
  const [words, setWords] = useState<Word[]>([]);
  const [grammarFeedback, setGrammarFeedback] = useState<GrammarFeedback>({
    isCorrect: false,
    explanation: '',
    suggestion: ''
  });

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    const fetchWords = async () => {
      const words : Word[] = await getWords();
      setWords(words);
    };
    fetchWords();
  }, []);

  console.log("words", words);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: GrammarFeedback = await validateGrammarWithGemini(data.sentence, data.word);
      console.log(response);
      setGrammarFeedback(response);
      if(response.isCorrect){
        addNewWord(data);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const addNewWord = async (data: Inputs) => {
    const word: Word = {
        word: data.word,
        definition: data.definition,
        sentence: [data.sentence],
        level: 0,
        nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString(),
        dateAdded: new Date().toDateString(),
        dias: [intervals[0]]
      }     
      const words : Word[] = await insertWord(word);
      setWords(prevWords => [...prevWords, word]);
      
      console.log(words);
      localStorage.setItem('words', JSON.stringify([...words, word]));

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BookOpen className="mr-3 text-purple-600" />
            Vocabulary in English
          </h1>
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center">
            <Plus className="mr-2 text-green-600" />
            Add New Word
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palabra/Expresión
                </label>
                <input 
                  type="text"
                  {...register("word", { required: true })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Example: serendipity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Definition
                </label>
                <input 
                  type="text"
                  {...register("definition", { required: false })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Definition in English"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Example sentence / Mental association 
              </label>
              <textarea
              {...register("sentence", { required: true })} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="Write a example sentence or mental association that helps you remember the word"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Plus className="mr-2" size={16} />
              Add Word
            </button>
          </form>
        </div>
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
      <div className="mt-8">
        <TableListVocabulary words={words} />
      </div>
    </div>
    );
  }



export default VocabularyApp;