import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const navBg = useColorModeValue("#f5f2f7", "gray.700"); // Light lavender vs. Dark Slate Gray
	const iconColor = useColorModeValue("gray.600", "whiteAlpha.900"); // Dark gray vs. Soft White

	return (
		<Container maxW={"1140px"} px={4} py={8}
  borderRadius="lg"
  bg={navBg} > 
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, #cc95c0, #dbd4b4, #7aa1d2)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} color={iconColor} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode} variant='ghost'>
						{/* Apply the dynamic color to both theme icons */}
						{colorMode === "light" ? (
							<IoMoon color={iconColor} size='20' />
						) : (
							<LuSun size='20' color={iconColor} />
						)}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;