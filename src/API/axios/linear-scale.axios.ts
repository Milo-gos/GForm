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

export const changeLinearScale = async (body: any) => {
    const response = await axios.put(`${BE_URL}/api/linearScale`, body);
    const updateOption: QuestionInterface = response.data;
    return updateOption;
};
