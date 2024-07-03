import axios from 'axios';
import { GColumnInterface, RowInterface, UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const addGColumn = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/gcolumn/addGColumn`, body);
    const gcolumn: GColumnInterface = response.data.data;
    return gcolumn;
};

export const deleteGColumn = async (gcolumnId: string) => {
    const response = await axios.delete(`${BE_URL}/api/gcolumn/deleteGColumn/${gcolumnId}`);
    const gcolumn: GColumnInterface = response.data.data;
    return gcolumn;
};

export const changeGColumn = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/gcolumn/changeGColumn`, body);
    const updateGColumn: RowInterface = response.data.data;
    return updateGColumn;
};
