import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white p-6 text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">System Malfunction</h1>
          <p className="text-gray-400 max-w-md mb-8">
            The application encountered a critical error. Please refresh the page or contact support.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg text-left overflow-auto max-w-full max-h-48 mb-6 border border-red-500/30">
            <code className="text-red-400 text-xs font-mono">
              {this.state.error?.toString()}
            </code>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all rounded-sm uppercase tracking-widest font-bold"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
