import { PersonPinCircleOutlined } from '@mui/icons-material';
import { Avatar, Dialog, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}
const MyDialog = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <ListItem disableGutters>
                <ListItemButton onClick={() => handleListItemClick('qqq')}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <PersonPinCircleOutlined />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={'qqq'} />
                </ListItemButton>
            </ListItem>
        </Dialog>
    );
};

export default MyDialog;
