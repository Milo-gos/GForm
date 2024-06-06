import AnswerInterface from './answer';
import QuestionInterface from './question';
import SubmitInterface from './submit';

interface SubmitFormInterface {
    id?: string;
    title: string;

    description: string;
    status: string;
    questions: QuestionInterface[];
    errorQuestions: string[];
    submit?: SubmitInterface;
    isSubmit: boolean;
}

export default SubmitFormInterface;
