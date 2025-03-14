import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useEditor,
  EditorContent,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import {
  FiImage,
  FiX,
  FiBold,
  FiItalic,
  FiList,
  FiCode,
  FiLink,
  FiType,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
} from 'react-icons/fi';
import { debounce } from '../../utils/formatters';

/**
 * Fonction utilitaire pour vérifier si le contenu initial est valide
 * @param {Object|String} content - Le contenu à vérifier
 * @returns {Boolean} - True si le contenu est valide
 */
const isValidContent = (content) => {
  if (!content) return false;
  
  // Si c'est une chaîne JSON, essayer de la parser
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return parsed && typeof parsed === 'object' && parsed.type;
    } catch (e) {
      return false;
    }
  }
  
  // Si c'est déjà un objet, vérifier qu'il a un type
  return typeof content === 'object' && content.type;
};

const TiptapEditor = ({
  initialContent,
  onContentChange,
  readOnly = false,
  placeholder = 'Commencez à rédiger ici...',
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
   * Transforme le contenu initial au format approprié pour l'éditeur
   * @returns {Object} - Contenu formaté pour Tiptap
   */
  const getInitialContent = () => {
    if (!initialContent) {
      return {
        type: 'doc',
        content: [{ type: 'paragraph' }],
      };
    }

    if (isValidContent(initialContent)) {
      return typeof initialContent === 'string'
        ? JSON.parse(initialContent)
        : initialContent;
    }

    // Si le contenu n'est pas au format Tiptap, créer un document avec le contenu comme texte
    return {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: String(initialContent) }],
        },
      ],
    };
  };

  /**
   * Ajoute une image à l'éditeur
   */
  const addImage = () => {
    if (imageUrl && editor) {
      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: imageAlt })
        .run();
      
      // Réinitialiser les champs
      setImageUrl('');
      setImageAlt('');
      setShowImageInput(false);
      setPreviewImage(false);
    }
  };

  /**
   * Insère un lien dans l'éditeur
   */
  const insertLink = () => {
    if (linkUrl && editor) {
      editor
        .chain()
        .focus()
        .setLink({ href: linkUrl })
        .run();
      
      // Réinitialiser l'URL et fermer la fenêtre
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-green-600 underline hover:text-green-800',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content: getInitialContent(),
    editable: !readOnly,
    editorProps: {
      attributes: {
        class:
          'prose prose-green max-w-none focus:outline-none min-h-[200px] px-3 py-2',
        placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      // Utiliser la référence pour appeler la fonction debounce
      if (debouncedUpdateRef.current) {
        debouncedUpdateRef.current(editor.getJSON());
      }
    },
  });

  // Configure la fonction debounce qui sera utilisée pour les mises à jour
  // Créée une seule fois lors du montage initial pour éviter toute récréation
  useEffect(() => {
    if (onContentChange) {
      debouncedUpdateRef.current = debounce((content) => {
        onContentChange(content);
      }, 500);
    }

    return () => {
      // Nettoyage dans le useEffect au besoin
    };
  }, [onContentChange]);

  // Nettoyage de base lors du démontage du composant
  useEffect(() => {
    return () => {
      // Nettoyage des états modaux
      setShowImageInput(false);
      setShowLinkInput(false);
    };
  }, []);

  // Met à jour le contenu de l'éditeur quand initialContent change depuis l'extérieur
  useEffect(() => {
    if (editor && initialContent) {
      const newContent = getInitialContent();
      
      // Ne mettre à jour que si le contenu est différent pour éviter une boucle
      const currentContent = editor.getJSON();
      if (JSON.stringify(currentContent) !== JSON.stringify(newContent)) {
        editor.commands.setContent(newContent);
      }
    }
  }, [initialContent, editor]);

  // Si l'éditeur n'est pas encore initialisé, affiche un indicateur de chargement
  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-md p-4">
        Chargement de l'éditeur...
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      {/* Barre d'outils - cachée en mode lecture seule */}
      {!readOnly && (
        <div className="bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap items-center gap-2">
          {/* Formatage de texte */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded ${
              editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            title="Gras"
          >
            <FiBold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded ${
              editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            title="Italique"
          >
            <FiItalic size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              // Si un lien est déjà actif, on le supprime
              if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run();
              } else {
                // Sinon, on demande l'URL
                setShowLinkInput(true);
              }
            }}
            className={`p-1.5 rounded ${
              editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            title="Lien"
          >
            <FiLink size={16} />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-0.5"></div>

          {/* Alignement de texte */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
            title="Aligner à gauche"
          >
            <FiAlignLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
            title="Centrer"
          >
            <FiAlignCenter size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
            title="Aligner à droite"
          >
            <FiAlignRight size={16} />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-0.5"></div>

          {/* Structures de texte */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
            title="Titre"
          >
            <FiType size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded ${
              editor.isActive('bulletList')
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
            title="Liste à puces"
          >
            <FiList size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded ${
              editor.isActive('codeBlock')
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
            title="Bloc de code"
          >
            <FiCode size={16} />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-0.5"></div>

          {/* Images */}
          <button
            type="button"
            onClick={() => setShowImageInput(true)}
            className="p-1.5 rounded hover:bg-gray-100"
            title="Insérer une image"
          >
            <FiImage size={16} />
          </button>
        </div>
      )}

      {/* Panneau d'entrée de lien */}
      {showLinkInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ajouter un lien</h3>
              <button
                type="button"
                onClick={() => setShowLinkInput(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="linkUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL du lien
              </label>
              <input
                type="url"
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://exemple.com"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && insertLink()}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowLinkInput(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Insérer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panneau d'entrée d'image */}
      {showImageInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ajouter une image</h3>
              <button
                type="button"
                onClick={() => setShowImageInput(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL de l'image
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://exemple.com/image.jpg"
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="imageAlt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Texte alternatif
              </label>
              <input
                type="text"
                id="imageAlt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Description de l'image"
              />
            </div>
            {imageUrl && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setPreviewImage(!previewImage)}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  {previewImage ? "Masquer l'aperçu" : "Afficher l'aperçu"}
                </button>
                {previewImage && (
                  <div className="mt-2 p-2 border border-gray-300 rounded-md">
                    <img
                      src={imageUrl}
                      alt={imageAlt || 'Aperçu'}
                      className="max-w-full h-auto"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZWUiIC8+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2FhYSI+SW1hZ2UgaW50cm91dmFibGU8L3RleHQ+PC9zdmc+';
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowImageInput(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={addImage}
                disabled={!imageUrl}
                className={`px-4 py-2 rounded-md ${
                  imageUrl
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Insérer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteneur de l'éditeur */}
      <EditorContent editor={editor} className="relative" />
    </div>
  );
};

TiptapEditor.propTypes = {
  initialContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onContentChange: PropTypes.func,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TiptapEditor;
