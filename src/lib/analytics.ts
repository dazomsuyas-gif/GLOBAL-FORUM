// Google Analytics 4 Integration
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

interface GAEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export const pageView = (url: string) => {
    window.gtag?.('config', GA_ID, {
        page_path: url,
    });
};

export const eventTracker = ({ action, category, label, value }: GAEvent) => {
    window.gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};

// Consent management
export const updateConsent = (analytics: boolean) => {
    window.gtag?.('consent', 'update', {
        'analytics_storage': analytics ? 'granted' : 'denied',
    });
};

// Initialize GA
export const initGA = () => {
    if (typeof window !== 'undefined' && !window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('consent', 'default', {
        'analytics_storage': 'denied'
      });
    `;
        document.head.appendChild(inlineScript);
    }
};

