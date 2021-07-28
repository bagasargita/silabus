import React, {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";

const RemoveMateri = (props) => {
    const deleteKD = () => {

    }

    return(
        <Dialog
            open={props.isOpen}
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
export default RemoveMateri;

RemoveMateri.defaultProps = {
    data: {id: ''},
};

