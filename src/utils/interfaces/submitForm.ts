import QuestionInterface from './Question';
import InfoSubmitInterface from './Submit';

interface SubmitFormInterface {
    id?: string;
    title: string;
    backgroundImage: string;
    description: string;
    questions: QuestionInterface[];
    errorQuestions: string[];
    infoSubmit?: InfoSubmitInterface;
    isSubmit: boolean;
}

export default SubmitFormInterface;
