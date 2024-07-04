import QuestionResponseInterface from './QuestionResponse';
import SurveyInterface from './SurveyInterface';

interface ResponseInterface {
    survey?: SurveyInterface;
    quantityOfResponses?: number;
    questionResponses: QuestionResponseInterface[];
    isOwner: boolean;
    isShareEdit: boolean;
}

export default ResponseInterface;
