// ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Something went wrong. Please reload the page.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary> {/* Wrap App within ErrorBoundary */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);