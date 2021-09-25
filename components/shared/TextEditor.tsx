import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // (if using Next.js or use own dynamic loader)
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = dynamic(
  async () => {
    const mod = await import('react-draft-wysiwyg');
    return mod.Editor;
  },
  { ssr: false },
) as any as Editor;

interface TextEditorProps {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  bodyClass?: string;
  onChange?: any;
  multiple?: boolean;
  disabled?: boolean;
}
const TextEditor = (props: TextEditorProps) => {
  const { setValue, bodyClass, onChange, disabled } = props;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    onChange &&
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    setValue &&
      setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <>
      {/* 
  // @ts-ignore */}
      <EditorComponent
        editorState={editorState}
        wrapperClassName="editor"
        toolbarClassName="editor__toolbar"
        editorClassName={`editor__body ${bodyClass}`}
        onEditorStateChange={onEditorStateChange}
        readOnly={disabled}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'history',
            'embedded',
            'emoji',
            'image',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </>
  );
};

export default TextEditor;
