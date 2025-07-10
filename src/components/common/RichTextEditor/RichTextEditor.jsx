// src/components/common/RichTextEditor/RichTextEditor.jsx
import React, { useEffect } from 'react'; // Importējam React un useEffect hooku
import { useEditor, EditorContent } from '@tiptap/react'; // Importējam TipTap hookus
import StarterKit from '@tiptap/starter-kit'; // Pamatpaplašinājumu komplekts
import { Link } from '@tiptap/extension-link'; // Saites paplašinājums
import { Underline } from '@tiptap/extension-underline'; // Pasvītrojuma paplašinājums
import { TextAlign } from '@tiptap/extension-text-align'; // Teksta līdzināšanas paplašinājums
import { Color } from '@tiptap/extension-color'; // Krāsu paplašinājums
import { TextStyle } from '@tiptap/extension-text-style'; // Teksta stila paplašinājums (nepieciešams Color)
import { Superscript } from '@tiptap/extension-superscript'; // Augšraksta paplašinājums
import { Subscript } from '@tiptap/extension-subscript'; // Apakšraksta paplašinājums

import './RichTextEditor.css'; // Importējam šīs komponentes stilus

// Iepriekš definētas krāsas teksta krāsu paletei
const predefinedColors = ['#000000', '#FF0000', '#008000', '#0000FF', '#FFA500', '#800080'];

/**
 * Bagātinātā teksta redaktora komponente, kas izmanto TipTap.
 * To var izmantot gan satura rediģēšanai, gan tikai attēlošanai.
 * @param {object} props - Komponentes props.
 * @param {string} props.content - HTML saturs, kas jāattēlo/jārediģē.
 * @param {function} [props.onContentChange] - Funkcija, kas tiek izsaukta, kad saturs mainās. Ja nav padota, redaktors ir tikai skatīšanās režīmā.
 */
