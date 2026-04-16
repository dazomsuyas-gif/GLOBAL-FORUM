import { Html, Head, Body, Text, Link, Container, Section, Row, Column } from '@react-email/components';

interface WelcomeEmailProps {
    name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
    return (
        <Html>
            <Head>
                <title>Welcome to Global Forum!</title>
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Section style={logoSection}>
                        <Row>
                            <Column align="center">
                                <h1 style={logoStyle}>🌍 Global Forum</h1>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={contentSection}>
                        <Row>
                            <Column style={columnStyle}>
                                <h2 style={headingStyle}>Welcome aboard, {name}!</h2>
                                <Text style={paragraphStyle}>
                                    Thanks for joining Global Forum – your hub for marketplace trading, language learning,
                                    tourism bookings, and community connections.
                                </Text>

                                <Text style={paragraphStyle}>
                                    Get started with:
                                </Text>

                                <ul style={listStyle}>
                                    <li>🛒 Buy/sell on Marketplace (15+ payment methods)</li>
                                    <li>✈️ Book flights/hotels via Amadeus API</li>
                                    <li>🗣️ Practice languages with AI tutors</li>
                                    <li>👥 Join Tanzania Global Forum community</li>
                                </ul>

                                <Text style={ctaText}>
                                    Your account is ready. Explore now:
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={ctaSection}>
                        <Row>
                            <Column align="center">
                                <Link href="https://globalforum.co" style={ctaButton}>
                                    Start Exploring
                                </Link>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={footerSection}>
                        <Row>
                            <Column align="center">
                                <Text style={footerText}>
                                    Need help? Reply to this email or visit <Link href="https://globalforum.co/support" style={footerLink}>support.globalforum.co</Link>
                                </Text>
                                <Text style={footerText}>
                                    © 2024 Global Forum. Tanzania's premier digital marketplace & travel platform.
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const bodyStyle = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    maxWidth: '600px',
};

const logoSection = {
    padding: '40px 20px',
};

const logoStyle = {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
};

const contentSection = {
    padding: '0 20px 40px',
};

const columnStyle = {
    padding: '20px 0',
};

const headingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 1.3,
};

const paragraphStyle = {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#475569',
    margin: '24px 0',
};

const listStyle = {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#475569',
    margin: '20px 0 30px 0',
    paddingLeft: '20px',
};

const ctaSection = {
    padding: '0 20px 40px',
};

const ctaButton = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
};

const ctaText = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '30px 0 20px 0',
    textAlign: 'center' as const,
};

const footerSection = {
    padding: '40px 20px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
};

const footerText = {
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#64748b',
    margin: '8px 0',
};

const footerLink = {
    color: '#667eea',
    textDecoration: 'underline',
};

