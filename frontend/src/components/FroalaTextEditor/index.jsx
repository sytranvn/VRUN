'use client';

import dynamic from 'next/dynamic';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

const FroalaEditorComponent = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
  loading: () => 'Loading...',
});

const config = {};

const FroalaTextEditor = ({ model, onModelChange }) => (
  <div>
    <FroalaEditorComponent
      tag="textarea"
      config={config}
      model={model}
      onModelChange={onModelChange}
    />
  </div>
);

export default FroalaTextEditor;
