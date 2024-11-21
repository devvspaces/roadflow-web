import { IconButton, Tooltip } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

const FeedbackButton = () => {
  return (
    <Tooltip label="Give a feedback" fontSize="md">
      <IconButton
        as={"a"}
        href="https://forms.gle/sgb91CQyLq3fnPTt9"
        target="_blank"
        size={"lg"}
        pos={"fixed"}
        zIndex={2}
        bottom={{ base: "2rem", md: "4.5rem" }}
        right={".5rem"}
        rounded={"full"}
        icon={<ChatIcon />}
        aria-label="feedback-button"
      />
    </Tooltip>
  );
};

export default FeedbackButton;
