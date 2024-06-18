import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import styles from './Section.module.scss';
import { motion } from 'framer-motion';
import { ImageSignin } from '../../../../assets/images';

const cx = classNames.bind(styles);

function Section() {
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
                <h5>#1 Trending</h5>
                <h4>Website hỗ trợ tạo khảo sát</h4>
                <h1>G - SURVEY</h1>
                <p>Tham gia thực hiện cuộc khảo sát theo phong cách của bạn!</p>
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
