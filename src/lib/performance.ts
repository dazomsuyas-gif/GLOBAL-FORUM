// Performance monitoring utilities for Global Forum
import { onCLS, onFCP, onFID, onLCP, onTTFB, Metric } from 'web-vitals';

interface PerformanceMetrics {
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
  ttf b: number;
loadTime: number;
}

class PerformanceMonitor {
    private metrics: PerformanceMetrics = {
        fcp: 0,
        lcp: 0,
        cls: 0,
        fid: 0,
        ttf b: 0,
        loadTime: 0,
    };

    private analyticsQueue: Array<[string, any]> = [];

    constructor() {
        this.initWebVitals();
        this.initLoadTimeTracking();
        this.initNavigationTiming();
    }

    private initWebVitals() {
        onFCP((metric) => this.recordMetric('fcp', metric.value));
        onLCP((metric) => this.recordMetric('lcp', metric.value));
        onCLS((metric) => this.recordMetric('cls', metric.value));
        onFID((metric) => this.recordMetric('fid', metric.value));
        onTTFB((metric) => this.recordMetric('ttfb', metric.value));
    }

    private initLoadTimeTracking() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            this.flushAnalytics();
        });
    }

    private initNavigationTiming() {
        if ('navigation' in performance) {
            const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            this.metrics.ttfb = nav.loadEventEnd - nav.fetchStart;
        }
    }

    recordMetric(key: keyof PerformanceMetrics, value: number) {
        (this.metrics as any)[key] = value;

        // Check if all core metrics are available
        if (this.isComplete()) {
            this.sendPerformanceReport();
        }
    }

    private isComplete() {
        return this.metrics.fcp > 0 && this.metrics.lcp > 0 && this.metrics.cls > 0 && this.metrics.fid > 0;
    }

    private sendPerformanceReport() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: 'Core Web Vitals',
                value: this.getScore(),
                ...this.metrics,
            });
        }

        // Custom analytics
        const report = {
            ...this.metrics,
            score: this.getScore(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
        };

        console.log('🧠 Performance Report:', report);
        this.analyticsQueue.push(['performance_report', report]);
    }

    private getScore(): 'Good' | 'Needs Improvement' | 'Poor' {
        const lcp = this.metrics.lcp;
        const fid = this.metrics.fid;
        const cls = this.metrics.cls;

        if (lcp <= 2.5 && fid <= 100 && cls <= 0.1) return 'Good';
        if (lcp <= 4 && fid <= 300 && cls <= 0.25) return 'Needs Improvement';
        return 'Poor';
    }

    private flushAnalytics() {
        this.analyticsQueue.forEach(([event, data]) => {
            // Send to your analytics endpoint
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event, data }),
            });
        });
    }

    // Performance budget checks
    checkBudget() {
        const budget = {
            bundleSize: 200 * 1024, // 200KB
            lcp: 2500,
            ttfb: 600,
        };

        const violations: string[] = [];

        if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
            violations.push('Service Worker not registered');
        }

        // Check font loading
        if (document.fonts && document.fonts.check !== undefined) {
            const fonts = document.fonts;
            if (fonts.status === 'unloaded') {
                violations.push('Fonts not preloaded');
            }
        }

        console.log('📊 Performance Budget Check:', {
            violations,
            status: violations.length === 0 ? 'PASS' : 'FAIL',
            metrics: this.metrics,
        });

        return { violations, passed: violations.length === 0 };
    }

    // Preload critical resources
    preloadCritical(path: string) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'fetch';
        link.href = path;
        link.crossOrigin = '';
        document.head.appendChild(link);
    }
}

// Initialize globally
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitor = () => {
    if (!performanceMonitor) {
        performanceMonitor = new PerformanceMonitor();
    }
    return performanceMonitor;
};

// Performance budget check on load
export const runPerformanceBudgetCheck = () => {
    const monitor = initPerformanceMonitor();
    return monitor.checkBudget();
};

// Preload next-critical resources
export const preloadResources = () => {
    // Critical fonts
    preloadCritical('/fonts/inter.woff2');

    // Critical JS
    preloadCritical('/_next/static/chunks/main.js');

    // Critical CSS
    preloadCritical('/_next/static/css/app.css');
};

// Export for use in _document or _app
export { PerformanceMonitor };

