import QuestionInterface from './question';
import UserInterface from './user';

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
