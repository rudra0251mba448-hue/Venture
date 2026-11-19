import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message || 'An unexpected error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F8F7] text-[#141517] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#E4E4E0] rounded-xl p-6 space-y-4">
            <h1 className="font-display text-xl font-bold text-[#141517]">
              Something went wrong
            </h1>
            <p className="text-sm text-[#5A5D65] leading-relaxed">
              We encountered an error syncing with your AutoNest session. Please reload the page
              to continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#141517] text-white text-xs font-semibold rounded-lg hover:bg-[#C23527] transition-colors cursor-pointer"
            >
              Reload AutoNest
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
