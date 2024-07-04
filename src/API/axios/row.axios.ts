import axios from 'axios';
import { GColumnInterface, RowInterface, UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../config/axios-interceptors';
const BE_URL = process.env.REACT_APP_BE_URL;

export const addRow = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/row`, body);
    const row: RowInterface = response.data;
    return row;
};

export const deleteRow = async (rowId: string) => {
    const response = await axios.delete(`${BE_URL}/api/row/${rowId}`);
    const row: RowInterface = response.data;
    return row;
};

export const changeRow = async (body: any) => {
    const response = await axios.put(`${BE_URL}/api/row`, body);
    const updateRow: RowInterface = response.data;
    return updateRow;
};
