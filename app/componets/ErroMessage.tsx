import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null;
  return (
    <Text as="p" color="red">
      {children}
    </Text>
  );
}

export default ErrorMessage;
