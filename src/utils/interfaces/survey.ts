import QuestionInterface from './Question';
import UserInterface from './User';

interface SurveyInterface {
    id?: string;
    title: string;
    backgroundImage: string;
    description: string;

    isAccepting: boolean;

    questions: QuestionInterface[];
    indexActiveQuestion?: number;
    isOwner: boolean;
    isShareEdit: boolean;
    isEdit: boolean;
    sharedUserSurvey?: UserInterface[];
}

export default SurveyInterface;
