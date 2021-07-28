import React from "react";
import {useAuthUser} from "../../@crema/utility/AppHooks";
import {authRole} from '../../shared/constants/AppConst';
import HomeSuperAdmin from "./HomeSuperAdmin";
import HomeAdmin from "./HomeAdmin";
import HomeKaryawan from "./HomeKaryawan";

const Home = () => {
    const user = useAuthUser();
    switch (user.role) {
        case authRole.superadmin:
            return <HomeSuperAdmin />;
        case authRole.admin:
            return <HomeAdmin />;
        case authRole.karyawan:
            return <HomeKaryawan />;
        default:
            return <>Tidak ditemukan</>;
    }
}
export default Home;