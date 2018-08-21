import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { convertToRaw, EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.less'

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      content: props.content
    }
  }
  componentWillReceiveProps (nextProps) {
    const editorState = this.html2Draft(nextProps.content)
    this.setState({
      editorState
    })
  }
  onEditorStateChange (editorState) {
    this.setState({
      editorState,
    })
  }
  uploadCallback (file) {
    return new Promise(
      (resolve, reject) => {
        var reader = new FileReader()

        reader.onloadend = function() {
          resolve({ data: { link: reader.result } })
        }

        reader.readAsDataURL(file)
      }
    )
  }
  onContentStateChange (contentState) {
    this.props.onChange(this.draft2Html(contentState))
  }
  draft2Html (contentState) {
    return draftToHtml(contentState)
  }
  html2Draft (contentState) {
    const blocksFromHtml = htmlToDraft(contentState)
    const { contentBlocks, entityMap } = blocksFromHtml
    const content = ContentState.createFromBlockArray(contentBlocks, entityMap)
    const editorState = EditorState.createWithContent(content)
    return editorState
  }
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        toolbar={{
          options: ['inline', 'blockType', 'textAlign', 'image', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic'],
          },
          blockType: {
            inDropdown: true
          },
          textAlign: {
            inDropdown: true
          },
          image: {
            uploadCallback: this.uploadCallback,
            previewImage: true,
            defaultSize: {
              height: 'auto',
              width: '100%',
            },
          }
        }}
        localization={{ locale: 'zh' }}
        editorState={editorState}
        wrapperClassName="component-editor-wrapper"
        editorClassName="component-editor-content"
        onEditorStateChange={this.onEditorStateChange.bind(this)}
        onContentStateChange={this.onContentStateChange.bind(this)}
      />
    )
  }
}