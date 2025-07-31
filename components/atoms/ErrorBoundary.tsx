'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring service
      // analyticsService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 text-center bg-cloud rounded-xl border border-steel/20"
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-electric-coral/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-electric-coral"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-graphite mb-2">
            Что-то пошло не так
          </h3>
          
          <p className="text-steel mb-6 max-w-md">
            Произошла неожиданная ошибка. Мы уже работаем над её исправлением.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 p-4 bg-steel/5 rounded-lg text-left w-full max-w-md">
              <summary className="cursor-pointer text-sm font-medium text-steel mb-2">
                Детали ошибки (только в разработке)
              </summary>
              <pre className="text-xs text-steel whitespace-pre-wrap">
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={this.handleRetry}
              className="min-w-[120px]"
            >
              Попробовать снова
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="min-w-[120px]"
            >
              Перезагрузить страницу
            </Button>
          </div>

          <p className="text-xs text-steel/70 mt-4">
            Если проблема повторяется, обратитесь в поддержку
          </p>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 