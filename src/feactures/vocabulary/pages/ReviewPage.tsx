import { Review } from "../components/Review";
import { useState, useEffect } from "react";
import type { Word } from "../interfaces/vocabulary.interface";
import { getWordByReviewDate } from "../services/supabaseService";

export const ReviewPage = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        obtenerWordReview();
    }, []);
   
    const obtenerWordReview = async () => {
        try {
            setLoading(true); // Asegurar que loading esté en true mientras se cargan los datos
            const wordsReview = await getWordByReviewDate();
            
            // Reemplazar el contenido en lugar de concatenar
            setWords(wordsReview);
            
            console.log("words obtenidas:", wordsReview);
        } catch (error) {
            console.error("Error fetching words:", error);
        } finally {
            setLoading(false); // Cambiar loading a false cuando termine la operación
        }
    }

    // Efecto separado para debug (opcional)
    useEffect(() => {
        console.log("words guardadas en estado:", words);
    }, [words]);

    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            <Review words={words} />
        )
    )
}