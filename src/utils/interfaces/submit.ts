import AnswerInterface from './answer';

interface SubmitInterface {
    surveyId: string;
    submissionDate?: Date;
    answers: AnswerInterface[];
}

export default SubmitInterface;
