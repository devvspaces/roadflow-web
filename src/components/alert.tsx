import { clearMessages } from "@/common/alerts";
import { useMessages } from "@/common/hooks/useMessages";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

export default function Alerts() {
  const messages = useMessages()

  useEffect(() => {
    setTimeout(() => {
      clearMessages()
    }, 5000)
  }, []);

  return (
    <>
      {
        messages && (
          <Stack spacing={3}>
            {
              messages.map((message, index) => (
                <Alert key={index} status={message.type}>
                  <AlertIcon />
                  {message.message}
                </Alert>
              ))
            }
          </Stack>
        )
      }
    </>
  );
}
