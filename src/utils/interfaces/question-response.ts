import AnswerInterface from './answer';
import QuestionInterface from './question';
import QuestionType from './questionType';

interface QuestionResponseInterface {
    questionId?: string;
    questionContent?: string;
    questionType?: QuestionType;
    numberOfResponses?: number;
    linearResponses?: {
        value: number;
        quantity: number;
    }[];
    textResponses: string[];
    optionReponses?: {
        optionContent: string;
        quantity: number;
    }[];
    rowGColumnResponses?: {
        row: string;
        gcolumns: {
            gcolumnContent: string;
            quantity: number;
        }[];
    }[];
}

export default QuestionResponseInterface;
