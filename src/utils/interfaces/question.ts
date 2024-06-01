import GColumnInterface from './gcolumn';

import LinearScaleInterface from './linear_scale';
import OptionInterface from './option';

import QuestionType from './questionType';
import RowInterface from './row';

import ValidationInterface from './validation';

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
