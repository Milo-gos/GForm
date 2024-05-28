import React, { useEffect, useRef, useState } from 'react';
import style from './bottomquestion.module.scss';
import classNames from 'classnames/bind';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import TextInput from '../NormalTextInput';
import { FormControlLabel, IconButton, Menu, MenuItem, Switch, Tooltip } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MyDialog from '../MyDialog';
import QuestionType from '../../utils/interfaces/questionType';
import { useAppDispatch } from '../../redux';
import { deleteQuestion, toggleDescription } from '../../redux/slice/survey';
const cx = classNames.bind(style);
interface Props {
    type?: QuestionType;
    indexQuestion: number;
}
const BottomQuestion = ({ type, indexQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [description, setDescription] = useState(false);
    const handleClickDescription = () => {
        setDescription((prev) => !prev);
        setAnchorEl(null);
        dispatchApp(toggleDescription(indexQuestion));
    };

    const handleClickRemoveQuestion = () => {
        dispatchApp(deleteQuestion(indexQuestion));
    };

    return (
        <div className={cx('wrapper')}>
            <Tooltip title="Nhân bản">
                <IconButton style={{ padding: '12px' }}>
                    <ContentCopyIcon style={{ fontSize: '28px' }} />
                </IconButton>
            </Tooltip>

            <Tooltip title="Xóa">
                <IconButton style={{ padding: '12px' }} onClick={handleClickRemoveQuestion}>
                    <DeleteIcon style={{ fontSize: '28px', cursor: 'pointer' }} />
                </IconButton>
            </Tooltip>

            <div className={cx('divider')}></div>
            {/* <Switch defaultChecked /> */}
            {type !== QuestionType.Description && (
                <FormControlLabel
                    control={<Switch defaultChecked color="warning" sx={{ color: 'error' }}></Switch>}
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
                    {description && <CheckOutlinedIcon style={{ color: '#ed6c02', marginRight: '8px' }} />} Mô tả
                </MenuItem>
                <MenuItem onClick={handleClose}>Kiểm tra định dạng</MenuItem>
                <MenuItem onClick={handleClose}>Đi đến phần chỉ định dựa vào câu trả lời</MenuItem>
            </Menu>
        </div>
    );
};

export default BottomQuestion;
