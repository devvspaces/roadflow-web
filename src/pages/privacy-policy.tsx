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

export default function PrivacyPolicy() {
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box minH="100vh" py={12}>
      <Container maxW="4xl" p={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" mb={4}>
              Privacy Policy
            </Heading>
            <Text color={textColor}>Last Updated: November 22, 2024</Text>
          </Box>

          <Section title="1. Information We Collect">
            <SubSection title="1.1 Personal Information">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>Email address (for account identification)</ListItem>
                <ListItem>Profile information</ListItem>
                <ListItem>Learning progress data</ListItem>
                <ListItem>Quiz results</ListItem>
              </UnorderedList>
            </SubSection>

            <SubSection title="1.2 Usage Data">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>Log data</ListItem>
                <ListItem>Course progress</ListItem>
                <ListItem>Learning analytics</ListItem>
                <ListItem>Platform interaction metrics</ListItem>
              </UnorderedList>
            </SubSection>
          </Section>

          <Section title="2. How We Use Your Information">
            <Text color={textColor} mb={4}>
              We use collected information to:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Provide personalized learning experiences</ListItem>
              <ListItem>Track course progress</ListItem>
              <ListItem>Analyze platform usage</ListItem>
              <ListItem>Improve our services</ListItem>
              <ListItem>Communicate important updates</ListItem>
              <ListItem>Ensure platform security</ListItem>
            </UnorderedList>
          </Section>

          <Section title="3. Information Sharing">
            <Text color={textColor} mb={4}>
              We do not share personal information with third parties except:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>When required by law</ListItem>
              <ListItem>To protect our rights</ListItem>
              <ListItem>
                With service providers who assist in platform operations (under
                strict confidentiality agreements)
              </ListItem>
            </UnorderedList>
          </Section>

          <Section title="4. Data Security">
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Encryption in transit and at rest</ListItem>
              <ListItem>Regular security assessments</ListItem>
              <ListItem>Access controls</ListItem>
              <ListItem>Secure data storage</ListItem>
              <ListItem>Regular security updates</ListItem>
            </UnorderedList>
          </Section>

          <Section title="5. User Rights">
            <Text color={textColor} mb={4}>
              In accordance with GDPR and CCPA, you have the right to:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Access your personal data</ListItem>
              <ListItem>Correct inaccurate data</ListItem>
              <ListItem>Request data deletion</ListItem>
              <ListItem>Export your data</ListItem>
              <ListItem>Restrict processing</ListItem>
              <ListItem>Object to processing</ListItem>
              <ListItem>
                Lodge a complaint with supervisory authorities
              </ListItem>
            </UnorderedList>
          </Section>

          <Section title="6. International Data Transfers">
            <Text color={textColor}>
              We may transfer data internationally with appropriate safeguards
              in compliance with GDPR and other applicable regulations. All
              international transfers include appropriate safeguards for your
              personal data as required by law.
            </Text>
          </Section>

          <Section title="7. GDPR Compliance (For EU Users)">
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>
                We process data under legitimate interests and consent bases
              </ListItem>
              <ListItem>We maintain records of processing activities</ListItem>
              <ListItem>
                We conduct data protection impact assessments where required
              </ListItem>
              <ListItem>
                We have appointed a data protection representative
              </ListItem>
              <ListItem>We honor data subject rights promptly</ListItem>
            </UnorderedList>
          </Section>

          <Section title="8. CCPA Compliance (For California Users)">
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>
                Right to know what personal information is collected
              </ListItem>
              <ListItem>Right to delete personal information</ListItem>
              <ListItem>
                Right to opt-out of sale of personal information (though we do
                not sell personal information)
              </ListItem>
              <ListItem>
                Right to non-discrimination for exercising CCPA rights
              </ListItem>
            </UnorderedList>
          </Section>

          <Section title="9. Children's Privacy">
            <Text color={textColor} mb={4}>
              We comply with COPPA:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>
                No collection of data from children under 13 without parental
                consent
              </ListItem>
              <ListItem>
                Parents can review, delete, and refuse further collection of
                their child&apos;s information
              </ListItem>
              <ListItem>Special protections for student data</ListItem>
            </UnorderedList>
          </Section>

          <Section title="10. Changes to Privacy Policy">
            <Text color={textColor} mb={4}>
              We will notify users of material changes to this policy through
              the Platform or via email. Continued use of the Platform after
              such modifications constitutes your acceptance of the updated
              Privacy Policy.
            </Text>
          </Section>

          <Section title="11. Contact Information">
            <Text color={textColor} mb={4}>
              For privacy concerns or data requests, contact:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Email: ayomide.a@bloombyte.dev</ListItem>
              <ListItem>Website: https://rf.bloombyte.dev/</ListItem>
            </UnorderedList>
          </Section>

          <Section title="12. Additional Rights and Information">
            <SubSection title="12.1 Cookie Policy">
              <Text color={textColor} mb={4}>
                We use essential cookies only for:
              </Text>
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>Maintaining user sessions</ListItem>
                <ListItem>Remembering preferences</ListItem>
                <ListItem>Analyzing platform usage</ListItem>
              </UnorderedList>
            </SubSection>

            <SubSection title="12.2 Data Retention">
              <UnorderedList spacing={2} color={textColor}>
                <ListItem>
                  We retain data only as long as necessary to provide our
                  services
                </ListItem>
                <ListItem>Users can request data deletion at any time</ListItem>
                <ListItem>
                  Some information may be retained for legal compliance
                </ListItem>
              </UnorderedList>
            </SubSection>

            <SubSection title="12.3 Security Breach Notification">
              <Text color={textColor}>
                We will notify users and relevant authorities of any personal
                data breaches in accordance with applicable laws. This
                notification will be made without undue delay and will include
                information about the breach and steps taken to address it.
              </Text>
            </SubSection>
          </Section>

          <Section title="13. Platform Security Measures">
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>Regular security audits and updates</ListItem>
              <ListItem>Secure user authentication processes</ListItem>
              <ListItem>Encrypted data transmission</ListItem>
              <ListItem>Regular backup procedures</ListItem>
              <ListItem>
                Employee security training and access controls
              </ListItem>
            </UnorderedList>
          </Section>

          <Section title="14. Third-Party Services">
            <Text color={textColor} mb={4}>
              While we do not currently use third-party services for core
              platform functionality, if we introduce such services in the
              future:
            </Text>
            <UnorderedList spacing={2} color={textColor}>
              <ListItem>
                We will carefully select and vet service providers
              </ListItem>
              <ListItem>
                Ensure they maintain appropriate security standards
              </ListItem>
              <ListItem>Update this privacy policy accordingly</ListItem>
              <ListItem>Notify users of significant changes</ListItem>
            </UnorderedList>
          </Section>

          <Divider my={8} />

          <Box textAlign="center" mt={8}>
            <Text color={textColor} fontWeight="bold" mb={2}>
              RoadFlowAI Privacy Office
            </Text>
            <Text color={textColor}>Email: ayomide.a@bloombyte.dev</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
