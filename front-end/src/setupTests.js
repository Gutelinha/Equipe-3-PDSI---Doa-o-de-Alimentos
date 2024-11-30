import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configura o timeout para ser mais longo
configure({
  asyncUtilTimeout: 5000,
});

jest.setTimeout(10000);

// Silencia os warnings específicos
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18/.test(args[0])) {
      return;
    }
    if (/Warning: `ReactDOMTestUtils.act`/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
