import React, {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";

const DeleteKD = (props) => {
    const [open, setOpen] = React.useState(false);
    const deleteKD = () => {
        const res = jwtAxios.delete('/subkd/delete', {
            params: {
                id: props.data.id,
            }
        }).then(data => {
            props.showAlert('Data Kompetisi Dasar Berhadil Di delete', 'warning');
            props.refresh();
            props.close();
        })
    }

    return(
        <Dialog
            open={props.isDelete}
            onClose={props.close}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title' style={{color: 'red'}}>
                {"Delete Kompetisi Dasar ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Deta Kompetisi Dasar yang sudah di hapus tidak dapat di kembalikan lagi.
                    Dan segala jenis kehilangan data akibat di deletenya Kompetisi Dasar bukan tanggung jawaban pembikin system
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color='primary'>
                    Batal
                </Button>
                <Button onClick={() => {
                    deleteKD();
                }} style={{color: 'red'}} autoFocus>
                    Hapus KD
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DeleteKD;

DeleteKD.defaultProps = {
    data: {id: ''},
};

