import React, {useEffect, useState} from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Icon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles} from "@material-ui/core/styles";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";
import ListKomponentKegiatanIndikator from "./ListKomponentKegiatanIndikator";

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
const ListKomponentKegiatan = ({id, change, showAlert, type}) => {
    const classes = useStyles();
    const [materi, setMateri] = useState([]);
    const [selMateri, setSelMateri] = useState(0);

    const getIndikator = () => {
        const res = jwtAxios.get('/join/subkd-materi', {
            params: {
                id_subkd: id,
            }
        }).then(result => {
            const arr = [];
            Object.keys(result.data.items).map(t => {
                arr.push({
                    id : result.data.items[t].id,
                    name : result.data.items[t].name,
                })
            })
            setMateri(arr);
        });
    }

    useEffect(() =>{
        getIndikator();
    }, [id]);
    useEffect(() => {
        setSelMateri(0);
    }, [change])


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
                    }}>Materi</h4>
                    <Divider />
                    <List>
                        {Object.keys(materi).map(t => (
                            <ListItem button key={materi[t].name} onClick={() => {
                                setSelMateri(materi[t].id);
                            }}>
                                <ListItemIcon>
                                    <Icon>call_to_action</Icon>
                                </ListItemIcon>
                                <ListItemText primary={materi[t].name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    {selMateri != 0 ? (
                        <ListKomponentKegiatanIndikator id={selMateri} change={selMateri} showAlert={showAlert} type={type}/>
                    ) : null }
                </main>
            </div>
        </div>
    )
}
export default ListKomponentKegiatan;