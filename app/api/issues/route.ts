import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { issueSchema } from "@/app/issueSchema";

export async function POST(request: NextRequest) {
  const issueBody = await request.json();
  const validatedIssue = issueSchema.safeParse(issueBody);
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
