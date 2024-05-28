import QuestionInterface from './question';

interface SurveyInterface {
    id?: string;
    title: string;

    description: string;

    status: string;

    questions: QuestionInterface[];
    indexActiveQuestion: number;
}

export default SurveyInterface;
