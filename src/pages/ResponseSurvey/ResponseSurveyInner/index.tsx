import React, { useEffect, useState } from 'react';
import style from '../responsesurvey.module.scss';
import classNames from 'classnames/bind';
import { FormControlLabel, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Question, Response } from '../../../components';
import ResponseInterface from '../../../utils/interfaces/response';
import useChangeSurveyMutation from '../../AddNewSurvey/mutation/changeSurvey';
import survey from '../../../redux/slice/survey';
const cx = classNames.bind(style);

interface Props {
    data?: ResponseInterface;
}

const ResponseSurveyInner = ({ data }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [isOpening, setOpening] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ChangeSurveyMutation = useChangeSurveyMutation();
    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isOpening = event.target.checked;
        ChangeSurveyMutation.mutate(
            {
                id: survey.bind,
                isAccepting: isOpening,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
        setOpening(isOpening);
    };
    useEffect(() => {
        if (data?.survey?.isAccepting !== undefined) setOpening(data?.survey?.isAccepting);
    }, [data?.survey?.isAccepting]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={cx('total-response')}>{data?.quantityOfResponses || 0} phản hồi</span>

                    <IconButton style={{ padding: '8px' }} onClick={handleClick}>
                        <BsThreeDotsVertical size={24} />
                    </IconButton>

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
                        <MenuItem onClick={handleClose}>Mô tả</MenuItem>
                        <MenuItem onClick={handleClose}>Kiểm tra định dạng</MenuItem>
                        <MenuItem onClick={handleClose}>Đi đến phần chỉ định dựa vào câu trả lời</MenuItem>
                    </Menu>
                </div>
                {data && (
                    <div
                        className={cx('close-response', {
                            isClosed: isOpening === false,
                        })}>
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="warning"
                                        sx={{ color: 'error' }}
                                        checked={isOpening}
                                        onChange={handleSwitch}></Switch>
                                }
                                labelPlacement="start"
                                label={
                                    <span className={cx('label-switch')}>
                                        {isOpening ? 'Đang nhận phản hồi' : 'Đã ngừng nhận phản hồi'}
                                    </span>
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {data?.questionResponses?.map((question, index) => {
                return <Response key={index} questionResponse={question} />;
            })}
        </div>
    );
};

export default ResponseSurveyInner;
