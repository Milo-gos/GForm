import AnswerInterface from './answer';

interface SubmitInterface {
    id?: string;
    submissionDate?: Date;
    answers: AnswerInterface[];
}

export default SubmitInterface;
