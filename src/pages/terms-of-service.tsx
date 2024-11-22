import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={8}>
    <Heading
      as="h2"
      size="lg"
      mb={4}
      color={useColorModeValue("gray.700", "white")}
    >
      {title}
    </Heading>
    {children}
  </Box>
);

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={6}>
    <Heading
      as="h3"
      size="md"
      mb={3}
      color={useColorModeValue("gray.600", "gray.200")}
    >
      {title}
    </Heading>
    {children}
  </Box>
);

export default function TermsOfService() {
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box minH="100vh" py={12}>
      <Container maxW="4xl" p={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" mb={4}>
              Terms of Service
            </Heading>
            <Text color={textColor}>Last Updated: November 22, 2024</Text>
          </Box>

          <Section title="1. Acceptance of Terms">
            <Text color={textColor}>
              By accessing and using RoadFlowAI (&quot;Platform&quot;) at
              https://rf.bloombyte.dev/, you agree to be bound by these Terms of
              Service (&quot;Terms&quot;). If you disagree with any part of
              these terms, you may not access the Platform.
            </Text>
          </Section>

          <Section title="2. Description of Service">
            <Text color={textColor} mb={4}>
              RoadFlowAI is a free e-learning platform that provides interactive
              road maps, educational content, courses, and quizzes to help users
              learn at their own pace.
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Course enrollment</ListItem>
              <ListItem>Curated learning roadmaps</ListItem>
              <ListItem>Interactive curriculums</ListItem>
              <ListItem>Progress tracking</ListItem>
              <ListItem>Practice quizzes</ListItem>
              <ListItem>Certificates of completion</ListItem>
            </UnorderedList>
          </Section>

          <Section title="3. User Accounts">
            <SubSection title="3.1 Registration">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>
                  Users must register for an account to access Platform features
                </ListItem>
                <ListItem>
                  Users must provide accurate and complete information
                </ListItem>
                <ListItem>
                  Users are responsible for maintaining account security
                </ListItem>
                <ListItem>Each user is entitled to one account only</ListItem>
              </UnorderedList>
            </SubSection>

            <SubSection title="3.2 Account Restrictions">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>Users must be at least 13 years of age</ListItem>
                <ListItem>Account sharing is prohibited</ListItem>
                <ListItem>
                  Users are responsible for all activities under their account
                </ListItem>
              </UnorderedList>
            </SubSection>
          </Section>

          <Section title="4. User Conduct">
            <Text color={textColor} mb={4}>
              Users agree not to:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Violate any laws or regulations</ListItem>
              <ListItem>Infringe on intellectual property rights</ListItem>
              <ListItem>Share account credentials</ListItem>
              <ListItem>Upload malicious content</ListItem>
              <ListItem>Harass other users</ListItem>
              <ListItem>Attempt to gain unauthorized access</ListItem>
              <ListItem>Misuse the platform&apos;s resources</ListItem>
              <ListItem>Share quiz answers or certificate credentials</ListItem>
            </UnorderedList>
          </Section>

          <Section title="5. Content and Intellectual Property">
            <SubSection title="5.1 Platform Content">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>
                  All content provided by RoadFlowAI is protected by copyright
                </ListItem>
                <ListItem>
                  Users may not reproduce or distribute Platform content without
                  permission
                </ListItem>
                <ListItem>
                  Open-source resources linked within courses are subject to
                  their respective licenses
                </ListItem>
              </UnorderedList>
            </SubSection>

            <SubSection title="5.2 User-Generated Content">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>Users retain ownership of their content</ListItem>
                <ListItem>
                  Users grant RoadFlowAI a license to use, display, and
                  distribute their content
                </ListItem>
                <ListItem>
                  Platform may remove content that violates these Terms
                </ListItem>
              </UnorderedList>
            </SubSection>
          </Section>

          <Section title="6. Service Terms">
            <SubSection title="6.1 Cost">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>
                  RoadFlowAI is currently provided free of charge
                </ListItem>
                <ListItem>
                  We reserve the right to introduce paid features in the future
                  with advance notice
                </ListItem>
                <ListItem>
                  Any future paid services will require explicit opt-in
                </ListItem>
              </UnorderedList>
            </SubSection>

            <SubSection title="6.2 Service Availability">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>
                  We strive to maintain platform availability but do not
                  guarantee uninterrupted service
                </ListItem>
                <ListItem>
                  We may modify or discontinue features with notice
                </ListItem>
                <ListItem>
                  Platform maintenance and updates may cause temporary service
                  interruptions
                </ListItem>
              </UnorderedList>
            </SubSection>
          </Section>

          <Section title="7. Termination">
            <Text color={textColor} mb={4}>
              We reserve the right to:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Suspend or terminate accounts for violations</ListItem>
              <ListItem>Remove content without notice</ListItem>
              <ListItem>Modify or discontinue services</ListItem>
            </UnorderedList>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <Text color={textColor}>
              The Platform is provided &quot;as is&quot; without warranties of
              any kind. RoadFlowAI makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties, including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </Text>
          </Section>

          <Section title="9. Limitation of Liability">
            <Text color={textColor}>
              In no event shall RoadFlowAI be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to
              business interruption) arising out of the use or inability to use
              the Platform, even if RoadFlowAI has been notified orally or in
              writing of the possibility of such damage.
            </Text>
          </Section>

          <Section title="10. Changes to Terms">
            <Text color={textColor}>
              We may modify these Terms at any time. We will notify users of any
              material changes to these Terms through the Platform or via email.
              Your continued use of the Platform after such modifications
              constitutes your acceptance of the modified Terms.
            </Text>
          </Section>

          <Section title="11. Governing Law and Jurisdiction">
            <Text color={textColor}>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which RoadFlowAI operates, without
              regard to its conflict of law provisions. Any disputes arising
              under or in connection with these Terms shall be subject to the
              exclusive jurisdiction of the courts in that jurisdiction.
            </Text>
          </Section>

          <Divider my={8} />

          <Box textAlign="center" mt={8}>
            <Text color={textColor}>
              For any questions about these Terms, please contact us at:
              ayomide.a@bloombyte.dev
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
