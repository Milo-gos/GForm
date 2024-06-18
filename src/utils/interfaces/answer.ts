import QuestionInterface from './question';

interface AnswerInterface {
    id?: string;
    questionId: string;
    answerText?: string;
    singleOption?: string;
    isChooseOther?: boolean;
    otherText?: string;
    multiChooseOption?: string[];
    multiChooseGrid?: { row: string; gcolumn?: string }[];
    linearValue?: number;
}

export default AnswerInterface;
