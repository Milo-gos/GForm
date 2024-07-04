import axios from 'axios';
import { GColumnInterface, RowInterface, UserInterface } from '../../utils/interfaces';
const BE_URL = process.env.REACT_APP_BE_URL;

export const addGColumn = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/gcolumn`, body);
    const gcolumn: GColumnInterface = response.data;
    return gcolumn;
};

export const deleteGColumn = async (gcolumnId: string) => {
    const response = await axios.delete(`${BE_URL}/api/gcolumn/${gcolumnId}`);
    const gcolumn: GColumnInterface = response.data;
    return gcolumn;
};

export const changeGColumn = async (body: any) => {
    const response = await axios.put(`${BE_URL}/api/gcolumn`, body);
    const updateGColumn: RowInterface = response.data;
    return updateGColumn;
};
