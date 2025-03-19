import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1, "title is required").max(255),
  description: z.string().min(1, "decription is required"),
});

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
