import React, { useEffect, useRef } from 'react';

const useAutoSave = (data: any, callback: any, delay = 500) => {
    const prevData = useRef(data);
    useEffect(() => {
        let timeOutId: any;
        if (prevData.current !== data) {
            prevData.current = data;
            timeOutId = setTimeout(() => {
                callback();
            }, delay);
        }
        return () => {
            clearTimeout(timeOutId);
        };
    }, [data, callback]);
};

export default useAutoSave;
