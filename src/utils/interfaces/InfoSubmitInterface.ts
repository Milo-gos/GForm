import AnswerInterface from './AnswerInterface';

interface InfoSubmitInterface {
    surveyId: string;
    submissionDate?: Date;
    answers: AnswerInterface[];
}

export default InfoSubmitInterface;
