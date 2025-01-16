import { 
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  customerName: string;
  downloadLink: string;
}

export const FormPurchaseEmail = ({
  customerName,
  downloadLink,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your Unifilm College Admission Form</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Heading style={styles.heading}>Thank You for Your Purchase</Heading>
        <Text style={styles.text}>
          Dear {customerName},
        </Text>
        <Text style={styles.text}>
          Thank you for purchasing the Unifilm College admission form. You can download your form using the link below:
        </Text>
        <Link href={downloadLink} style={styles.button}>
          Download Admission Form
        </Link>
        <Text style={styles.text}>
          This link will be valid for 24 hours. If you have any issues, please contact our support team.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Define styles as an object
const styles = {
  main: {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
  },
  heading: {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.4',
    color: '#3c4149',
    margin: '24px 0',
  },
  button: {
    backgroundColor: '#1e1b4a',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
    margin: '28px 0',
  },
}; 