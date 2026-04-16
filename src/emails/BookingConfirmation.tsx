import { Html, Head, Body, Text, Link, Container, Section, Row, Column, Img } from '@react-email/components';

interface BookingConfirmationProps {
    name: string;
    bookingDetails: {
        type: 'Flight' | 'Hotel' | 'Tour';
        id: string;
        date: string;
        destination: string;
        priceUSD: number;
        priceTZS: number;
    };
}

export default function BookingConfirmation({ name, bookingDetails }: BookingConfirmationProps) {
    const icon = bookingDetails.type === 'Flight' ? '✈️' : bookingDetails.type === 'Hotel' ? '🏨' : '🚌';

    return (
        <Html>
            <Head>
                <title>Booking Confirmed - {bookingDetails.type}</title>
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Section style={logoSection}>
                        <Row>
                            <Column align="center">
                                <h1 style={logoStyle}>{icon} Booking Confirmed</h1>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={contentSection}>
                        <Row>
                            <Column>
                                <h2 style={headingStyle}>Congratulations, {name}!</h2>
                                <Text style={paragraphStyle}>
                                    Your {bookingDetails.type.toLowerCase()} booking has been confirmed.
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={bookingDetailsSection}>
                        <Row>
                            <Column style={detailColumn}>
                                <Text style={detailLabel}>Booking ID</Text>
                                <Text style={detailValue}>{bookingDetails.id}</Text>
                            </Column>
                            <Column style={detailColumn}>
                                <Text style={detailLabel}>Destination</Text>
                                <Text style={detailValue}>{bookingDetails.destination}</Text>
                            </Column>
                            <Column style={detailColumn}>
                                <Text style={detailLabel}>Date</Text>
                                <Text style={detailValue}>{new Date(bookingDetails.date).toLocaleDateString()}</Text>
                            </Column>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Column>
                                <div style={priceRowStyle}>
                                    <span style={priceLabelStyle}>Total USD:</span>
                                    <span style={priceValueStyle}>${bookingDetails.priceUSD.toFixed(2)}</span>
                                </div>
                                <div style={priceRowStyle}>
                                    <span style={priceLabelStyle}>Total TZS:</span>
                                    <span style={priceValueStyle}>{bookingDetails.priceTZS.toLocaleString()} TZS</span>
                                </div>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={ctaSection}>
                        <Row>
                            <Column align="center">
                                <Link href="https://globalforum.co/tourism/bookings" style={ctaButton}>
                                    View Booking
                                </Link>
                            </Column>
                        </Row>
                        <Row>
                            <Column align="center">
                                <Link href="tel:+255768868546" style={supportButton}>
                                    📞 Call Support +255 768 868 546
                                </Link>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={footerSection}>
                        <Row>
                            <Column align="center">
                                <Text style={footerText}>
                                    Your booking is protected with our cancellation policy.
                                </Text>
                                <Text style={footerText}>
                                    Questions? Call +255 768 868 546 or reply to this email.
                                </Text>
                                <Text style={footerText}>
                                    © 2024 Global Forum. Tanzania's premier travel platform.
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
    backgroundColor: '#f0fdf4',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
    maxWidth: '600px',
};

const logoSection = {
    padding: '40px 20px',
};

const logoStyle = {
    fontSize: '36px',
    fontWeight: '800',
    color: '#059669',
    margin: 0,
};

const contentSection = {
    padding: '20px',
};

const headingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#059669',
};

const paragraphStyle = {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#065f46',
    margin: '24px 0',
};

const bookingDetailsSection = {
    padding: '24px 20px',
    backgroundColor: '#ecfdf5',
    borderRadius: '12px',
    margin: '20px 0',
    border: '1px solid #bbf7d0',
};

const detailColumn = {
    padding: '12px 8px',
};

const detailLabel = {
    fontSize: '14px',
    color: '#047857',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em' as const,
};

const detailValue = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#064e3b',
    marginTop: '4px',
};

const priceRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
};

const priceLabelStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#065f46',
};

const priceValueStyle = {
    fontSize: '20px',
    fontWeight: '800',
    color: '#059669',
};

const ctaSection = {
    padding: '20px',
};

const ctaButton = {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
    marginBottom: '16px',
};

const supportButton = {
    color: '#059669',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    border: '2px solid #10b981',
    padding: '12px 24px',
    borderRadius: '12px',
    backgroundColor: '#ecfdf5',
};

const footerSection = {
    padding: '40px 20px',
    backgroundColor: '#f0fdf4',
    borderTop: '1px solid #bbf7d0',
};

const footerText = {
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#047857',
    margin: '8px 0',
    textAlign: 'center' as const,
};

