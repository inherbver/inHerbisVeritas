import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      if (type === 'bold' && global.activeFormats?.bold) return true;
      if (type === 'italic' && global.activeFormats?.italic) return true;
      if (type === 'link' && global.activeFormats?.link) return true;
      if (type === 'bulletList' && global.activeFormats?.bulletList) return true;
      if (type === 'codeBlock' && global.activeFormats?.codeBlock) return true;
      if (type === 'heading' && attrs?.level === 2 && global.activeFormats?.heading) return true;
      if (attrs?.textAlign === 'left' && global.activeFormats?.alignLeft) return true;
      if (attrs?.textAlign === 'center' && global.activeFormats?.alignCenter) return true;
      if (attrs?.textAlign === 'right' && global.activeFormats?.alignRight) return true;
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

jest.mock('../../utils/formatters', () => ({
  debounce: (fn) => fn,
}));

// Actual component import
import TiptapEditor from '../TiptapEditor';

describe('TiptapEditor Component', () => {
  beforeEach(() => {
    // Reset active formats for isActive mock
    global.activeFormats = {};
    
    // Clean up any mocks
    jest.clearAllMocks();
  });
  
  test('renders editor in editable mode by default', () => {
    render(<TiptapEditor />);
    
    // Check toolbar is visible
    expect(screen.getByTitle('Gras')).toBeInTheDocument();
    expect(screen.getByTitle('Italique')).toBeInTheDocument();
    expect(screen.getByTitle('Lien')).toBeInTheDocument();
    
    // Check editor content is rendered
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });
  
  test('renders editor in read-only mode when specified', () => {
    render(<TiptapEditor readOnly={true} />);
    
    // Toolbar should not be visible
    expect(screen.queryByTitle('Gras')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Italique')).not.toBeInTheDocument();
    
    // Editor content should still be rendered
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });
  
  test('applies bold formatting when bold button is clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the bold button
    fireEvent.click(getByTitle('Gras'));
    
    // Verify chain methods were called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.toggleBold).toHaveBeenCalled();
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('applies italic formatting when italic button is clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the italic button
    fireEvent.click(getByTitle('Italique'));
    
    // Verify chain methods were called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.toggleItalic).toHaveBeenCalled();
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('shows link input when link button is clicked', async () => {
    const { getByTitle, getByText } = render(<TiptapEditor />);
    
    // Initially, link input should not be visible
    expect(screen.queryByText('Ajouter un lien')).not.toBeInTheDocument();
    
    // Click the link button
    fireEvent.click(getByTitle('Lien'));
    
    // Link input should now be visible
    expect(screen.getByText('Ajouter un lien')).toBeInTheDocument();
  });
  
  test('inserts a link when link form is submitted', async () => {
    const { getByTitle, getByText, getByLabelText } = render(<TiptapEditor />);
    
    // Click the link button
    fireEvent.click(getByTitle('Lien'));
    
    // Enter link URL
    const linkInput = screen.getByLabelText('URL du lien');
    fireEvent.change(linkInput, { target: { value: 'https://example.com' } });
    
    // Click insert button
    fireEvent.click(screen.getByText('Insérer'));
    
    // Verify link was inserted
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.setLink).toHaveBeenCalledWith({ href: 'https://example.com' });
    expect(mockChain.run).toHaveBeenCalled();
    
    // Link modal should close
    expect(screen.queryByText('Ajouter un lien')).not.toBeInTheDocument();
  });
  
  test('removes a link when link button is clicked while link is active', async () => {
    // Set link as active
    global.activeFormats = { link: true };
    
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click the link button while a link is already active
    fireEvent.click(getByTitle('Lien'));
    
    // Verify unsetLink was called
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.unsetLink).toHaveBeenCalled();
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('shows image input when image button is clicked', async () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Initially, image input should not be visible
    expect(screen.queryByText('Ajouter une image')).not.toBeInTheDocument();
    
    // Click the image button
    fireEvent.click(getByTitle('Insérer une image'));
    
    // Image input should now be visible
    expect(screen.getByText('Ajouter une image')).toBeInTheDocument();
  });
  
  test('inserts an image when image form is submitted', async () => {
    const { getByTitle, getByLabelText } = render(<TiptapEditor />);
    
    // Click the image button
    fireEvent.click(getByTitle('Insérer une image'));
    
    // Enter image URL and alt text
    fireEvent.change(getByLabelText('URL de l\'image'), { 
      target: { value: 'https://example.com/image.jpg' } 
    });
    
    fireEvent.change(getByLabelText('Texte alternatif'), { 
      target: { value: 'Description de l\'image' } 
    });
    
    // Click insert button
    fireEvent.click(screen.getByText('Insérer'));
    
    // Verify image was inserted
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.setImage).toHaveBeenCalledWith({ 
      src: 'https://example.com/image.jpg', 
      alt: 'Description de l\'image' 
    });
    expect(mockChain.run).toHaveBeenCalled();
    
    // Image modal should close
    expect(screen.queryByText('Ajouter une image')).not.toBeInTheDocument();
  });
  
  test('applies text alignment when alignment buttons are clicked', () => {
    const { getByTitle } = render(<TiptapEditor />);
    
    // Click center alignment button
    fireEvent.click(getByTitle('Centrer'));
    
    // Verify center alignment was applied
    const mockEditor = require('@tiptap/react').useEditor();
    expect(mockEditor.chain).toHaveBeenCalled();
    const mockChain = mockEditor.chain();
    expect(mockChain.focus).toHaveBeenCalled();
    expect(mockChain.setTextAlign).toHaveBeenCalledWith('center');
    expect(mockChain.run).toHaveBeenCalled();
  });
  
  test('highlights active formatting buttons', () => {
    // Set some formats as active
    global.activeFormats = {
      bold: true,
      italic: false,
      alignCenter: true
    };
    
    const { getByTitle } = render(<TiptapEditor />);
    
    // Bold button should have active class
    expect(getByTitle('Gras')).toHaveClass('bg-gray-200');
    
    // Italic button should not have active class
    expect(getByTitle('Italique')).not.toHaveClass('bg-gray-200');
    
    // Center align button should have active class
    expect(getByTitle('Centrer')).toHaveClass('bg-gray-200');
  });
  
  test('calls onContentChange when editor updates', async () => {
    const handleContentChange = jest.fn();
    render(<TiptapEditor onContentChange={handleContentChange} />);
    
    // Get the mock editor
    const mockEditor = require('@tiptap/react').useEditor();
    
    // Simulate editor update
    const updateCallback = mockEditor.onUpdate;
    if (typeof updateCallback === 'function') {
      updateCallback({ editor: mockEditor });
      
      // Verify onContentChange was called with editor JSON
      expect(handleContentChange).toHaveBeenCalledWith(mockEditor.getJSON());
    } else {
      // Access the onUpdate handler from the useEditor mock arguments
      const editorConfig = require('@tiptap/react').useEditor.mock.calls[0][0];
      editorConfig.onUpdate({ editor: mockEditor });
      
      // Verify onContentChange was called with editor JSON
      expect(handleContentChange).toHaveBeenCalledWith(mockEditor.getJSON());
    }
  });
  
  test('initializes with provided content', () => {
    const initialContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Initial content' }]
        }
      ]
    };
    
    render(<TiptapEditor initialContent={initialContent} />);
    
    // Verify useEditor was called with the initialContent
    const useEditorMock = require('@tiptap/react').useEditor;
    expect(useEditorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: initialContent
      }),
      undefined
    );
  });
});
