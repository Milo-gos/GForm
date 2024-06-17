import AnswerInterface from './answer';
import QuestionResponseInterface from './question-response';
import SurveyInterface from './survey';

interface ResponseInterface {
    survey?: SurveyInterface;
    quantityOfResponses?: number;
    questionResponses: QuestionResponseInterface[];
    isOwner: boolean;
    isShareEdit: boolean;
}

export default ResponseInterface;
