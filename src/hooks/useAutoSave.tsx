import React, { useEffect } from 'react';

const useAutoSave = (text: any, callback: any, delay = 500) => {
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [text, delay]);
};

export default useAutoSave;
