import axios from 'axios';
import { GColumnInterface, RowInterface, UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const addRow = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/row/addRow`, body);
    const row: RowInterface = response.data.data;
    return row;
};

export const deleteRow = async (rowId: string) => {
    const response = await axios.delete(`${BE_URL}/api/row/deleteRow/${rowId}`);
    const row: RowInterface = response.data.data;
    return row;
};

export const changeRow = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/row/changeRow`, body);
    const updateRow: RowInterface = response.data.data;
    return updateRow;
};
