import QuestionInterface from './question';

interface SurveyInterface {
    id?: string;
    title: string;

    description: string;

    isAccepting: boolean;

    questions: QuestionInterface[];
    indexActiveQuestion?: number;
}

export default SurveyInterface;
