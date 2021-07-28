import React, {useEffect, useState} from "react";
import ComponentSubKD from "./ComponentSubKD";
import AlertPopUp from "./AlertPopUp";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import {Box, Card, Icon, Tab, Tabs, Typography} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import {history} from "../../../redux/store";
import PropTypes from 'prop-types';
import ComponentMateri from "./ComponentMateri";
import ComponentIndikator from "./ComponentIndikator";
import ComponentKegiatan from "./ComponentKegiatan";
import {useParams} from "react-router-dom";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <Typography
            style={{
                width: '100%',
            }}
            component='div'
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}>
            <Box p={3} >{children}</Box>
        </Typography>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    pointer: {
        cursor: 'pointer',
        margin: 15,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        width: '100%',
        flex: 1,
        marginRight: 0,
        marginLeft: 0,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 220,
    },
}));
const DetailSilabus = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
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
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    const backHome = () => {
        history.push('/home');
    }

    const {id} = useParams();
    useEffect(() => {
        console.log("test")
        console.log(id)
    }, []);

    return(
        <>
            <AlertPopUp massage={alert.massage} result={alert.result} type={alert.type} />
            <Card>
                <Tooltip title={<IntlMessages id='common.back' />}>
                    <Box mx={2} my={0.5} component='span' color='text.disabled'>
                        <KeyboardBackspaceIcon
                            onClick={() => {backHome()}}
                            className={classes.pointer}
                        />
                    </Box>
                </Tooltip>
                <Tooltip title={<IntlMessages id='common.trash' />}>
                    <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                        <DeleteSharpIcon
                            className={classes.pointer}
                            onClick={() => {
                                showAlert('Delete Dalam Pengembangan', 'warning')
                            }}
                        />
                    </Box>
                </Tooltip>
                <Tooltip title={<IntlMessages id='common.trash' />}>
                    <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
                        <Icon  className={classes.pointer}
                               onClick={() => {
                                   showAlert('archive dalam pengembagan Dalam Pengembangan', 'warning')
                               }}
                        >
                            archive
                        </Icon>
                    </Box>
                </Tooltip>
            </Card>
            <br />
            <div className={classes.root}>
                <Tabs
                    orientation='vertical'
                    variant='scrollable'
                    value={value}
                    onChange={handleChange}
                    aria-label='Vertical tabs example'
                    className={classes.tabs}>
                    <Tab label='Kompetisi Dasar' {...a11yProps(0)} />
                    <Tab label='Materi' {...a11yProps(1)} />
                    <Tab label='Indikator' {...a11yProps(2)} />
                    <Tab label='Kegiatan' {...a11yProps(3)} />
                    <Tab label='Penilaian' {...a11yProps(4)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ComponentSubKD showAlert={showAlert} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ComponentMateri  showAlert={showAlert} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ComponentIndikator showAlert={showAlert} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ComponentKegiatan showAlert={showAlert} type="kegiatan" />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ComponentKegiatan showAlert={showAlert} type="penilaian" />
                </TabPanel>
            </div>

        </>
    );
}
export default DetailSilabus;