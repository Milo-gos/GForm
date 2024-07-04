import axios from 'axios';
import {
    GColumnInterface,
    OptionInterface,
    QuestionInterface,
    RowInterface,
    UserInterface,
} from '../../utils/interfaces';
import InstanceAxios from '../../config/axios-interceptors';
const BE_URL = process.env.REACT_APP_BE_URL;

export const changeOption = async (body: any) => {
    const response = await axios.put(`${BE_URL}/api/option`, body);
    const updateOption: QuestionInterface = response.data;
    return updateOption;
};

export const addOPtion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/option`, body);
    const option: OptionInterface = response.data;
    return option;
};

export const deleteOption = async (optionId: string) => {
    const response = await axios.delete(`${BE_URL}/api/option/${optionId}`);
    const option: OptionInterface = response.data;
    return option;
};
