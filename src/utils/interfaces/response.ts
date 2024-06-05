import AnswerInterface from './answer';

interface ResponseInterface {
    id?: string;
    submissionDate?: Date;
    answers: AnswerInterface[];
}

export default ResponseInterface;
