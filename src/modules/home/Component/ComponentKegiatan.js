import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";
import {useParams} from "react-router-dom";
import {Box, Card, Icon} from "@material-ui/core";
import AddMateri from "./AddMateri";
import ListMateriInIndikator from "./ListMateriInIndikator";
import ListKomponentKegiatan from "./ListKomponentKegiatan";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    pointer: {
        cursor: 'pointer',
        margin: 15,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 220,
    },
    toolbar: theme.mixins.toolbar,
}));
const ComponentKegiatan = ({showAlert, type}) => {
    const classes = useStyles();
    const [kd, setKd] = useState([]);
    const [addMateri, setAddMateri] = useState(false);
    const [materi, setMateri] = useState([{
        id: 0,
    }]);
    const [selectedMateri, setSelectedMateri] = useState(0);
    const params = useParams();

    const getKd = () => {
        const res = jwtAxios.get('/join/silabus-subkd', {
            params: {
                id_silabus: params.id,
            }
        });
        res.then(result => {
            const arr = [];
            Object.keys(result.data.items).map(t => {
                arr.push({
                    id: result.data.items[t].id,
                    name: result.data.items[t].name,
                });
            })
            setKd(arr);
        })
    }

    useEffect(() => {


    }, []);

    const getMateri = () => {
        const res = jwtAxios.get('/join/subkd-materi', {
            params: {
                id_subkd: selectedMateri,
            }
        });
        res.then(result => {
            const arr =[];
            Object.keys(result.data.items).map(t => {
                arr.push({
                    id: result.data.items[t].id,
                    materi: result.data.items[t].name,
                    created: result.data.items[t].created_at,
                });
            })
            setMateri(arr);
        });
    }


    useEffect(() => {
        getKd();
        getMateri();
        setSelectedMateri(materi[0].id);
    }, []);
    useEffect(() => {
        getMateri();
    }, [selectedMateri]);

    const handlerCloseAddMateri = () => {
        setAddMateri(false);
    }
    const handleOpenAddMateri = () => {
        setAddMateri(true);
    }


    return(
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <Drawer
                    className={classes.drawer}
                    variant='permanent'
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <h4 style={{
                        marginRight: 10,
                        marginLeft: 30,
                        paddingBottom: 10,
                    }}>Kompetisi Dasar</h4>
                    <Divider />
                    <List>
                        {Object.keys(kd).map(t => (
                            <ListItem button key={kd[t].name} onClick={() => {
                                console.log(kd[t].id)
                                setSelectedMateri(kd[t].id);
                            }}>
                                <ListItemIcon>
                                    <Icon>call_to_action</Icon>
                                </ListItemIcon>
                                <ListItemText primary={kd[t].name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    {selectedMateri != 0 ? (
                        <ListKomponentKegiatan id={selectedMateri} change={selectedMateri} showAlert={showAlert} type={type}/>
                    ) : null }
                </main>
            </div>
        </div>
    );
}
export default ComponentKegiatan;