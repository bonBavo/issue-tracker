"use client";

import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/createIssueSchema";
import { z } from "zod";

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

      <form
        className="max-w-xl space-y-3 "
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}.
          </Text>
        )}
        <Controller
          render={({ field }) => (
            <SimpleMDE placeholder="type your issue in here" {...field} />
          )}
          name="description"
          control={control}
        />
        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}

        <Button>submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
