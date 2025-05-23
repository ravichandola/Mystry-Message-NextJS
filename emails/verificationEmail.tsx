import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

// This interface defines the props for the VerificationEmail component
// - username: The user's name that will be displayed in the greeting
// - otp: One-time password/verification code to be displayed in the email
interface VerificationEmailProps {
  username: string;
  otp: string;
}

// VerificationEmail is a React Email component that generates a verification email template
// It takes a username and OTP code as props and renders a styled email with:
// - Custom font (Roboto with Verdana fallback)
// - Preview text showing the OTP
// - Personalized greeting with username
// - Instructions and the OTP code in a highlighted box
// - Warning message for unintended recipients
export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      {/* Head section contains title and font configuration */}
      <Head>
        <title>Verification Code</title>
        {/* Configure Roboto font with fallback to Verdana */}
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {/* Preview text shown in email clients before opening */}
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        {/* Greeting row with username */}
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        {/* Instructions row */}
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        {/* OTP display row with styled container */}
        <Row>
          <Text
            style={{
              padding: "12px 24px",
              backgroundColor: "#4F46E5", // Indigo color for highlighting
              color: "#ffffff",
              borderRadius: "4px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "16px 0",
            }}
          >
            {otp}
          </Text>
        </Row>
        {/* Security warning row */}
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        {}
      </Section>
    </Html>
  );
}
