import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "@/app/createIssueSchema";

export async function POST(request: NextRequest) {
  const issueBody = await request.json();
  const validatedIssue = createIssueSchema.safeParse(issueBody);
  if (!validatedIssue.success)
    return NextResponse.json(validatedIssue.error.errors, { status: 404 });
  const newIssue = await prisma.issue.create({
    data: {
      title: issueBody.title,
      description: issueBody.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
