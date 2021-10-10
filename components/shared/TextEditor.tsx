import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TextEditorProps {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  bodyClass?: string;
  onChange?: any;
  multiple?: boolean;
  disabled?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const TextEditor = (props: TextEditorProps) => {
  const { value, setValue, bodyClass, onChange, disabled } = props;
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={value || ''}
      // defaultValue={value}
      onChange={onChange}
      readOnly={disabled}
    />
  );
};

export default TextEditor;
