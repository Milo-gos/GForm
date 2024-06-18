import React, { useState } from 'react';
import style from './bottomquestion.module.scss';
import classNames from 'classnames/bind';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControlLabel, IconButton, Menu, MenuItem, Snackbar, Switch, Tooltip } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { BsThreeDotsVertical } from 'react-icons/bs';
import QuestionType from '../../../../../../utils/interfaces/questionType';
import {
    handleDeleteQuestion,
    handleToggleDescription,
    handleChangeRequired,
    handleDuplicateQuestion,
} from '../../../../../../redux/slice/unitSurvey';
import useChangeQuestionMutation from '../../../../mutation/changeQuestion';
import useDeleteQuestionMutation from '../../../../mutation/deleteQuestion';
import { useAppDispatch, useAppSelector } from '../../../../../../redux';
import useDuplicateQuestionMutation from '../../../../mutation/duplicateQuestion';
import { MoonLoader } from 'react-spinners';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';

const cx = classNames.bind(style);
interface Props {
    type?: QuestionType;
    indexQuestion: number;
}
const BottomQuestion = ({ type, indexQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const [isLoadingDuplicate, setLoadingDuplicate] = useState(false);
    const isEdit = useAppSelector((state) => state.survey.isEdit);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isHasDescription = question?.isHasDescription;
    const handleClickDescription = () => {
        setAnchorEl(null);
        if (!isEdit) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }
        dispatchApp(handleToggleDescription({ indexQuestion }));
        changeQuestion.mutate(
            {
                isHasDescription: !question.isHasDescription,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    };

    const DeleteQuestionMutation = useDeleteQuestionMutation(question.id);
    const handleClickRemoveQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isEdit) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }

        dispatchApp(
            handleDeleteQuestion({
                indexQuestion,
            }),
        );
        dispatchApp(
            setOpenSnackbar({
                value: true,
                message: 'Đã xóa câu hỏi',
            }),
        );

        DeleteQuestionMutation.mutate(question.id!);
    };
    const changeQuestion = useChangeQuestionMutation(question.id || '');
    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isRequired = event.target.checked;
        if (!isEdit) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }
        dispatchApp(
            handleChangeRequired({
                indexQuestion: indexQuestion,
                isRequired,
            }),
        );
        changeQuestion.mutate(
            {
                isRequired: isRequired,
                id: question.id,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    };

    const DuplicateQuestionMutation = useDuplicateQuestionMutation(question.id);

    const handleDuplicateThisQuestion = () => {
        setLoadingDuplicate(true);
        DuplicateQuestionMutation.mutateAsync(
            {
                questionId: question.id,
            },
            {
                onSuccess: (data) => {
                    setLoadingDuplicate(false);
                    dispatchApp(
                        handleDuplicateQuestion({
                            indexQuestion: indexQuestion,
                            newQuestion: data,
                        }),
                    );
                },
                onError() {
                    setLoadingDuplicate(false);
                },
            },
        );
    };

    return (
        <div className={cx('wrapper')}>
            {isLoadingDuplicate ? (
                <>
                    <MoonLoader color="#ed6c02" size={30} />
                </>
            ) : (
                <Tooltip title="Nhân bản">
                    <IconButton
                        style={{ padding: '12px' }}
                        onClick={() => {
                            if (!isEdit) {
                                dispatchApp(
                                    setOpenSnackbar({
                                        value: true,
                                        message: 'Bạn không có quyền chỉnh sửa',
                                    }),
                                );
                                return;
                            }
                            handleDuplicateThisQuestion();
                        }}>
                        <ContentCopyIcon style={{ fontSize: '28px' }} />
                    </IconButton>
                </Tooltip>
            )}

            <Tooltip title="Xóa">
                <IconButton style={{ padding: '12px' }} onClick={handleClickRemoveQuestion}>
                    <DeleteIcon style={{ fontSize: '28px', cursor: 'pointer' }} />
                </IconButton>
            </Tooltip>

            <div className={cx('divider')}></div>
            {/* <Switch defaultChecked /> */}
            {type !== QuestionType.Description && (
                <FormControlLabel
                    control={
                        <Switch
                            color="warning"
                            sx={{ color: 'error' }}
                            checked={question?.isRequired}
                            onChange={handleSwitch}></Switch>
                    }
                    labelPlacement="start"
                    label={<span style={{ fontSize: '14px' }}>Bắt buộc</span>}
                />
            )}
            <Tooltip title="Tùy chọn">
                <IconButton style={{ padding: '12px' }} onClick={handleClick}>
                    <BsThreeDotsVertical size={24} />
                </IconButton>
            </Tooltip>
            <Menu
                disablePortal={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <MenuItem onClick={handleClickDescription}>
                    {isHasDescription && <CheckOutlinedIcon style={{ color: '#ed6c02', marginRight: '8px' }} />}
                    <div style={{ padding: '4px 0' }}>Mô tả</div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div style={{ padding: '4px 0' }}>Kiểm tra định dạng</div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default BottomQuestion;
