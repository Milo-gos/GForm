import AnswerInterface from './answer';
import QuestionResponseInterface from './question-response';

interface ResponseInterface {
    surveyId?: string;
    questionResponse: QuestionResponseInterface[];
}

export default ResponseInterface;
