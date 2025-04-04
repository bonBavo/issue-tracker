import React from 'react';
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/componets/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
    return (
        <Box className="max-w-xl">
           <Skeleton/>
            <Flex className="space-x-3" my="2">
                <Skeleton width="5rem"/>
                <Skeleton width="9rem"/>
            </Flex>
            <Card className="prose mt-4">
                <Skeleton count={3}/>
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;