import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { ERROR_BOUNDARY_COPY } from '../content/copy';

/**
 * Catches a render exception in one screen so the app shell (nav, update bar) stays usable.
 * `where` is the route hash, shown so a crash can be reported against an entry id. Reset by remounting (key = route).
 */
export default class ErrorBoundary extends Component<{ where: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Screen ${this.props.where} failed`, error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="space-y-2 rounded-xl border border-red-500/40 bg-red-950/30 p-4">
        <p className="text-sm font-medium text-red-200">{ERROR_BOUNDARY_COPY.title}</p>
        <p className="text-xs text-slate-300">
          {ERROR_BOUNDARY_COPY.where} <code className="text-slate-200">{this.props.where}</code>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-sky-600 px-3 text-sm font-medium text-white active:bg-sky-700"
          >
            <RefreshCw size={16} aria-hidden="true" /> {ERROR_BOUNDARY_COPY.reload}
          </button>
          <a href="#/" className="inline-flex min-h-11 items-center rounded-md border border-slate-600 px-3 text-sm font-medium text-slate-100">
            {ERROR_BOUNDARY_COPY.home}
          </a>
        </div>
      </div>
    );
  }
}
