// import React, { useCallback, useMemo, useState } from 'react'
// import { createPortal } from 'react-dom'
// import isHotkey from 'is-hotkey'
// import { Editable, Slate, ReactEditor } from 'slate-react'
// import { Editor, createEditor } from 'slate'







// const HOTKEYS = {
//   'mod+b': 'bold',
//   'mod+i': 'italic',
//   'mod+u': 'underline',
//   'mod+`': 'code',
// }

// const IFrameExample = () => {
//   const [value, setValue] = useState(initialValue)
//   const renderElement = useCallback(
//     ({ attributes, children }) => <p {...attributes}>{children}</p>,
//     []
//   )
//   const renderLeaf = useCallback(props => <Leaf {...props} />, [])

//   const handleBlur = useCallback(() => ReactEditor.deselect(editor), [editor])

//   return (
//     <Slate editor={() => createEditor()} value={value} onChange={value => setValue(value)}>
      
//       <IFrame onBlur={handleBlur}>
//         <Editable
//           renderElement={renderElement}
//           renderLeaf={renderLeaf}
//           placeholder="Enter some rich text…"
//           spellCheck
//           autoFocus
//         />
//       </IFrame>
//     </Slate>
//   )
// }

// const toggleMark = (editor, format) => {
//   const isActive = isMarkActive(editor, format)
//   if (isActive) {
//     Editor.removeMark(editor, format)
//   } else {
//     Editor.addMark(editor, format, true)
//   }
// }

// const isMarkActive = (editor, format) => {
//   const marks = Editor.marks(editor)
//   return marks ? marks[format] === true : false
// }

// const Leaf = ({ attributes, children, leaf }) => {
//   if (leaf.bold) {
//     children = <strong>{children}</strong>
//   }

//   if (leaf.code) {
//     children = <code>{children}</code>
//   }

//   if (leaf.italic) {
//     children = <em>{children}</em>
//   }

//   if (leaf.underline) {
//     children = <u>{children}</u>
//   }

//   return <span {...attributes}>{children}</span>
// }


// const IFrame = ({ children, ...props }) => {
//   const [contentRef, setContentRef] = useState(null)
//   const mountNode =
//     contentRef &&
//     contentRef.contentWindow &&
//     contentRef.contentWindow.document.body
//   return (
//     <iframe {...props} ref={setContentRef}>
//       {mountNode && createPortal(React.Children.only(children), mountNode)}
//     </iframe>
//   )
// }

// const initialValue = [
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: 'In this example, the document gets rendered into a controlled ',
//       },
//       { text: '<iframe>', code: true },
//       {
//         text: '. This is ',
//       },
//       {
//         text: 'particularly',
//         italic: true,
//       },
//       {
//         text:
//           ' useful, when you need to separate the styles for your editor contents from the ones addressing your UI.',
//       },
//     ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: 'This also the only reliable method to preview any ',
//       },
//       {
//         text: 'media queries',
//         bold: true,
//       },
//       {
//         text: ' in your CSS.',
//       },
//     ],
//   },
// ]

// export default IFrameExample


