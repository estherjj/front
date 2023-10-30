import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../theme/css/ckeditor.css'; // ckeditor.css 파일을 로드
import { FormControl, MenuItem, Select } from '@mui/material';
const Editor = ({ onEditorChange, defaultEditorData, selectedTemplate }) => {
  //에디터의 데이터 정의
  const [editorData, setEditorData] = useState(defaultEditorData);

  // CKEditor 컴포넌트를 감싸는 div 요소에 스타일을 적용하여 높이를 설정
  const editorContainerStyle = {
    height: 'auto' // 원하는 높이로 변경
  };

  // 에디터 데이터를 선택한 템플릿의 내용으로 설정
  useEffect(() => {
    if (selectedTemplate) {
      setEditorData(selectedTemplate.contents);
      onEditorChange(selectedTemplate.contents);
    }
  }, [selectedTemplate]);

  return (
    <div style={editorContainerStyle}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          console.log('에디터 사용중임', editor);
          const data = editor.getData();
          // setEditorData(data);
          onEditorChange(data);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          onEditorChange(data);
        }}
        onBlur={(event, editor) => {
          // console.log('Blur', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus', editor);
        }}
      />
    </div>
  );
};

export default Editor;
