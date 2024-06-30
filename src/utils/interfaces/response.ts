import AnswerInterface from './Answer';
import QuestionResponseInterface from './QuestionResponse';
import SurveyInterface from './Survey';

interface ResponseInterface {
    survey?: SurveyInterface;
    quantityOfResponses?: number;
    questionResponses: QuestionResponseInterface[];
    isOwner: boolean;
    isShareEdit: boolean;
}

export default ResponseInterface;
