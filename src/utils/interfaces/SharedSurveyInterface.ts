interface SharedSurveyInterface {
    id: string;
    ownerName: string;
    ownerAvatar: string;
    title: string;
    description: string;
    isAccepting: boolean;
    questionsCount: number;
    responsesCount: number;
    createdAt: string;
    isEdit: boolean;
}
export default SharedSurveyInterface;
