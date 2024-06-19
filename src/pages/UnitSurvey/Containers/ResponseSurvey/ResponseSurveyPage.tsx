import React, { useEffect, useState } from 'react';
import style from './responsesurvey.module.scss';
import classNames from 'classnames/bind';
import { FormControlLabel, IconButton, Menu, MenuItem, Snackbar, Switch } from '@mui/material';
import { FaFileExcel } from 'react-icons/fa';
import useChangeSurveyMutation from '../../mutation/changeSurvey';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getResponseSurvey } from '../../../../API/axios';
import { setLoading, setOpenSnackbar } from '../../../../redux/slice/global';
import ResponseInterface from '../../../../utils/interfaces/response';
import Response from './components/Response';
import useGetDataExcelMutation from '../../mutation/getDataExcel';
import { saveAs } from 'file-saver';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

const ResponseSurveyPage = () => {
    const { id } = useParams();
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const [isLoadingExport, setLoadingExport] = useState(false);
    const survey = useAppSelector((state) => state.survey);
    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatchApp(
            setOpenSnackbar({
                value: false,
                message: '',
            }),
        );
    };

    const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
        queryKey: [`getResponseSurvey_${id}`],
        queryFn: () => getResponseSurvey(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isLoading) {
            dispatchApp(setLoading(true));
        }
        if (isSuccess || isError) {
            dispatchApp(setLoading(false));
            if (isError) {
                navigate('/page404');
            }
        }
    }, [isLoading, isError, isSuccess, dispatchApp]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ChangeSurveyMutation = useChangeSurveyMutation();
    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isFetching) return;
        if (!(data?.isOwner || data?.isShareEdit)) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }
        const isOpening = event.target.checked;
        ChangeSurveyMutation.mutate(
            {
                id: data?.survey!.id,
                isAccepting: isOpening,
            },

            {
                onSuccess(data) {
                    queryClient.setQueryData([`getResponseSurvey_${id}`], (oldData: ResponseInterface) => {
                        return oldData
                            ? {
                                  ...oldData,
                                  survey: {
                                      ...oldData.survey,
                                      isAccepting: data.isAccepting,
                                  },
                              }
                            : oldData;
                    });
                    queryClient.setQueryData([`getSurveyById_${id}`], (oldData: ResponseInterface) => {
                        return oldData
                            ? {
                                  ...oldData,
                                  isAccepting: data.isAccepting,
                              }
                            : oldData;
                    });
                },
                onError(error) {
                    console.log(error);
                },
            },
        );
    };
    const GetDataExcelMutation = useGetDataExcelMutation();
    const handleClickExport = () => {
        setLoadingExport(true);
        GetDataExcelMutation.mutate(id!, {
            async onSuccess(data) {
                const blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                saveAs(blob, 'SurveyResponses.xlsx');
                setLoadingExport(false);
            },
            onError() {
                setLoadingExport(false);
                toast.error('Đã có lỗi xảy ra');
            },
        });
    };

    if (!data) return <></>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={cx('total-response')}>{data?.quantityOfResponses || 0} phản hồi</span>

                    <div className={cx('export-excel')} onClick={handleClickExport}>
                        {isLoadingExport && <MoonLoader color="#ed6c02" size={20} />}
                        <FaFileExcel className={cx('icon')} />
                        <span>Xuất excel</span>
                    </div>

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
                            isClosed: data.survey?.isAccepting === false,
                        })}>
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="warning"
                                        sx={{ color: 'error' }}
                                        checked={data.survey?.isAccepting}
                                        onChange={handleSwitch}></Switch>
                                }
                                labelPlacement="start"
                                label={
                                    <span className={cx('label-switch')}>
                                        {data.survey?.isAccepting ? 'Đang nhận phản hồi' : 'Đã ngừng nhận phản hồi'}
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

export default ResponseSurveyPage;
