import React, {useEffect, useState} from 'react';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Scrollbar from '@crema/core/Scrollbar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {InfoView} from '../../../../../@crema';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from '@material-ui/core/styles';
import {grey, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import jwtAxios from '../../../../../@crema/services/auth/jwt-auth/jwt-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";

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

const ComposeMail = (props) => {
  const {isComposeMail, onCloseComposeMail} = props;
  const [listKelas, setListKelas] = useState([]);
  const [listMatPel, setListMatPel] = useState([]);
  const [isShowChip, onShowChip] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleBlur = (to) => {
    if (to !== '') {
      onShowChip(true);
    }
  };
  const saveSilabus = (stauan_pendidikan, id_matpel, kelas) => {
    const res = jwtAxios.post('/silabus/create', {
      stauan_pendidikan: stauan_pendidikan,
      id_matpel: id_matpel,
      kelas: kelas,
    });
    res.then((data) => {
      props.showAlert(`Data Silabus berhasil di tambahkan ${data.data.items.id}`, 'success');
      props.refresh();
      setIsSubmit(false);
      props.close();
    });
    res.catch(() => {
      props.showAlert(`Data Silabus Gagal di Tambahkan`, 'error');
      props.close();
      setIsSubmit(false);
    })
  };

  const getListKelas = () => {
    const res = jwtAxios.get('/addon/listkelas').then(data => {
      const arr = [];
      Object.keys(data.data.items).map(t => {
        arr.push({
          id: data.data.items[t].id,
          name: data.data.items[t].nama,
        })
      })
      setListKelas(arr);
      console.log(arr);
    })
  }
  const getListMatPel = () => {
    const res = jwtAxios.get('/addon/listpelajaran').then(data => {
      const arr = [];
      Object.keys(data.data.items).map(t => {
        arr.push({
          id: data.data.items[t].id,
          name: data.data.items[t].nama,
        });
      });
      setListMatPel(arr);
    })
  }

  useEffect(() => {
    getListKelas();
    getListMatPel();
  }, []);

  const classes = useStyles(props);

  return (
    <Dialog
      open={isComposeMail}
      onClose={() => onCloseComposeMail(false)}
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
          Susun Silabus
        </Box>
      </Box>
      <Scrollbar className={classes.scrollRoot}>
        <Formik
          initialValues={{
            stauan_pendidikan: '',
            id_matpel: '',
            kelas: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            setIsSubmit(true);
            saveSilabus(data.stauan_pendidikan, data.id_matpel, data.kelas.toString());
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
                              satuan pendidikan
                            </InputAdornment>
                          ),
                        }}
                        name='stauan_pendidikan'
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
                        <FormControl style={{
                          width: '43%',
                        }}>
                          <InputLabel htmlFor='age-helper'>Pilih Mata Pelajaran</InputLabel>
                          <Select
                              value={values.age}
                              onChange={handleChange}
                              inputProps={{
                                name: 'id_matpel',
                                id: 'age-helper',
                              }}>
                            <MenuItem value=''>
                              <em>None</em>
                            </MenuItem>
                            {Object.keys(listMatPel).map((data) => (
                                <MenuItem value={listMatPel[data].id}>{listMatPel[data].name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                        <FormControl style={{
                          width: '25%',
                        }}>
                          <InputLabel htmlFor='age-helper'>Pilih kelas</InputLabel>
                          <Select
                              value={values.age}
                              onChange={handleChange}
                              inputProps={{
                                name: 'kelas',
                                id: 'age-helper',
                              }}>
                            <MenuItem value=''>
                              <em>None</em>
                            </MenuItem>
                            {Object.keys(listKelas).map((data) => (
                                <MenuItem value={listKelas[data].id}>{listKelas[data].name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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

export default ComposeMail;

ComposeMail.defaultProps = {
  connection: null,
};

ComposeMail.prototype = {
  isComposeMail: PropTypes.bool.isRequired,
  onCloseComposeMail: PropTypes.func.isRequired,
};
