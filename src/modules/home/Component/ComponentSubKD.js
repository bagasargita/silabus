import React, {useEffect, useState} from "react";
import AppCard from "../../../@crema/core/AppCard";
import {GridContainer} from "../../../@crema";
import {Box, Grid, Icon} from "@material-ui/core";
import {Fonts} from "../../../shared/constants/AppEnums";
import ButtonImage from "./ButtonImage";
import ListComponent from "./ListComponent";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/jwt-api";
import {useParams} from "react-router-dom";
import ComposeMail from "./ListSilabus/ComposeMail";
import CreateSubKD from "./CreateSubKD";

const ComponentSubKD = (props) => {
    const params = useParams();
    const [subKd, setSubKD] = useState([]);
    const [isComposeMail, setIsComposeMail] = useState(false);
    const [bgColor, setBgColor] =useState();

    const closeCompose = () => {
        setIsComposeMail(false);
    }

    const getSubKd = () => {
        const res = jwtAxios.get('/join/silabus-subkd', {
            params: {
                id_silabus: params.id,
            }
        });
        res.then(data => {
            const arr = [];
            Object.keys(data.data.items).map(t => {
                arr.push({
                    id: data.data.items[t].id,
                    nomor: `${data.data.items[t].no_kd}.${data.data.items[t].nomor}`,
                    nama : data.data.items[t].name,
                    nama_kd : data.data.items[t].name_kd,
                });
            });
            setSubKD(arr);
        })
    }
    const modeEdit = () => {
        setBgColor('#feffe0');
    }
    const modeDelete = () => {
        setBgColor('#ffe8ee');
    }

    useEffect(() => {
        getSubKd();
    }, []);

    return(
        <>
            <AppCard style={{

            }}>
                <GridContainer>
                    <Grid sx={12} md={12} item>
                        <Box>
                            <Box my={-5} fontSize={16} fontWeight={Fonts.BOLD}  >
                                Kompetisi Dasar
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} md={4} xl={4} item>
                        <Box
                            px={4}
                            onClick={() => {
                                setIsComposeMail(true);
                            }}>
                            <ButtonImage
                                heading='Tambah KD'
                                bgColor='#e0fffc'
                                color='black'
                                icon={<Icon fontSize='large'>system_update_alt</Icon>}
                            />
                        </Box>
                    </Grid>
                    <Grid sx={12} md={4} xl={4} item>
                        <Box px={4} onClick={() => {
                            modeEdit();
                        }}>
                            <ButtonImage
                                heading='Edit KD'
                                bgColor='#feffe0'
                                color='black'
                                icon={<Icon fontSize='large'>mode_edit</Icon>}
                            />
                        </Box>
                    </Grid>
                    <Grid sx={12} md={4} xl={4} item>
                        <Box px={4} onClick={() => {
                            modeDelete();
                        }}>
                            <ButtonImage
                                heading='Delete KD'
                                bgColor='#ffe8ee'
                                color='black'
                                icon={<Icon fontSize='large'>settings_ethernet</Icon>}
                            />
                        </Box>
                    </Grid>
                </GridContainer>
                <ListComponent recentPatients={subKd} bgColor={bgColor} refresh={getSubKd} showAlert={props.showAlert} />
            </AppCard>
            {isComposeMail ? (
                <CreateSubKD
                    type={'create'}
                    refresh={getSubKd}
                    isComposeMail={isComposeMail}
                    fungsi={props.fungsi}
                    showAlert={props.showAlert}
                    close={closeCompose}
                    onCloseComposeMail={closeCompose}
                />
            ) : null}
        </>
    );
}
export default ComponentSubKD;