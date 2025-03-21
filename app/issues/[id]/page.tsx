import React from 'react';
import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/componets/IssueStatusBadge";

interface Props {
    params:{
        id : string;
    }
}

const IssueDetailPage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        where:{
            id: parseInt(params.id)
        }
    })
    if (!issue) notFound();
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <p>{issue.description}</p>
            </Card>
        </div>
    );
};

export default IssueDetailPage;