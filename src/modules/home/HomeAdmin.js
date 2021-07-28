import React, {useEffect, useState} from "react";
import ListSilabus from "./Component/ListSilabus";
import AlertPopUp from "./Component/AlertPopUp";
import jwtAxios from "../../@crema/services/auth/jwt-auth/jwt-api";

const HomeAdmin = () => {
    const [listSilabus, setListSilabus] = useState([]);
    const [alert, setAlert] = useState({
        massage: '',
        type: '',
        result: false
    });
    const showAlert = (massage, type) => {
        setAlert({
            massage: massage,
            type: type,
            result: true,
        })
    }

    const getListSilabus = () => {
        const res = jwtAxios.get('/silabus/get').then(data => {
            const arr = [];
            Object.keys(data.data.items).map(t => {
                arr.push({
                    id: data.data.items[t].id,
                    deskripsi: data.data.items[t].stauan_pendidikan,
                    subject: data.data.items[t].matpel,
                    kelas: data.data.items[t].nama_kelas,
                    status: 'N'
                })
            })
            setListSilabus({
                data: arr
            });
        }).then(() => {
            // showAlert('Data Silabus Berhasil di Ambil', 'warning')
        })
    }


    useEffect(() => {
        getListSilabus();
    }, []);
    return(
        <>
            <AlertPopUp massage={alert.massage} result={alert.result} type={alert.type} />
            <ListSilabus dataPacket={listSilabus} showAlert={showAlert} refresh={getListSilabus} />
        </>
    );
}

export default HomeAdmin;