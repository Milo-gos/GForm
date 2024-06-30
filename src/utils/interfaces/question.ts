import GColumnInterface from './GColumn';

import LinearScaleInterface from './LinearScale';
import OptionInterface from './Option';

import QuestionType from './QuestionType';
import RowInterface from './Row';

import ValidationInterface from './Validation';

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
