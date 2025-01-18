import { 
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Img,
  Section,
  Row,
  Column,
} from '@react-email/components';

interface EmailTemplateProps {
  customerName: string;
  downloadLink: string;
  reference: string;
  amount: number;
}

export const FormPurchaseEmail = ({
  customerName,
  downloadLink,
  reference,
  amount,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your Unifilm College Admission Form</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        {/* Logo */}
        <Img
          src={`${process.env.NEXT_PUBLIC_APP_URL}/images/unifilm-logo.PNG`}
          width="150"
          height="50"
          alt="Unifilm College"
          style={styles.logo}
        />
        
        <Heading style={styles.heading}>Thank You for Your Purchase</Heading>
        
        <Text style={styles.text}>
          Dear {customerName},
        </Text>
        
        <Text style={styles.text}>
          Thank you for taking the first step towards your creative journey at Unifilm College. Your payment has been successfully processed.
        </Text>

        {/* Payment Details */}
        <Section style={styles.detailsSection}>
          <Row>
            <Column>Reference Number:</Column>
            <Column style={styles.value}>{reference}</Column>
          </Row>
          <Row>
            <Column>Amount Paid:</Column>
            <Column style={styles.value}>GHS {amount/100}</Column>
          </Row>
        </Section>

        {/* Download Button */}
        <Link href={downloadLink} style={styles.button}>
          Download Admission Form
        </Link>

        {/* Requirements */}
        <Section style={styles.requirementsSection}>
          <Heading as="h3" style={styles.subheading}>Required Documents:</Heading>
          <ul style={styles.list}>
            <li>Valid ID (National ID/Passport/Driver's License)</li>
            <li>4 passport-sized photographs</li>
            <li>Previous academic certificates</li>
          </ul>
        </Section>

        {/* Contact Information */}
        <Section style={styles.contactSection}>
          <Heading as="h3" style={styles.subheading}>Need Help?</Heading>
          <Text style={styles.contactText}>
            Contact our admissions team:
          </Text>
          <Text style={styles.contactDetails}>
            📍 Kwashieman – Hong Kong, Lapaz Road (GPS: GA-528-3698)<br />
            📞 055 109 7942 | 030 398 0046 | 059 170 0051<br />
            ✉️ universalfilmcollege@gmail.com
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

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
  logo: {
    margin: '0 auto',
    marginBottom: '24px',
  },
  heading: {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#1e1b4b', // Using your brand color
    padding: '17px 0 0',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.4',
    color: '#3c4149',
    margin: '24px 0',
  },
  button: {
    backgroundColor: '#1e1b4b', // Using your brand color
    borderRadius: '5px',
    color: '#fff',
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
    margin: '28px 0',
  },
  detailsSection: {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '4px',
    margin: '24px 0',
  },
  value: {
    fontWeight: 'bold',
  },
  requirementsSection: {
    margin: '32px 0',
  },
  subheading: {
    fontSize: '18px',
    color: '#1e1b4b',
    marginBottom: '16px',
  },
  list: {
    margin: '0',
    padding: '0 0 0 24px',
    color: '#3c4149',
  },
  contactSection: {
    marginTop: '32px',
    borderTop: '1px solid #eaeaea',
    paddingTop: '32px',
  },
  contactText: {
    fontSize: '14px',
    color: '#3c4149',
    margin: '8px 0',
  },
  contactDetails: {
    fontSize: '14px',
    color: '#3c4149',
    lineHeight: '1.6',
  },
}; 