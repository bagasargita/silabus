import React from 'react';
import {authRole} from "../../shared/constants/AppConst";

export const homeConfig = [
    {
        auth: authRole.all,
        routes: [
            {
                path: '/home/:id',
                component: React.lazy(() => import('./Component/DetailSilabus')),
            },
            {
                path: '/home',
                component: React.lazy(() => import('./Home')),
            },
        ],
    },
];
