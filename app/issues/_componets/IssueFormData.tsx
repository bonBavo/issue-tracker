"use client";

import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic.js";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/issueSchema";
import { z } from "zod";
import ErrorMessage from "@/app/componets/ErroMessage";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type issueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
        router.push("/issues");
        router.refresh();
      } else {
        await axios.post("/api/issues", data);
        router.push("/issues");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  });

  const [error, setError] = useState("");

  return (
    <div className="max-w-xl space-y-3 mb-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-3 " onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}.</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="type your issue in here" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>{issue ? "Update issue" : "Submit New Issue"}</Button>
      </form>
    </div>
  );
};

export default IssueForm;
