import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // 에러가 발생하면, 다음 렌더링에서 fallback UI가 보이도록 상태를 업데이트합니다.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>에러 페이지 일단은 Error Boundary 작성은 해둠</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
