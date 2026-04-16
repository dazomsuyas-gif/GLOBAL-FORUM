import { Html, Head, Body, Text, Link, Container, Section, Row, Column, Img } from '@react-email/components';

interface OrderConfirmationProps {
    orderNumber: string;
    totalUSD: number;
    totalTZS: number;
    products: Array<{
        title: string;
        quantity: number;
        priceUSD: number;
    }>;
}

export default function OrderConfirmation({ orderNumber, totalUSD, totalTZS, products }: OrderConfirmationProps) {
    return (
        <Html>
            <Head>
                <title>Order #{orderNumber} Confirmed</title>
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Section style={logoSection}>
                        <Row>
                            <Column align="center">
                                <h1 style={logoStyle}>🛒 Order Confirmed</h1>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={contentSection}>
                        <Row>
                            <Column>
                                <h2 style={headingStyle}>Thank you for your order!</h2>
                                <Text style={paragraphStyle}>
                                    Order <strong>#{orderNumber}</strong> has been received and is being processed.
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={orderDetailsSection}>
                        <Row>
                            <Column style={detailColumn}>
                                <Text style={detailLabel}>Order Number</Text>
                                <Text style={detailValue}>{orderNumber}</Text>
                            </Column>
                            <Column style={detailColumn}>
                                <Text style={detailLabel}>Total USD</Text>
                                <Text style={detailValue}>${totalUSD.toFixed(2)}</Text>
                            </Column>
                            <Column style={detailColumn}>
                                <Text style={detailLabel}>Total TZS</Text>
                                <Text style={detailValue}>{totalTZS.toLocaleString()} TZS</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={productsSection}>
                        <Row>
                            <Column>
                                <h3 style={productsHeading}>Your Items</h3>
                                {products.map((product, index) => (
                                    <div key={index} style={productRowStyle}>
                                        <div style={productInfoStyle}>
                                            <Text style={productNameStyle}>{product.title}</Text>
                                            <Text style={productQtyStyle}>Qty: {product.quantity}</Text>
                                        </div>
                                        <Text style={productPriceStyle}>${product.priceUSD.toFixed(2)}</Text>
                                    </div>
                                ))}
                            </Column>
                        </Row>
                    </Section>

                    <Section style={ctaSection}>
                        <Row>
                            <Column align="center">
                                <Link href="https://globalforum.co/marketplace/orders" style={ctaButton}>
                                    Track Order
                                </Link>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={footerSection}>
                        <Row>
                            <Column align="center">
                                <Text style={footerText}>
                                    Questions? Reply to this email or contact support@globalforum.co
                                </Text>
                                <Text style={footerText}>
                                    © 2024 Global Forum. All rights reserved.
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
    color: '#059669',
    margin: 0,
};

const contentSection = {
    padding: '20px',
};

const headingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
};

const paragraphStyle = {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#475569',
    margin: '24px 0',
};

const orderDetailsSection = {
    padding: '20px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    margin: '20px 0',
};

const detailColumn = {
    padding: '12px 0',
};

const detailLabel = {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
};

const detailValue = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
};

const productsSection = {
    padding: '20px',
};

const productsHeading = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
};

const productRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
};

const productInfoStyle = {
    flex: 1,
};

const productNameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '4px',
};

const productQtyStyle = {
    fontSize: '14px',
    color: '#64748b',
};

const productPriceStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#059669',
};

const ctaSection = {
    padding: '20px',
};

const ctaButton = {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
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

