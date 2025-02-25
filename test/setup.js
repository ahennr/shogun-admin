import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

global.URL.createObjectURL = jest.fn();

Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))
});
