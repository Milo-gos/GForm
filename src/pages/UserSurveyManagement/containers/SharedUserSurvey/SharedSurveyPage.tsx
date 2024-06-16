import React, { useState } from 'react';
import style from './sharedsurvey.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import SharedSurvey from './components/SharedSurveyComponent';
import { MoonLoader } from 'react-spinners';
import { useAppSelector } from '../../../../redux';
import { getSharedSurveysOfCurrentUser } from '../../../../utils/API/axios';
import { MyButton } from '../../../../components';

const cx = classNames.bind(style);
const SharedSurveyPage = () => {
    const navigate = useNavigate();
    const searchString = useAppSelector((state) => state.surveyManagement.searchString);
    const [value, setValue] = useState('0');
    const handleChangeFilter = (e: SelectChangeEvent) => {
        const value = e.target.value;
        setValue(value);
    };
    const { data, isLoading, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [`getSharedSurveyOfCurrentUser`, searchString, value],
        queryFn: getSharedSurveysOfCurrentUser,
        refetchOnWindowFocus: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter-wrapper')}>
                <div className={cx('filter')}>
                    <span style={{ fontSize: '18px' }}>Trạng thái: </span>
                    <FormControl
                        sx={{
                            m: 1,
                            minWidth: 65,
                            '& fieldset': {
                                border: 'none',
                            },
                        }}
                        size="small">
                        <Select
                            onChange={handleChangeFilter}
                            size="medium"
                            MenuProps={{ disablePortal: true }}
                            defaultValue="0">
                            <MenuItem value={0}>
                                <div style={{ padding: '4px 0px' }}>Tất cả</div>
                            </MenuItem>
                            <MenuItem value={1}>
                                <div style={{ padding: '4px 0px' }}>Đang nhận phản hồi</div>
                            </MenuItem>
                            <MenuItem value={2}>
                                <div style={{ padding: '4px 0px' }}>Ngừng nhận phản hồi</div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {/* <div className={cx('filter')}>
                    <span style={{ fontSize: '18px' }}>Trạng thái: </span>
                    <FormControl
                        sx={{
                            m: 1,
                            minWidth: 65,
                            '& fieldset': {
                                border: 'none',
                            },
                        }}
                        size="small">
                        <Select
                            onChange={handleChangeFilter}
                            size="medium"
                            MenuProps={{ disablePortal: true }}
                            defaultValue="0">
                            <MenuItem value={0}>
                                <div style={{ padding: '4px 0px' }}>Tất cả</div>
                            </MenuItem>
                            <MenuItem value={1}>
                                <div style={{ padding: '4px 0px' }}>Đang nhận phản hồi</div>
                            </MenuItem>
                            <MenuItem value={2}>
                                <div style={{ padding: '4px 0px' }}>Ngừng nhận phản hồi</div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div> */}
            </div>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <div className={cx('list-surveys')}>
                    {data?.pages.map((page, index) => {
                        return (
                            <div key={index} className={cx('sectionData')}>
                                {page.sharedSurveys.map((survey) => {
                                    return <SharedSurvey key={survey.id} sharedSurvey={survey} />;
                                })}
                            </div>
                        );
                    })}
                </div>
            )}

            {hasNextPage && (
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {isFetchingNextPage && <MoonLoader color="#fcc934" size={30} />}
                    <MyButton textButton="Tải thêm" onClick={() => fetchNextPage()} />
                </div>
            )}
        </div>
    );
};

export default SharedSurveyPage;
