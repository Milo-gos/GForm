import React from 'react';
import { HashLoader } from 'react-spinners';
import { useAppSelector } from '../../redux';

const LoadingLayout = ({ children }: { children: JSX.Element }) => {
    const isLoading = useAppSelector((state) => state.global.isLoading);
    return (
        <div>
            <HashLoader
                color={'#fcc934'}
                loading={isLoading}
                size={70}
                speedMultiplier={1}
                cssOverride={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    zIndex: '999999',
                }}
            />
            {children}
        </div>
    );
};

export default LoadingLayout;
