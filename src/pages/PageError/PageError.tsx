import React from 'react';
import style from './page-error.module.scss';
import classNames from 'classnames/bind';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const PageError = () => {
    const { t } = useTranslation('pageError');
    return (
        <div className={cx('wrapper')}>
            <h2>{t('error_please_try_again')}</h2>
            <div style={{ textAlign: 'center' }}>
                <BiSolidErrorAlt size={100} />
            </div>
        </div>
    );
};

export default PageError;
