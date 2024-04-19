import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import SunEditorCore from 'suneditor/src/lib/core';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});
import 'suneditor/dist/css/suneditor.min.css';
import formatText from '../../helpers/formatText';

interface TextEditorProps {
  name?: string;
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  bodyClass?: string;
  onChange?: any;
  multiple?: boolean;
  disabled?: boolean;
  // editor?: SunEditorCore
}

const options = {
  buttonList: [
    // ['font', 'fontSize', 'formatBlock'],
    ['blockquote'],
    ['bold', 'underline', 'italic', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', 'image'],
    ['fullScreen'],
  ],
};

const TextEditor = React.forwardRef((props: TextEditorProps, ref) => {
  const { value, onChange, disabled, name } = props;

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  // const getSunEditorInstance = (sunEditor: SunEditorCore) => {
  //   if (ref) {
  //     ref.current = sunEditor;
  //     console.log(ref.current.getContents());
  //   }
  //   // if (editor && editor.current) {
  //   //   editor.current = sunEditor;
  //   // }
  // };

  return (
    <SunEditor
      name={name}
      height="150px"
      disable={disabled}
      placeholder="Please Write..."
      setOptions={options}
      // defaultValue={'Hello ' + name}
      // getSunEditorInstance={getSunEditorInstance}
      setContents={formatText(value)}
      onChange={onChange}
    />
  );
});

export default TextEditor;
