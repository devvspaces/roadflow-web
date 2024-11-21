import { ReactNode, useContext, useEffect, useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import FooterBar from "./components/footer";
import Alerts from "../alert";
import FeedbackButton from "./components/feedback";
import Confetti from "react-confetti";
import { AppContext } from "@/lib/context";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const bgNav = useColorModeValue("gray.200", "#090a10");
  const { isConfettiVisible } = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <main
      style={{
        position: "relative",
      }}
    >
      {isConfettiVisible && <Confetti width={windowWidth} />}
      <Box bg={bgNav} px={{ base: 3, md: 5 }} borderBottomRadius={".7rem"}>
        <Navbar />
      </Box>

      <Alerts />

      <Box width={"100%"} minH={"100vh"} pb={"3rem"}>
        {children}
      </Box>

      <FeedbackButton />
      <FooterBar />
    </main>
  );
}
