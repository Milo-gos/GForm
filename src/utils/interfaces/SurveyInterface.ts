import QuestionInterface from './QuestionInterface';
import UserInterface from './UserInterface';

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
