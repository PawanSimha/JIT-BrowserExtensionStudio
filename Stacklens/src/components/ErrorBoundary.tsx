import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            <span className="text-lg" style={{ color: '#EF4444' }}>!</span>
          </div>
          <p className="text-xs text-text-secondary max-w-[240px] font-body">
            Something went wrong. Close and reopen the extension.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
