import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'

import "./editor.css";
import ACTIONS from '../../Action';


const Editor = ({socketRef, roomId, onCodeChange}) => {

const editorRef = useRef(null);
  useEffect(()=>{
    async function init(){
      editorRef.current = Codemirror.fromTextArea(document.getElementById('realTimeCodeEditor'), {
        mode:{name: 'javascript', json:true},
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers:true
  });

      editorRef.current.on('change', (instance, changes) =>{
        // console.log('changes', changes);
        const {origin} = changes; 
        const code = instance.getValue();
        onCodeChange(code);
        if( origin !== 'setValue'){
          // console.log('working', code);
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
        // console.log(code);
      }) 
    }
    init();
  },[])

  useEffect(() =>{
    if(socketRef.current){
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        // console.log('rec', code)
        if(code !== null) {
          editorRef.current.setValue(code)
        }
      })
    }
    return()=>{
        socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
  }, [socketRef.current])

  return (
    <>
    <textarea id='realTimeCodeEditor' className='codeArea' />
    </>
  )
}

export default Editor