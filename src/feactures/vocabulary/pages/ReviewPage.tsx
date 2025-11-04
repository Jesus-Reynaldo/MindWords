import { Review } from "../components/Review";
import { useState, useEffect } from "react";
import type { Word } from "../interfaces/vocabulary.interface";
import { getWordByReviewDate } from "../services/supabaseService";
import { Loading } from "../../../shares/components/Loading";

export const ReviewPage = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        obtenerWordReview();
    }, []);
   
    const obtenerWordReview = async () => {
        try {
            setLoading(true); 
            const wordsReview = await getWordByReviewDate();
            
            setWords(wordsReview);
            
            console.log("words obtenidas:", wordsReview);
        } catch (error) {
            console.error("Error fetching words:", error);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        console.log("words guardadas en estado:", words);
    }, [words]);

    return (
        loading ? (
            <Loading />
        ) : (
            <Review words={words} />
        )
    )
}