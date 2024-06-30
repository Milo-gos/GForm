import AnswerInterface from './Answer';

interface SharedUserInterface {
    surveyId: string;
    isOwner: boolean;
    isShareEdit: boolean;
    owner: {
        avatar?: string;
        email: string;
        fullName: string;
        id: string;
    };
    sharedUsers?: {
        avatar?: string;
        email: string;
        fullName?: string;
        userId?: string;
        sharedId?: string;
        isAccept: boolean;
        isEdit: boolean;
    }[];
}

export default SharedUserInterface;
