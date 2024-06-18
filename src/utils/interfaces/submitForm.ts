import AnswerInterface from './answer';
import QuestionInterface from './question';
import InfoSubmitInterface from './submit';

interface SubmitFormInterface {
    id?: string;
    title: string;

    description: string;
    questions: QuestionInterface[];
    errorQuestions: string[];
    infoSubmit?: InfoSubmitInterface;
    isSubmit: boolean;
}

export default SubmitFormInterface;
