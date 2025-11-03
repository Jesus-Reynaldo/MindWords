export interface GrammarTopic {
    id: string;
    createdAt: string;
    levelEnglish: string;
    title: string;
    explanation: string;
    formulates: string[];
    examples: string[];
}
export interface ReviewTopic {
    id: string;
    topicId: string;
    createdAt: string;
    nextReviewDate: string;
    dias: number[];
}

