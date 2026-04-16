import { Html, Head, Body, Text, Link, Container, Section, Row, Column } from '@react-email/components';

interface PasswordResetProps {
    name: string;
    resetUrl: string;
}

export default function PasswordReset({ name, resetUrl }: PasswordResetProps) {
    return (
        <Html>
            <Head>
                <title>Reset Your Global Forum Password</title>
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Section style={logoSection}>
                        <Row>
                            <Column align="center">
                                <h1 style={logoStyle}>🔑 Password Reset</h1>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={contentSection}>
                        <Row>
                            <Column>
                                <h2 style={headingStyle}>Hi {name},</h2>
                                <Text style={paragraphStyle}>
                                    You recently requested to reset your Global Forum password. Use the button below to set a new one.
                                </Text>

                                <Text style={warningStyle}>
                                    If you didn't request this, please ignore this email.
                                </Text>

                                <Text style={ctaText}>
                                    This link expires in 1 hour.
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={ctaSection}>
                        <Row>
                            <Column align="center">
                                <Link href={resetUrl} style={ctaButton}>
                                    Reset Password
                                </Link>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={footerSection}>
                        <Row>
                            <Column align="center">
                                <Text style={footerText}>
                                    Need help? Reply to this email.
                                </Text>
                                <Text style={footerText}>
                                    © 2024 Global Forum. Tanzania.
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
    backgroundColor: '#f8fafc',
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
    fontSize: '36px',
    fontWeight: '800',
    color: '#f59e0b',
    margin: 0,
};

const contentSection = {
    padding: '0 20px 20px',
};

const headingStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
};

const paragraphStyle = {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#475569',
    margin: '24px 0',
};

const warningStyle = {
    fontSize: '14px',
    lineHeight: 1.5,
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: '12px',
    borderRadius: '8px',
    borderLeft: '4px solid #dc2626',
    margin: '20px 0',
};

const ctaText = {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
    margin: '20px 0 16px 0',
};

const ctaSection = {
    padding: '0 20px 40px',
};

const ctaButton = {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 14px rgba(239,68,68,0.4)',
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
    textAlign: 'center' as const,
};

