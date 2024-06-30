import AnswerInterface from './Answer';

interface InfoSubmitInterface {
    surveyId: string;
    submissionDate?: Date;
    answers: AnswerInterface[];
}

export default InfoSubmitInterface;
