import React, {useEffect, useState} from 'react';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Scrollbar from '@crema/core/Scrollbar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {InfoView} from '../../../@crema';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from '@material-ui/core/styles';
import {grey, red} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import jwtAxios from '../../../@crema/services/auth/jwt-auth/jwt-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    dialogBox: {
        position: 'relative',
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 600,
            width: '100%',
        },
        '& .MuiTypography-h6': {
            fontWeight: Fonts.LIGHT,
        },
    },
    formRoot: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 20,
        [theme.breakpoints.up('xl')]: {},
    },
    fontBold: {
        fontWeight: Fonts.MEDIUM,
    },
    pointer: {
        cursor: 'pointer',
    },
    textareaAutosizeRoot: {
        width: '100%',
        border: '0 none',
        fontWeight: Fonts.REGULAR,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
    },
    btnRoot: {
        paddingLeft: 32,
        paddingRight: 32,
    },
    scrollRoot: {
        height: 300,
    },
}));
export const isValidEmail = (value) => {
    return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const MyTextField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            {...props}
            {...field}
            helperText={errorText}
            error={!!errorText}
        />
    );
};

const validationSchema = yup.object({});

const AddNilai = (props) => {
    const {isComposeMail, onCloseComposeMail} = props;
    const [KD, setKD] = useState([]);
    const [isShowChip, onShowChip] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const params = useParams();

    const handleBlur = (to) => {
        if (to !== '') {
            onShowChip(true);
        }
    };
    const saveIndikator = (penentuan_kkm, komplek_sitas, daya_dukung, intake_siswa) => {
        const res = jwtAxios.post('/penilaian/create', {
            id_indikator: props.idMateri,
            penentuan_kkm: penentuan_kkm,
            komplek_sitas: komplek_sitas,
            daya_dukung: daya_dukung,
            intake_siswa: intake_siswa,
        });
        res.then(data => {
            props.refresh();
            props.close();
            props.showAlert(`Indikator berhasil di tambahakan [${data.data.id}]`, 'success')

        });
        res.catch(data => {
            props.close();
            props.showAlert(`Indikator Gagal di tambahkan [${data}]`, 'error')
        })
    };
    const updateKD = (kd, id_ki, nomor) => {
        const res = jwtAxios.post('/subkd/update', {
            id: props.data.id,
            id_kd: id_ki,
            id_silabus: params.id,
            name: kd,
            nomor: nomor,
        });
        res.then(data => {
            props.refresh();
            props.close();
            props.showAlert(`Kompetisi Dasar berhasil di update [${data.data.id}]`, 'success')

        });
        res.catch(data => {
            props.close();
            props.showAlert(`Kompetisi Dasar Gagal di update [${data}]`, 'error')
        })
    }

    const getKD = () => {
        const res = jwtAxios.get('/kd/get').then(data => {
            const arr = [];
            Object.keys(data.data.items).map(t => {
                arr.push({
                    id: data.data.items[t].id,
                    name: data.data.items[t].name,
                });
            });
            setKD(arr);
        })
    }
    const getListMatPel = () => {

    }

    useEffect(() => {
        getKD();
    }, []);

    const classes = useStyles(props);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.close()}
            aria-labelledby='simple-modal-title'
            TransitionComponent={Transition}
            aria-describedby='simple-modal-description'
            className={classes.dialogBox}>
            <Box
                py={6}
                px={8}
                display='flex'
                flexDirection='row'
                alignItems='center'
                borderBottom={`1px solid ${grey[300]}`}>
                <Box component='h5' mb={0} fontWeight={Fonts.LIGHT}>
                    Create Kegiatan {props.idMateri}
                </Box>
            </Box>
            <Scrollbar className={classes.scrollRoot}>
                <Formik
                    initialValues={{
                        penentuan_kkm: props.data.penentuan_kkm ? props.data.penentuan_kkm : '',
                        komplek_sitas: props.data.komplek_sitas ? props.data.komplek_sitas : '',
                        daya_dukung: props.data.daya_dukung ? props.data.daya_dukung : '',
                        intake_siswa: props.data.kegiatan_penutup ? props.data.intake_siswa : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data) => {
                        setIsSubmit(true);
                        if(props.type == 'create'){
                            saveIndikator(data.penentuan_kkm, data.komplek_sitas, data.daya_dukung, data.intake_siswa);
                        }else if(props.type == 'update'){
                            updateKD(data.kd, data.id_ki, data.nomor);
                        }
                    }}>
                    {({isSubmitting, values, handleChange}) => (
                        <>
                            {isSubmit ? <LinearProgress color='primary' /> : null}
                            <Form className={classes.formRoot} noValidate autoComplete='off'>
                                <Box px={8} flex={1}>
                                    <Box display='flex' alignItems='center'>
                                        {!isShowChip ? (
                                            <MyTextField
                                                disabled={isSubmit}
                                                fullWidth
                                                margin='normal'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position='start'
                                                            className={classes.fontBold}>
                                                            penentuan_kkm
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                name='penentuan_kkm'
                                                onBlur={() => handleBlur(values.to)}
                                            />
                                        ) : (
                                            <Chip
                                                label={values.to}
                                                color={isValidEmail(values.to) ? '' : 'secondary'}
                                                onDelete={() => onShowChip(false)}
                                                variant='outlined'
                                            />
                                        )}
                                    </Box>
                                    <Box display='flex' alignItems='center'>
                                        {!isShowChip ? (
                                            <MyTextField
                                                disabled={isSubmit}
                                                fullWidth
                                                margin='normal'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position='start'
                                                            className={classes.fontBold}>
                                                            komplek_sitas
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                name='komplek_sitas'
                                                onBlur={() => handleBlur(values.to)}
                                            />
                                        ) : (
                                            <Chip
                                                label={values.to}
                                                color={isValidEmail(values.to) ? '' : 'secondary'}
                                                onDelete={() => onShowChip(false)}
                                                variant='outlined'
                                            />
                                        )}
                                    </Box>
                                    <Box display='flex' alignItems='center'>
                                        {!isShowChip ? (
                                            <MyTextField
                                                disabled={isSubmit}
                                                fullWidth
                                                margin='normal'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position='start'
                                                            className={classes.fontBold}>
                                                            daya_dukung
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                name='daya_dukung'
                                                onBlur={() => handleBlur(values.to)}
                                            />
                                        ) : (
                                            <Chip
                                                label={values.to}
                                                color={isValidEmail(values.to) ? '' : 'secondary'}
                                                onDelete={() => onShowChip(false)}
                                                variant='outlined'
                                            />
                                        )}
                                    </Box>
                                    <Box display='flex' alignItems='center'>
                                        {!isShowChip ? (
                                            <MyTextField
                                                disabled={isSubmit}
                                                fullWidth
                                                margin='normal'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position='start'
                                                            className={classes.fontBold}>
                                                            intake_siswa
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                name='intake_siswa'
                                                onBlur={() => handleBlur(values.to)}
                                            />
                                        ) : (
                                            <Chip
                                                label={values.to}
                                                color={isValidEmail(values.to) ? '' : 'secondary'}
                                                onDelete={() => onShowChip(false)}
                                                variant='outlined'
                                            />
                                        )}
                                    </Box>
                                </Box>

                                <Box px={8} py={4} bgcolor='grey.300'>
                                    <Button
                                        className={classes.btnRoot}
                                        variant='contained'
                                        color='secondary'
                                        type='submit'
                                        disabled={isSubmit}>
                                        <IntlMessages id='common.send' />
                                    </Button>
                                </Box>
                            </Form>
                        </>
                    )}
                </Formik>
                <InfoView />
            </Scrollbar>
        </Dialog>
    );
};

export default AddNilai;

AddNilai.defaultProps = {
    connection: null,
    data: {name:''}
};

AddNilai.prototype = {
    isComposeMail: PropTypes.bool.isRequired,
    onCloseComposeMail: PropTypes.func.isRequired,
};
