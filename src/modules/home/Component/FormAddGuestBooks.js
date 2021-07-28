import React, {useEffect, useMemo, useState} from "react";
import {GridContainer} from "../../../@crema";
import {Button, Grid, TextField} from "@material-ui/core";
import AppCard from "../../../@crema/core/AppCard";
import {useDropzone} from "react-dropzone";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";

const FormAddGuestBooks = () => {
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#ffffff',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    };
    const activeStyle = {
        borderColor: '#2196f3',
    };
    const acceptStyle = {
        borderColor: '#00e676',
    };
    const rejectStyle = {
        borderColor: '#ff1744',
    };
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({accept: 'image/*'});
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragAccept, isDragReject],
    );
    const [nik, setNik] = useState();
    const [nama, setNama] = useState();
    const [tgl_lahir, setTgl_lahir] = useState();
    const [tmpt_lahir, setTemptLahir] = useState();
    const [jenkel, setJenkel] = useState();
    const [gol_darah, setGol_darah] = useState();
    const [tmpt_tinggal, setTmpt_tinggal] = useState();
    const [agama, setAgama] = useState();
    const [status_perkawinan, setStatus_perkawinan] = useState();
    const [pekerjaan, setPekerjaan] = useState();
    const [kewarganegaraan, setKewarganegaraan] = useState();
    const [berlaku_hingga, setBerlaku_hingga] = useState();
    const [foto_ktp, setFoto_ktp] = useState();

    const saveGuestBooks = () => {
        console.log(nama);
    }
    const validasiNik = () => {
        const res = jwtAxios.get('/visitor/search-simple', {
            params: {
                'nik': nik
            }
        }).then((result) => {
            console.log(result.data)
            setNama(result.data.data.visitor.nama);
            setTgl_lahir(result.data.data.visitor.tgl_lahir)
            setTemptLahir()
            setJenkel()
            setGol_darah()
            setTmpt_tinggal()
            setAgama()
            setStatus_perkawinan()
            setPekerjaan()
            setKewarganegaraan()
            setBerlaku_hingga()
        }).catch(error => {

        })
    }
    useEffect(() => {
        validasiNik();
    }, [nik]);


    return(
        <>
            <GridContainer>
                {/*Side Left*/}
                <Grid item lg={8} xs={12} xl={8} md={8} sm={8}>
                    <AppCard>
                        <GridContainer>
                            <Grid item xl={12} sm={12} md={12} xs={12} lg={12}  >
                                <TextField
                                    onChange={(e) => {
                                        setNik(e.target.value);
                                    }}
                                    id='standard-full-width'
                                    label='NIK / Nomor Induk Negara'
                                    style={{margin: 8}}
                                    placeholder='9812387120308923'
                                    helperText='Full width!'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setNama(e.target.value);
                                    }}
                                    value={nama}
                                    id='standard-full-width'
                                    label='Nama Lengkap'
                                    style={{margin: 8}}
                                    placeholder='Elko Aditya Dharma putra'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setTgl_lahir(e.target.value);
                                    }}
                                    value={tgl_lahir}
                                    id='standard-full-width'
                                    label='Tanggal Lahir'
                                    style={{margin: 8}}
                                    placeholder='10 Desember 2021'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setTemptLahir(e.target.value);
                                    }}
                                    value={tmpt_lahir}
                                    id='standard-full-width'
                                    label='Tempat Lahir'
                                    style={{margin: 8}}
                                    placeholder='Semarang'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setJenkel(e.target.value);
                                    }}
                                    value={jenkel}
                                    id='standard-full-width'
                                    label='Jenis Kelamin'
                                    style={{margin: 8}}
                                    placeholder='Laki - Laki / Perempuan'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setGol_darah(e.target.value);
                                    }}
                                    value={gol_darah}
                                    id='standard-full-width'
                                    label='Golongan Darah'
                                    style={{margin: 8}}
                                    placeholder='A \ B \ O \ AB'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setTmpt_tinggal(e.target.value);
                                    }}
                                    value={tmpt_tinggal}
                                    id='standard-full-width'
                                    label='Tempat Tinggal'
                                    style={{margin: 8}}
                                    placeholder='Prum. Plamongan Indah E1/23'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setAgama(e.target.value);
                                    }}
                                    value={agama}
                                    id='standard-full-width'
                                    label='Agama'
                                    style={{margin: 8}}
                                    placeholder='Budha'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setStatus_perkawinan(e.target.value);
                                    }}
                                    value={status_perkawinan}
                                    id='standard-full-width'
                                    label='Status Pekawinan'
                                    style={{margin: 8}}
                                    placeholder='Belum Menikah'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setPekerjaan(e.target.value);
                                    }}
                                    value={pekerjaan}
                                    id='standard-full-width'
                                    label='Pekerjaan'
                                    style={{margin: 8}}
                                    placeholder='Mahasiswa'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setKewarganegaraan(e.target.value);
                                    }}
                                    value={kewarganegaraan}
                                    id='standard-full-width'
                                    label='Kewarganegaraan'
                                    style={{margin: 8}}
                                    placeholder='NKRI'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    onChange={(e) => {
                                        setBerlaku_hingga(e.target.value);
                                    }}
                                    value={berlaku_hingga}
                                    id='standard-full-width'
                                    label='Berkalu Sampai'
                                    style={{margin: 8}}
                                    placeholder='10 January 2022'
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </GridContainer>
                    </AppCard>
                </Grid>
                {/*Side Right*/}
                <Grid item lg={4} xs={12} xl={4} md={4} sm={4}>
                    <AppCard
                        title="Upload Foto KTP"
                    >
                        <div className='container'>
                            <div {...getRootProps({style})} >
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </div>
                    </AppCard>

                    <Button variant='contained' fullWidth style={{backgroundColor: '#359c49', color: 'white'}}
                        onClick={() => {
                            saveGuestBooks();
                        }}
                    >
                        Add Guest Books
                    </Button>
                </Grid>
            </GridContainer>
        </>
    );
}
export default FormAddGuestBooks;