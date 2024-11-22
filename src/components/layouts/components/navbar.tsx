import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Link,
  Image,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLogout } from "@/common/hooks/useLogout";
import { AlertType, addMessage } from "@/common/alerts";
import NextLink from "next/link";

export interface NavLinkItem {
  name: string;
  href: string;
}

const NavLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) => (
  <Link
    as={NextLink}
    px={2}
    py={1.5}
    rounded={"md"}
    color={useColorModeValue("gray.700", "gray.200")}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.300", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("dark", "light");
  const links: NavLinkItem[] = [
    {
      name: "Home",
      href: "/app/home",
    },
    {
      name: "Curriculums",
      href: "/app/curriculum/search",
    },
    // {
    //   name: "Events",
    //   href: "/app/events",
    // },
  ];
  const user = useCurrentUser();
  const { logout } = useLogout();

  useEffect(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  return (
    <>
      <Flex
        h={{ base: "3.5rem", md: 20 }}
        alignItems={"center"}
        justifyContent={"space-between"}
        maxWidth={"1300px"}
        mx={"auto"}
      >
        <IconButton
          size={"sm"}
          icon={menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Link
              as={NextLink}
              href={"/"}
              style={{ textDecoration: "None" }}
              display={"flex"}
              alignItems={"center"}
              gap={".7rem"}
            >
              <Image
                src={"/logo.png"}
                alt={"RoadFlow"}
                w={{ base: "25px", md: "40px" }}
              />
              <Heading size={"md"}>RoadFlowAI</Heading>
            </Link>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {user &&
              links.map((link, index) => (
                <NavLink href={link.href} key={index}>
                  {link.name}
                </NavLink>
              ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            align={"center"}
            spacing={6}
          >
            {!user && (
              <>
                <Button
                  as={NextLink}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  href={"/login"}
                >
                  Sign In
                </Button>
                <Button
                  as={NextLink}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  href={"/signup"}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Enroll
                </Button>
              </>
            )}
            <Button
              display={"block"}
              colorScheme="green"
              onClick={toggleColorMode}
              size={"sm"}
            >
              {bgColor === "dark" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>

          {user && (
            <Box ml={4}>
              <Menu>
                <MenuButton>
                  <Avatar
                    size={"sm"}
                    src={user.profile.image}
                    name={user.profile.fullname || user.username}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={"a"} href={"/app/profile"}>
                    My Account
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={async () => {
                      await logout();
                      addMessage(
                        AlertType.Success,
                        "You have been logged out."
                      );
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Flex>
      </Flex>

      {menuOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          {user && (
            <Stack as={"nav"} spacing={4}>
              {links.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          )}
          <Stack spacing={4} mt={7}>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              colorScheme="blue"
              href={"/login"}
              variant={"ghost"}
            >
              Sign In
            </Button>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"/signup"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Start learning
            </Button>
          </Stack>
        </Box>
      ) : null}
    </>
  );
}
