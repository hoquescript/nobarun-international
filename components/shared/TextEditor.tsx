import React from 'react';
import dynamic from 'next/dynamic';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

interface TextEditorProps {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  bodyClass?: string;
  onChange?: any;
  multiple?: boolean;
  disabled?: boolean;
}

import 'suneditor/dist/css/suneditor.min.css';

const options = {
  buttonList: [
    ['font', 'fontSize', 'formatBlock'],
    ['blockquote'],
    ['bold', 'underline', 'italic', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', 'image'],
    ['fullScreen'],
  ],
};

const TextEditor = (props: TextEditorProps) => {
  const { value, onChange, disabled } = props;

  return (
    <SunEditor
      height="150px"
      disable={disabled}
      placeholder="Please Write..."
      setOptions={options}
      setContents={value}
      onChange={onChange}
    />
  );
};

export default TextEditor;
