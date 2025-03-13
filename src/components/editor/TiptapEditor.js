import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { FiImage, FiX, FiBold, FiItalic, FiList, FiCode, FiLink } from 'react-icons/fi';
import { debounce } from '../../utils/formatters';

/**
 * TiptapEditor - Un éditeur de texte riche utilisant Tiptap pour React
 * 
 * Ce composant n'initialise l'éditeur qu'une seule fois lors du montage et
 * utilise un mécanisme de debounce pour éviter les pertes de focus pendant la saisie.
 * 
 * @param {Object|string} initialContent - Contenu initial pour l'éditeur (JSON ou chaîne)
 * @param {Function} onContentChange - Fonction de rappel quand le contenu change
 * @param {boolean} readOnly - Si l'éditeur est en lecture seule
 * @param {string} placeholder - Texte d'aide quand l'éditeur est vide
 */
const TiptapEditor = ({ 
  initialContent, 
  onContentChange, 
  readOnly = false, 
  placeholder = 'Commencez à rédiger ici...' 
}) => {
  // États pour la gestion des entrées d'images et de liens
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [previewImage, setPreviewImage] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  
  // Référence pour éviter de multiples instances de la fonction debounce
  const debouncedUpdateRef = useRef(null);
  
  /**
   * Récupère le contenu initial en gérant à la fois les chaînes et les objets JSON
   */
  const getInitialContent = useCallback(() => {
    if (!initialContent) return '';
    if (typeof initialContent === 'string') return initialContent;
    
    // Pour une structure de contenu JSON complexe
    try {
      return initialContent;
    } catch (e) {
      console.error('Échec lors de l\'analyse du contenu de l\'éditeur:', e);
      return '';
    }
  }, [initialContent]);

  // Initialise l'éditeur Tiptap avec les extensions nécessaires
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded max-w-full h-auto',
        },
      }),
    ],
    content: getInitialContent(),
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: 'prose prose-green max-w-none focus:outline-none min-h-[200px] px-3 py-2',
        placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      // Utilise la référence pour garantir la consistance entre les rendus
      if (debouncedUpdateRef.current) {
        debouncedUpdateRef.current(editor);
      }
    },
  });

  // Configure la fonction debounce qui sera utilisée pour les mises à jour
  // Créée une seule fois lors du montage initial pour éviter toute récréation
  useEffect(() => {
    debouncedUpdateRef.current = debounce((editor) => {
      if (!editor) return;
      
      // Obtient le contenu en JSON pour préserver le formatage
      const content = editor.getJSON();
      onContentChange(content);
    }, 500);
    
    // Fonction de nettoyage qui détruit l'éditeur lors du démontage
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [onContentChange]);

  // Met à jour le contenu de l'éditeur quand initialContent change depuis l'extérieur
  useEffect(() => {
    if (editor && initialContent) {
      // Compare le contenu actuel avec le nouveau contenu
      const currentContent = JSON.stringify(editor.getJSON());
      const newContent = typeof initialContent === 'string' 
        ? initialContent 
        : JSON.stringify(initialContent);
      
      // Ne met à jour que si le contenu a changé pour éviter les pertes de focus
      if (currentContent !== newContent) {
        // Sauvegarde la position du curseur
        const { from, to } = editor.state.selection;
        
        // Met à jour le contenu
        editor.commands.setContent(getInitialContent(), false);
        
        // Tente de restaurer la position du curseur si possible
        try {
          editor.commands.setTextSelection({ from, to });
        } catch (e) {
          // Si la restauration échoue, c'est généralement parce que le contenu a
          // changé de manière significative, ce qui n'est pas un problème
        }
      }
    }
  }, [initialContent, editor, getInitialContent]);

  /**
   * Vérifie si une URL est valide
   */
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Insère une image à la position du curseur
   */
  const insertImage = () => {
    if (!imageUrl.trim() || !editor) {
      alert("Veuillez saisir une URL d'image valide");
      return;
    }

    // Insère l'image à la position du curseur et maintient le focus
    editor.chain().focus().setImage({ 
      src: imageUrl,
      alt: imageAlt || 'Image' 
    }).run();

    // Réinitialise les champs après l'insertion
    setImageUrl('');
    setImageAlt('');
    setShowImageInput(false);
    setPreviewImage(false);
  };

  /**
   * Insère un lien à la position du curseur
   */
  const insertLink = () => {
    if (!linkUrl.trim() || !editor) {
      alert("Veuillez saisir une URL valide");
      return;
    }

    // Vérifie si du texte est sélectionné
    const { state } = editor;
    const { selection } = state;
    const hasSelection = !selection.empty;

    // Si du texte est sélectionné, le convertit en lien
    if (hasSelection) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    } else {
      // Si aucun texte n'est sélectionné, insère l'URL comme lien
      editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run();
    }

    // Réinitialise les champs après l'insertion
    setLinkUrl('');
    setShowLinkInput(false);
  };

  /**
   * Affiche l'aperçu de l'image
   */
  const handlePreviewImage = () => {
    if (imageUrl && isValidUrl(imageUrl)) {
      setPreviewImage(true);
    } else {
      alert("Veuillez saisir une URL d'image valide");
    }
  };

  // Si l'éditeur n'est pas encore initialisé, affiche un indicateur de chargement
  if (!editor) {
    return <div className="border border-gray-300 rounded-md p-4">Chargement de l'éditeur...</div>;
  }

  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      {/* Barre d'outils - cachée en mode lecture seule */}
      {!readOnly && (
        <div className="bg-gray-50 p-2 border-b border-gray-300 flex items-center flex-wrap gap-2">
          {/* Contrôles de formatage de texte */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md ${editor.isActive('bold') ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
            title="Gras"
          >
            <FiBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md ${editor.isActive('italic') ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
            title="Italique"
          >
            <FiItalic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-md ${editor.isActive('bulletList') ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
            title="Liste à puces"
          >
            <FiList />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded-md ${editor.isActive('codeBlock') ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
            title="Bloc de code"
          >
            <FiCode />
          </button>
          <button
            type="button"
            onClick={() => setShowLinkInput(!showLinkInput)}
            className={`p-2 rounded-md ${editor.isActive('link') ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}
            title="Insérer un lien"
          >
            <FiLink />
          </button>
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className="p-2 text-gray-700 hover:bg-gray-200 rounded-md flex items-center space-x-1"
            title="Insérer une image"
          >
            <FiImage />
            <span className="text-sm">Insérer une image</span>
          </button>
        </div>
      )}

      {/* Panneau d'entrée de lien */}
      {showLinkInput && (
        <div className="p-3 bg-gray-50 border-b border-gray-300">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL du lien
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://exemple.com/"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowLinkInput(false);
                  setLinkUrl('');
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                disabled={!linkUrl}
              >
                Insérer le lien
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panneau d'entrée d'image */}
      {showImageInput && (
        <div className="p-3 bg-gray-50 border-b border-gray-300">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de l'image
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemple.com/mon-image.jpg"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <button
                  type="button"
                  onClick={handlePreviewImage}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm"
                  disabled={!imageUrl}
                >
                  Prévisualiser
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texte alternatif (description)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Description de l'image"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            {previewImage && imageUrl && (
              <div className="mt-2 relative inline-block">
                <img
                  src={imageUrl}
                  alt={imageAlt || 'Aperçu'}
                  className="h-32 w-auto rounded border border-gray-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/200x150?text=Image+non+disponible';
                    alert("Impossible de charger l'image. Vérifiez l'URL.");
                  }}
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowImageInput(false);
                  setImageUrl('');
                  setImageAlt('');
                  setPreviewImage(false);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={insertImage}
                className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                disabled={!imageUrl}
              >
                Insérer l'image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zone de contenu de l'éditeur */}
      <EditorContent 
        editor={editor} 
        className="editor-content" 
      />
    </div>
  );
};

TiptapEditor.propTypes = {
  initialContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onContentChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TiptapEditor;
