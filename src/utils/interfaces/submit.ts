import AnswerInterface from './answer';

interface InfoSubmitInterface {
    surveyId: string;
    submissionDate?: Date;
    answers: AnswerInterface[];
}

export default InfoSubmitInterface;
