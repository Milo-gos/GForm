import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import styles from './Section.module.scss';
import { motion } from 'framer-motion';
import { ImageSignin } from '../../../../assets/images';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Section() {
    const { t } = useTranslation('home');
    return (
        <section className={cx('wrapper')}>
            <motion.div
                className={cx('content')}
                initial={{
                    x: -200,
                }}
                animate={{
                    x: [-200, 30, 0],
                }}
                transition={{ duration: 0.8, times: [0, 0.6, 0.8] }}>
                <h4>{t('section.website_supports_survey_creation')}</h4>
                <h1>G - SURVEY</h1>
                <p>{t('section.take_the_survey_in_your_style')}</p>
            </motion.div>

            <motion.div
                initial={{
                    x: 200,
                }}
                animate={{
                    x: [200, -30, 0],
                }}
                transition={{ duration: 0.8, ease: 'linear', times: [0, 0.6, 0.8] }}>
                <img src={ImageSignin} className={cx('image-section')} alt="Section Image" />
            </motion.div>
        </section>
    );
}

export default Section;
