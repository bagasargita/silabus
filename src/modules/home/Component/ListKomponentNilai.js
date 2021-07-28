import React, {useEffect, useState} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Box, Card, CardContent, Icon} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import ListIndikator from "./ListIndikator";
import AddIndikator from "./AddIndikator";
import {makeStyles} from "@material-ui/core/styles";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";
import ListKegiatan from "./ListKegiatan";
import AddKegiatan from "./AddKegiatan";
import AddNilai from "./AddNilai";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    pointer: {
        cursor: 'pointer',
        margin: 15,
    },
}));
const ListKomponentNilai = ({showAlert, id, type}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [triger, setTriger] = useState(0);
    const [idMateri, setIdMateri] = useState(0);
    const [indikator, setIndikator] = useState(false);
    const [listMateri, setListMateri] = useState([]);

    const getKegiatan = () => {
        const res = jwtAxios.get('/join/indikator-penilaian', {
            params: {
                id_indikator: id,
            }
        }).then(result => {
            const arr = [];
            Object.keys(result.data.items).map(t => {
                arr.push({
                    id: result.data.items[t].id,
                    penentuan_kkm: result.data.items[t].penentuan_kkm,
                    komplek_sitas: result.data.items[t].komplek_sitas,
                    daya_dukung: result.data.items[t].daya_dukung,
                    intake_siswa: result.data.items[t].intake_siswa,
                    name: result.data.items[t].name,
                });
            })
            setListMateri(arr);
        })
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleCloseIndikator = () => {
        setIndikator(false);
    }
    const handleOpenIndikator = (id) => {
        setIdMateri(id);
        setIndikator(true);
    }
    const refreshIndikator = () => {
        const ang = triger;
        setTriger(ang + 1);
    }
    useEffect(() => {
        refreshIndikator()
    }, []);

    useEffect(() => {
        getKegiatan();
    }, [id, triger]);

    return(
        <div className={classes.root}>
            <Typography style={{width: '100%'}}>
                <Card>
                    <Tooltip title="Add Materi" >
                        <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                            <Icon  className={classes.pointer}
                                   onClick={() => {
                                       handleOpenIndikator(id);
                                   }}
                            >
                                exposure_plus_1
                            </Icon>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Edit Materi">
                        <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                            <Icon  className={classes.pointer}
                                   onClick={() => {
                                       showAlert('Update Materi Dalam pengembangan', 'warning')
                                   }}
                            >
                                mode_edit
                            </Icon>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Delete Materi" >
                        <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                            <DeleteSharpIcon
                                className={classes.pointer}
                                onClick={() => {
                                    showAlert('Delete Materi Dalam Pengembangan', 'warning');
                                }}
                            />
                        </Box>
                    </Tooltip>
                </Card>
            </Typography>
            {Object.keys(listMateri).map(t => (
                <>
                    <Card style={{backgroundColor: '#dedede'}}>
                        <CardContent>
                            <p>penentuan_kkm : {listMateri[t].penentuan_kkm}</p>
                            <p>komplek_sitas : {listMateri[t].komplek_sitas}</p>
                            <p>daya_dukung : {listMateri[t].daya_dukung}</p>
                            <p>intake_siswa : {listMateri[t].intake_siswa}</p>
                            <p>name : {listMateri[t].name}</p>
                        </CardContent>
                    </Card>
                    <br/>
                </>
            ))}
            {indikator ? (
                <AddNilai open={indikator} close={handleCloseIndikator} idMateri={id} type='create' showAlert={showAlert} refresh={refreshIndikator} />
            ) : null}
        </div>
    )
}
export default ListKomponentNilai;