const RichTextEditor = ({ content, onContentChange }) => {
  // Nosaka, vai redaktors ir rediģējams, pamatojoties uz onContentChange props esamību
  const isEditable = !!onContentChange;

  // Izmanto useEditor hooku, lai inicializētu TipTap redaktoru
  const editor = useEditor({
    // TipTap paplašinājumi, kas pievieno redaktora funkcionalitāti
    extensions: [
      StarterKit, // Nodrošina pamata formatēšanu (treknraksts, kursīvs, saraksti utt.)
      Link.configure({ // Saites paplašinājums
        openOnClick: false, // Neatver saiti ar vienu klikšķi (lai varētu rediģēt)
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } // Drošības atribūti saitēm
      }),
      Underline, // Pasvītrojums
      TextAlign.configure({ types: ['heading', 'paragraph'] }), // Teksta līdzināšana virsrakstiem un rindkopām
      TextStyle, // Nepieciešams, lai varētu lietot Color paplašinājumu
      Color.configure({ types: ['textStyle'] }), // Teksta krāsas
      Superscript, // Augšraksts
      Subscript, // Apakšraksts
    ],
    content: content, // Sākotnējais redaktora saturs
    editable: isEditable, // Kontrolē redaktora rediģējamību
    // onUpdate notikums tiek izsaukts tikai tad, ja redaktors ir rediģējams
    onUpdate: isEditable ? ({ editor }) => onContentChange(editor.getHTML()) : null,
    editorProps: {
      attributes: {
        className: 'tiptap-editor', // CSS klase redaktora galvenajam elementam
      },
    },
  });

  // useEffect, lai atjauninātu redaktora saturu, kad mainās content props no ārpuses
  useEffect(() => {
    // Pārbauda, vai redaktors eksistē un vai padotais saturs atšķiras no pašreizējā redaktora satura,
    // lai izvairītos no bezgalīga cikla un liekiem atjauninājumiem.
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false); // iestata saturu, false nozīmē, ka pārejas netiek izpildītas
    }
  }, [content, editor]); // Atkarības: `content` un `editor` objekts

  // Ja redaktors vēl nav inicializēts, nerādām neko
  if (!editor) {
    return null;
  }

  // Palīgfunkcija, lai dinamiski piešķirtu pogas stilu, ja tā ir aktīva
  const getButtonStyle = (isActive) => isActive ? 'tiptap-button is-active' : 'tiptap-button';

  return (
    <div className={`rich-text-editor-container ${isEditable ? 'is-editable' : 'is-view-only'}`}>
      {/* Rādām rīkjoslu tikai tad, ja redaktors ir rediģējams */}
      {isEditable && (
        <div className="tiptap-toolbar">
          <div className="tiptap-toolbar-row">
            {/* Treknraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={getButtonStyle(editor.isActive('bold'))}><strong>B</strong></button>
            {/* Kursīvs */}
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={getButtonStyle(editor.isActive('italic'))}><em>I</em></button>
            {/* Pasvītrojums */}
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={getButtonStyle(editor.isActive('underline'))}><u>U</u></button>
            {/* Pārsvītrojums */}
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={getButtonStyle(editor.isActive('strike'))}><span>S</span></button>
            {/* Kods */}
            <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={getButtonStyle(editor.isActive('code'))}>&lt;&gt;</button>
            {/* Augšraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} disabled={!editor.can().chain().focus().toggleSuperscript().run()} className={getButtonStyle(editor.isActive('superscript'))}>x<sup>2</sup></button>
            {/* Apakšraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} disabled={!editor.can().chain().focus().toggleSubscript().run()} className={getButtonStyle(editor.isActive('subscript'))}>x<sub>2</sub></button>
            {/* Rindkopa */}
            <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={getButtonStyle(editor.isActive('paragraph'))}>¶</button>
            {/* H1 virsraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={getButtonStyle(editor.isActive('heading', { level: 1 }))}>H1</button>
            {/* H2 virsraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={getButtonStyle(editor.isActive('heading', { level: 2 }))}>H2</button>
            {/* Aizzīmēts saraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().chain().focus().toggleBulletList().run()} className={getButtonStyle(editor.isActive('bulletList'))}>•</button>
            {/* Numurēts saraksts */}
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} disabled={!editor.can().chain().focus().toggleOrderedList().run()} className={getButtonStyle(editor.isActive('orderedList'))}>1.</button>
            {/* Saišu pievienošana/rediģēšana */}
            <button type="button" onClick={() => { const url = prompt('Ievadiet saites URL:'); if (url) { editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run(); } }} className={getButtonStyle(editor.isActive('link'))}>🔗</button>
          </div>
          <div className="tiptap-toolbar-row top-border">
            {/* Teksta līdzināšana pa kreisi */}
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={getButtonStyle(editor.isActive({ textAlign: 'left' }))}>←</button>
            {/* Teksta līdzināšana centrā */}
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={getButtonStyle(editor.isActive({ textAlign: 'center' }))}>↔︎</button>
            {/* Teksta līdzināšana pa labi */}
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={getButtonStyle(editor.isActive({ textAlign: 'right' }))}>→</button>
            {/* Teksta līdzināšana izlīdzināšana */}
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={getButtonStyle(editor.isActive({ textAlign: 'justify' }))}>⇄</button>
            {/* Atsaukt */}
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="tiptap-button">↩️</button>
            {/* Atjaunot */}
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="tiptap-button">↪️</button>
            {/* Krāsu palete */}
            {predefinedColors.map((color) => (
                <button
                    key={color}
                    type="button"
                    onClick={() => editor.chain().focus().setColor(color).run()}
                    title={`Teksta krāsa: ${color}`}
                    className={`tiptap-button color-swatch ${editor.isActive('textStyle', { color: color }) ? 'is-active' : ''}`}
                    style={{ backgroundColor: color }}
                ></button>
            ))}
            {/* Noņemt teksta krāsu */}
            <button type="button" onClick={() => editor.chain().focus().unsetColor().run()} className="tiptap-button" title="Noņemt teksta krāsu"><span>A</span></button>
          </div>
        </div>
      )}
      {/* Redaktora saturs */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor; // Eksportējam komponenti