import QuestionInterface from './question';

interface SurveyInterface {
    id?: string;
    title: string;

    description: string;

    isAccepting: boolean;

    questions: QuestionInterface[];
    indexActiveQuestion?: number;
    isOwner: boolean;
    isShareEdit: boolean;
    isEdit: boolean;
}

export default SurveyInterface;
