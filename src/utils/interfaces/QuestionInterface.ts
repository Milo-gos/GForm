import GColumnInterface from './GColumnInterface';
import LinearScaleInterface from './LinearScale';
import OptionInterface from './OptionInterface';
import QuestionType from './QuestionType';
import RowInterface from './RowInterface';
import ValidationInterface from './ValidationInterface';

interface QuestionInterface {
    id?: string;
    question: string;

    description: string;
    isHasDescription: boolean;

    image?: string;

    isRequired: boolean;

    questionType: QuestionType;

    isValidation: boolean;

    validation?: ValidationInterface;

    linearScale?: LinearScaleInterface;

    rows?: RowInterface[];

    gcolumns?: GColumnInterface[];
    options?: OptionInterface[];
    isHasOther?: boolean;
}

export default QuestionInterface;
