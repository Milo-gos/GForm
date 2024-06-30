import React from 'react';
import style from './page-not-found.module.scss';
import classNames from 'classnames/bind';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const PageNotFound = () => {
    const { t } = useTranslation('pageNotFound');

    return (
        <div className={cx('wrapper')}>
            <h2>{t('page_not_found')}</h2>
            <div style={{ textAlign: 'center' }}>
                <BiSolidErrorAlt size={100} />
            </div>
        </div>
    );
};

export default PageNotFound;
