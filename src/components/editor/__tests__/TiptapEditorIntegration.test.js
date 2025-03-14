import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mocks
jest.mock('@tiptap/react', () => {
  const mockChain = {
    focus: jest.fn().mockReturnThis(),
    toggleBold: jest.fn().mockReturnThis(),
    toggleItalic: jest.fn().mockReturnThis(),
    toggleHeading: jest.fn().mockReturnThis(),
    toggleBulletList: jest.fn().mockReturnThis(),
    toggleOrderedList: jest.fn().mockReturnThis(),
    toggleCodeBlock: jest.fn().mockReturnThis(),
    setTextAlign: jest.fn().mockReturnThis(),
    setLink: jest.fn().mockReturnThis(),
    unsetLink: jest.fn().mockReturnThis(),
    setImage: jest.fn().mockReturnThis(),
    run: jest.fn(),
  };

  const mockEditor = {
    chain: jest.fn().mockReturnValue(mockChain),
    isActive: jest.fn().mockImplementation((type, attrs) => {
      if (type === 'heading' && attrs?.level === 1) return global.activeFormats?.h1;
      if (type === 'heading' && attrs?.level === 2) return global.activeFormats?.h2;
      if (type === 'heading' && attrs?.level === 3) return global.activeFormats?.h3;
      if (type === 'orderedList') return global.activeFormats?.orderedList;
      return false;
    }),
    getJSON: jest.fn().mockReturnValue({ 
      type: 'doc', 
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Test content' }] }] 
    }),
    commands: {
      setContent: jest.fn(),
    },
    destroy: jest.fn(),
  };

  return {
    useEditor: jest.fn().mockReturnValue(mockEditor),
    EditorContent: ({ editor, className }) => (
      <div data-testid="editor-content" className={className}>
        {editor ? 'Editor content' : 'No editor'}
      </div>
    ),
  };
});

jest.mock('@tiptap/starter-kit', () => ({
  __esModule: true,
  default: {}
}));

jest.mock('@tiptap/extension-image', () => ({
  __esModule: true,
  default: {
    configure: jest.fn().mockReturnValue({}),
  }
}));

jest.mock('@tiptap/extension-text-align', () => ({
  __esModule: true,
  default: {
    configure: jest.fn().mockReturnValue({}),
  }
}));

jest.mock('@tiptap/extension-link', () => ({
  __esModule: true,
  default: {
    configure: jest.fn().mockReturnValue({}),
  }
}));

// Actual component import
import TiptapEditor from '../TiptapEditor';

describe('TiptapEditor Integration Tests', () => {
  beforeEach(() => {
    // Reset active formats for isActive mock
    global.activeFormats = {};
    
    // Clean up any mocks
    jest.clearAllMocks();
  });
  
  test('initializes with all necessary extensions', () => {
    render(<TiptapEditor />);
    
    // Verify useEditor was called with all required extensions
    const useEditorMock = require('@tiptap/react').useEditor;
    const config = useEditorMock.mock.calls[0][0];
    
    // Check for presence of key extensions
    expect(config.extensions).toBeDefined();
    expect(config.extensions.length).toBeGreaterThan(3); // Should have multiple extensions
  });
  
  test('applies heading formatting when heading buttons are clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the H2 button
    fireEvent.click(getByTitle('Titre moyen'));
    
    // Verify chain methods were called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.toggleHeading).toHaveBeenCalledWith({ level: 2 });
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('applies bullet list formatting when bullet list button is clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the bullet list button
    fireEvent.click(getByTitle('Liste à puces'));
    
    // Verify chain methods were called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.toggleBulletList).toHaveBeenCalled();
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('applies ordered list formatting when ordered list button is clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the ordered list button
    fireEvent.click(getByTitle('Liste numérotée'));
    
    // Verify chain methods were called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.toggleOrderedList).toHaveBeenCalled();
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('closes image modal when cancel button is clicked', () => {
    const { getByTitle, getByText } = render(<TiptapEditor />);
    
    // Open image modal
    fireEvent.click(getByTitle('Insérer une image'));
    expect(screen.getByText('Ajouter une image')).toBeInTheDocument();
    
    // Click cancel
    fireEvent.click(getByText('Annuler'));
    
    // Image modal should close
    expect(screen.queryByText('Ajouter une image')).not.toBeInTheDocument();
  });
  
  test('closes link modal when cancel button is clicked', () => {
    const { getByTitle, getByText } = render(<TiptapEditor />);
    
    // Open link modal
    fireEvent.click(getByTitle('Lien'));
    expect(screen.getByText('Ajouter un lien')).toBeInTheDocument();
    
    // Click cancel
    fireEvent.click(getByText('Annuler'));
    
    // Link modal should close
    expect(screen.queryByText('Ajouter un lien')).not.toBeInTheDocument();
  });
  
  test('validates link URL in link modal', async () => {
    const { getByTitle, getByLabelText } = render(<TiptapEditor />);
    
    // Open link modal
    fireEvent.click(getByTitle('Lien'));
    
    // Try to submit with empty URL
    fireEvent.click(screen.getByText('Insérer'));
    
    // Modal should still be open (validation prevented submission)
    expect(screen.getByText('Ajouter un lien')).toBeInTheDocument();
    
    // Now add a valid URL
    fireEvent.change(getByLabelText('URL du lien'), { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('Insérer'));
    
    // Modal should close
    expect(screen.queryByText('Ajouter un lien')).not.toBeInTheDocument();
  });
  
  test('validates image URL in image modal', async () => {
    const { getByTitle, getByLabelText } = render(<TiptapEditor />);
    
    // Open image modal
    fireEvent.click(getByTitle('Insérer une image'));
    
    // Try to submit with empty URL
    fireEvent.click(screen.getByText('Insérer'));
    
    // Modal should still be open (validation prevented submission)
    expect(screen.getByText('Ajouter une image')).toBeInTheDocument();
    
    // Now add a valid URL
    fireEvent.change(getByLabelText('URL de l\'image'), { 
      target: { value: 'https://example.com/image.jpg' } 
    });
    fireEvent.click(screen.getByText('Insérer'));
    
    // Modal should close
    expect(screen.queryByText('Ajouter une image')).not.toBeInTheDocument();
  });
  
  test('cleans up editor on unmount', () => {
    const { unmount } = render(<TiptapEditor />);
    
    // Get the mock editor
    const mockEditor = require('@tiptap/react').useEditor();
    
    // Unmount the component
    unmount();
    
    // Verify editor.destroy was called
    expect(mockEditor.destroy).toHaveBeenCalled();
  });
  
  test('handles content updates', () => {
    const onContentChange = jest.fn();
    const { rerender } = render(<TiptapEditor onContentChange={onContentChange} />);
    
    // Get the mock editor
    const mockEditor = require('@tiptap/react').useEditor();
    
    // Get the onUpdate callback from useEditor mock calls
    const editorConfig = require('@tiptap/react').useEditor.mock.calls[0][0];
    
    // Simulate content update
    act(() => {
      if (editorConfig.onUpdate) {
        editorConfig.onUpdate({ editor: mockEditor });
      }
    });
    
    // Verify onContentChange was called with editor JSON
    expect(onContentChange).toHaveBeenCalledWith(mockEditor.getJSON());
  });
  
  test('applies code block formatting when code button is clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the code block button
    fireEvent.click(getByTitle('Bloc de code'));
    
    // Verify chain methods were called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.toggleCodeBlock).toHaveBeenCalled();
    expect(mockChain.run).toHaveBeenCalled();
  });
});
