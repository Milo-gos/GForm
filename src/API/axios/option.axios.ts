import axios from 'axios';
import {
    GColumnInterface,
    OptionInterface,
    QuestionInterface,
    RowInterface,
    UserInterface,
} from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const changeOption = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/option/changeOption`, body);
    const updateOption: QuestionInterface = response.data.data;
    return updateOption;
};

export const addOPtion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/option/addOption`, body);
    const option: OptionInterface = response.data.data;
    return option;
};

export const deleteOption = async (optionId: string) => {
    const response = await axios.delete(`${BE_URL}/api/option/deleteOption/${optionId}`);
    const option: OptionInterface = response.data.data;
    return option;
};
