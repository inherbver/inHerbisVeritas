// Mock for Tiptap extensions and editor
import { jest } from '@jest/globals';

const mockChain = {
  focus: () => mockChain,
  toggleBold: () => mockChain,
  toggleItalic: () => mockChain,
  toggleHeading: () => mockChain,
  toggleBulletList: () => mockChain,
  toggleCodeBlock: () => mockChain,
  setTextAlign: () => mockChain,
  setLink: () => mockChain,
  unsetLink: () => mockChain,
  setImage: () => mockChain,
  run: jest.fn(),
};

const mockEditor = {
  chain: () => mockChain,
  isActive: jest.fn().mockReturnValue(false),
  getJSON: jest.fn().mockReturnValue({ type: 'doc', content: [{ type: 'paragraph' }] }),
  commands: {
    setContent: jest.fn(),
  },
  destroy: jest.fn(),
};

export const useEditor = jest.fn().mockReturnValue(mockEditor);

export const EditorContent = ({ editor, className }) => (
  <div data-testid="editor-content" className={className}>
    {editor ? 'Editor content' : 'No editor'}
  </div>
);

export const StarterKit = {};
export const Image = {
  configure: () => ({}),
};
export const TextAlign = {
  configure: () => ({}),
};
export const Link = {
  configure: () => ({}),
};
