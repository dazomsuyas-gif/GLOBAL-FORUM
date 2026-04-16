import type { VisaInfo } from '../../types/tourism';

export const VISA_COUNTRIES: Record<string, VisaInfo> = {
    'USA': {
        country: 'USA',
        required: true,
        type: 'Visa on Arrival / E-Visa',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 2
    },
    'UK': {
        country: 'UK',
        required: true,
        type: 'Visa on Arrival / E-Visa',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 2
    },
    'China': {
        country: 'China',
        required: true,
        type: 'E-Visa Required',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 5
    },
    'Germany': {
        country: 'Germany',
        required: true,
        type: 'Visa on Arrival / E-Visa',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 2
    },
    'India': {
        country: 'India',
        required: true,
        type: 'E-Visa Required',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 5
    },
    'Kenya': {
        country: 'Kenya',
        required: false,
        type: 'Visa Free (East Africa)',
        feeUSD: 0,
        feeTZS: 0,
        processingDays: 0
    },
    'UAE': {
        country: 'UAE',
        required: true,
        type: 'Visa on Arrival',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 1
    },
    'Saudi Arabia': {
        country: 'Saudi Arabia',
        required: true,
        type: 'E-Visa',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 3
    },
    'Russia': {
        country: 'Russia',
        required: true,
        type: 'E-Visa',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 7
    },
    'South Africa': {
        country: 'South Africa',
        required: true,
        type: 'Visa on Arrival',
        feeUSD: 50,
        feeTZS: 132500,
        processingDays: 2
    }
};

export const VISA_FAQ = [
    {
        question: 'Who needs a visa for Tanzania?',
        answer: 'Most nationalities require a visa. Citizens of East African Community (EAC) countries (Kenya, Uganda, Rwanda, Burundi, South Sudan) are visa exempt.'
    },
    {
        question: 'How much is the visa fee?',
        answer: 'Single entry visa costs $50 USD. Multiple entry visa $100 USD. E-visa fees are the same.'
    },
    {
        question: 'Can I get visa on arrival?',
        answer: 'Yes, available at major airports (DAR, JRO, ZNZ) and borders for most nationalities.'
    },
    {
        question: 'What documents do I need for visa?',
        answer: 'Valid passport (6+ months), passport photo, return ticket, proof of accommodation/funds.'
    },
    {
        question: 'How long is visa valid?',
        answer: 'Single entry visa valid for 90 days. Multiple entry visa valid for 1 year.'
    }
];
