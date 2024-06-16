import React, { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import classNames from 'classnames/bind';
import NormalTextInput from '../../../../components/NormalTextInput';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { createSchema } from '../../../../utils/functions/validationZod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setChangeAnswerText, setErrorQuestion } from '../../../../redux/slice/submitform';

interface Props {
    indexQuestion: number;
}
const AnswerParagraph = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);
    const dispatchApp = useAppDispatch();

    const [stateValidation, setStateValidation] = useState({
        type: 'length',
        conditions: {
            isRequired: true,
            // // minLength: 4,
            // // errorMessage: `Chuỗi phải có độ dài tối đa là 4`,
        },
    });
    const AnswerShortAnswerSchema = useMemo(() => {
        return z.object({
            answer: createSchema(stateValidation.type, stateValidation.conditions),
        });
    }, []);
    type AnswerShortAnswerType = z.infer<typeof AnswerShortAnswerSchema>;

    const {
        register,
        control,
        formState: { errors },
    } = useForm<AnswerShortAnswerType>({
        resolver: zodResolver(AnswerShortAnswerSchema),
        mode: 'all',
        shouldFocusError: true,
    });

    useEffect(() => {
        if (question.isRequired || question.isValidation) {
            if (errors.answer) {
                dispatchApp(
                    setErrorQuestion({
                        indexQuestion,
                        errorMessage: errors.answer.message,
                    }),
                );
            } else {
                dispatchApp(
                    setErrorQuestion({
                        indexQuestion,
                        errorMessage: '',
                    }),
                );
            }
        }
    }, [errors.answer]);

    const textChange = useWatch({ control: control, name: 'answer' });
    useEffect(() => {
        dispatchApp(
            setChangeAnswerText({
                indexQuestion,
                answerText: textChange,
            }),
        );
    }, [textChange]);
    return (
        <div>
            <NormalTextInput
                placeholder="Câu trả lời của bạn"
                style={{ padding: '6px 0px' }}
                name="answer"
                register={register}
            />
        </div>
    );
};

export default AnswerParagraph;
