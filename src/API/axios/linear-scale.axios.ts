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

export const changeLinearScale = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/linearScale/changeLinearScale`, body);
    const updateOption: QuestionInterface = response.data.data;
    return updateOption;
};
