'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

const FroalaEditorComponent = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
  loading: () => 'Loading...',
});

const FroalaTextEditor = ({
  value, onChange, onBlur, placeholder, maxLength, showCount,
}) => {
  const [isFroalaReady, setIsFroalaReady] = useState(false);
  const config = {
    placeholderText: placeholder,
    wordCounterMax: maxLength || -1,
    wordCounterCount: showCount,
    events: {
      blur: onBlur,
    },
    heightMin: 200,
    toolbarButtons: [
      'fontFamily', 'fontSize', 'bold', 'italic', 'underline', 'paragraphFormat', '|',
      'alignLeft', 'alignCenter', 'alignRight', '|', // Text alignment buttons
      'undo', 'redo', '|',
    ],
    paragraphFormat: {
      p: 'Chữ thường',
      h1: 'Tiêu đề 1',
      h2: 'Tiêu đề 2',
      h3: 'Tiêu đề 3',
      h4: 'Tiêu đề 4',
      h5: 'Tiêu đề 5',
    },
  };

  useEffect(() => {
    Promise.all([
      import('froala-editor/js/plugins/align.min'),
      import('froala-editor/js/plugins/font_family.min'),
      import('froala-editor/js/plugins/font_size.min'),
      import('froala-editor/js/plugins/paragraph_format.min'),
      import('froala-editor/js/plugins/word_counter.min'),
    ]).then(() => setIsFroalaReady(true));
  }, []);

  return (
    <div>
      { isFroalaReady && (
        <FroalaEditorComponent
          tag="textarea"
          config={config}
          model={value}
          onModelChange={onChange}
        />
      )}
    </div>
  );
};

export default FroalaTextEditor;
