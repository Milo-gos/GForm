import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import UserInterface from '../../../utils/interfaces/user';
import { signUp } from '../../../utils/API/axios';

const useSignUpMutation = () => {
    return useMutation({
        mutationKey: [`signUp`],
        mutationFn: signUp,
    });
};

export default useSignUpMutation;
