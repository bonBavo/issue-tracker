import React from 'react';
import {Box} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
    return (
        <div>
           <Box className="max-w-xl">
               <Skeleton width="5rem"/>
               <Skeleton height="20rem"/>

           </Box>
        </div>
    );
};

export default LoadingNewIssuePage;