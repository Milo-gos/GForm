import React, { useState } from 'react';
import style from './languagebutton.module.scss';
import classNames from 'classnames/bind';
import LanguageIcon from '@mui/icons-material/Language';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../../constants';

const cx = classNames.bind(style);

const LanguageButton = () => {
    const { i18n, t } = useTranslation('component');
    const [lng, setLng] = useState(LANGUAGE.vi);
    const handleChangeLanguage = (e: SelectChangeEvent) => {
        const value = e.target.value;
        setLng(value);
        i18n.changeLanguage(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon />
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
                        onChange={handleChangeLanguage}
                        value={lng}
                        size="small"
                        MenuProps={{ disablePortal: true }}>
                        <MenuItem value={LANGUAGE.vi}>{t('language_button.vi')}</MenuItem>
                        <MenuItem value={LANGUAGE.en}>{t('language_button.en')}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default LanguageButton;
