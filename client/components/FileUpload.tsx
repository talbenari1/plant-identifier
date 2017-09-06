import * as React from 'react'
import { ChangeEvent, EventHandler, StatelessComponent } from 'react'
import { connect, MapDispatchToPropsObject } from 'react-redux'
import { uploadFile } from '../actions/camera'

type FileInput = HTMLInputElement | null

interface UploadDispatchProps {
  uploadFile: EventHandler<ChangeEvent<FileInput>>
}

type UploadProps = UploadDispatchProps

const Upload: StatelessComponent<UploadProps> = ({ uploadFile }) => {
  let input: FileInput = null

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={i => {
          input = i
        }}
        onChange={uploadFile}
        style={{ display: 'none' }}
      />
      <button
        className="camera-controls-button"
        onClick={() => input && input.click()}
      >
        &#xE1A5;
      </button>
    </div>
  )
}

const mapDispatchToProps: UploadDispatchProps & MapDispatchToPropsObject = {
  uploadFile
}

export default connect(null, mapDispatchToProps)(Upload)
