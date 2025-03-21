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
import { createIssueSchema } from "@/app/createIssueSchema";
import { z } from "zod";
import ErrorMessage from "@/app/componets/ErroMessage";

const SimpleMDE = dynamic(
    () => import( "react-simplemde-editor"),
    {
      ssr: false,
    }
    )

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<issueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}.</ErrorMessage>

        <Controller
          render={({ field }) => (
            <SimpleMDE placeholder="type your issue in here" {...field} />
          )}
          name="description"
          control={control}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
