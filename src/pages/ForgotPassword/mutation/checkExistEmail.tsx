import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';

import UserInterface from '../../../utils/interfaces/user';
import { checkExistEmail } from '../../../utils/API/axios';

const useCheckExistEmailMutation = () => {
    return useMutation({
        mutationKey: [`checkExistEmail`],
        mutationFn: checkExistEmail,
    });
};

export default useCheckExistEmailMutation;
