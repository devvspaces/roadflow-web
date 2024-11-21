import { AppContext } from "@/lib/context";
import { Flex, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import Confetti from "react-confetti";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = () => {
  const { setConfettiVisible } = useContext(AppContext);

  const shareUrl = "https://rf.bloombyte.dev/"; // URL to share
  const title = "Transform Your Learning Journey with RoadFlowAI"; // Sample message to share
  const summary =
    "Unlock your learning potential with interactive road maps and quizzes, offering expertly curated courses that allow you to learn at your own pace and track your progress effectively.";
  const hashtag = "LearnByFlow";

  const toast = useToast();

  function done() {
    // setConfettiVisible!!(true);
    toast({
      title: "Thanks for sharing",
      position: "top",
      duration: 5000,
    });
    // setTimeout(() => {
    //   setConfettiVisible!!(false);
    // }, 5000);
  }

  return (
    <Flex gap={2}>
      <FacebookShareButton
        onShareWindowClose={done}
        url={shareUrl}
        hashtag={title}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        onShareWindowClose={done}
        url={shareUrl}
        title={`${title}\n\n${summary}`}
        hashtags={[hashtag]}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton
        onShareWindowClose={done}
        url={shareUrl}
        title={title}
        summary={summary}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <WhatsappShareButton
        onShareWindowClose={done}
        url={shareUrl}
        title={title}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </Flex>
  );
};

export default ShareButtons;
