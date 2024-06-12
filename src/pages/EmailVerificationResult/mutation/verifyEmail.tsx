import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import UserInterface from '../../../utils/interfaces/user';
import { verifyEmail } from '../../../utils/API/axios';

const useVerifyEmailMutation = () => {
    return useMutation({
        mutationKey: [`VerifyEmail`],
        mutationFn: verifyEmail,
    });
};

export default useVerifyEmailMutation;
