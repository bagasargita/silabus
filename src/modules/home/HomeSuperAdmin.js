import React, {useEffect, useState} from "react";
import ListGuestBooks from "./Component/ListGuestBooks";
import {GridContainer} from "../../@crema";
import {AppBar, Button, Dialog, Grid, IconButton, List, Slide, Toolbar, Typography} from "@material-ui/core";
import ButtonCard from "./Component/ButtonCard";
import {useAuthUser} from "../../@crema/utility/AppHooks";
import jwtAxios from "../../@crema/services/auth/jwt-auth/jwt-api";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormAddGuestBooks from "./Component/FormAddGuestBooks";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const HomeSuperAdmin = () => {
    const classes = useStyles();
    const [guestBooks, setGuestBooks] = useState();
    const [openAddGuestBooks, setOpenGuestBooks] = useState(false);

    const handleCloseAddGuestBooks = () => {
        setOpenGuestBooks(false);
    }
    const addGuestBooks = () => {
        setOpenGuestBooks(true);
    }

    const getGuestBooks = () => {
        const res = jwtAxios.get('/guest-books/get').then((result) => {
            setGuestBooks(result.data.guestBooks);
        });
    }
    useEffect(() => {
        getGuestBooks();
    }, []);

    return(
        <>
            <GridContainer>
                <Grid item sm={2} xl={2} md={2} xs={12} lg={2}>
                    <ButtonCard data={{
                        bgColor: '#357820',
                        name: 'Menambahkan Tamu',
                        category: 'ADD GUESTBOOKS',
                        fungsi: addGuestBooks,
                    }}/>
                </Grid>
            </GridContainer> <br/>
            <ListGuestBooks transactionData={guestBooks} />
            {/*ini Untuk dialog*/}
            <Dialog
                fullScreen
                open={openAddGuestBooks}
                onClose={handleCloseAddGuestBooks}
                TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleCloseAddGuestBooks}
                            aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            Add Guest Books
                        </Typography>
                        <Button color='inherit' onClick={handleCloseAddGuestBooks}>
                            Guest Books
                        </Button>
                    </Toolbar>
                </AppBar>
                <FormAddGuestBooks />
            </Dialog>

        </>
    )
}
export default HomeSuperAdmin;