import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default function Editor({ onChange, content }){
    return (
          <SunEditor
            onBlur={e => onChange(e.srcElement.innerHTML)} 
            setContents={content}
            setOptions={{
                height: 200,
                buttonList: buttonList.complex // Or Array of button list, eg. [['font', 'align'], ['image']]
                // Other option
            }}
             />
            
      );
}