import AnswerInterface from './answer';
import QuestionInterface from './question';
import ResponseInterface from './response';

interface SubmitFormInterface {
    id?: string;
    title: string;

    description: string;
    status: string;
    questions: QuestionInterface[];
    errorQuestions: string[];
    response?: ResponseInterface;
    isSubmit: boolean;
}

export default SubmitFormInterface;
