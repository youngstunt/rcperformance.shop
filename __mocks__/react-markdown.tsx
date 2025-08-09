// Chadson v69.0.0: Mock for the react-markdown component.
// This mock is used by Jest to prevent ESM-related errors during testing.
// It renders the children, allowing tests to assert on the content that
// would have been passed to the actual ReactMarkdown component.

import React from 'react';

const ReactMarkdownMock = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ReactMarkdownMock;