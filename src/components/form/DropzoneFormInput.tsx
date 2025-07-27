'use client'
import { Card, Col, FormLabel, FormText, Row } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import Link from 'next/link'
import { DropzoneFormInputProps } from '@/types/component-props'
import useFileUploader from '@/hooks/useFileUploader'

const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  iconProps,
  showPreview,
  className,
  text,
  textClassName,
  onFileUpload,
}: DropzoneFormInputProps) => {
  const { selectedFiles, handleAcceptedFiles, removeFile } = useFileUploader(showPreview)
  return (
    <>
      {label && <FormLabel className={labelClassName}>{label}</FormLabel>}

      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles, onFileUpload)} maxFiles={5}>
        {({ getRootProps, getInputProps }) => (
          <>
            <div className={`dropzone dropzone-custom ${className}`}>
              <div className="dz-message" {...getRootProps()}>
                <input {...getInputProps()} />
                <i className={'h1 text-muted ri-upload-cloud-2-line'} {...iconProps} />
                <h3 className={textClassName}>{text}</h3>
                {helpText && typeof helpText === 'string' ? <FormText>{helpText}</FormText> : helpText}
              </div>
            </div>
            {showPreview && selectedFiles.length > 0 && (
              <div className="dz-preview mt-3">
                {(selectedFiles || []).map((file, idx) => {
                  const ext = file.name.substr(file.name.lastIndexOf('.') + 1)
                  return (
                    <Card className="mt-1 mb-0 shadow-none border" key={idx + '-file'}>
                      <div className="p-2">
                        <Row className="align-items-center">
                          {file.preview ? (
                            <Col xs={'auto'}>
                              <img data-dz-thumbnail="" className="avatar-sm rounded bg-light" alt={file.name} src={file.preview} />
                            </Col>
                          ) : (
                            <Col xs={'auto'}>
                              <div className="avatar-sm">
                                <span className="avatar-title bg-primary rounded">{ext.toUpperCase()}</span>
                              </div>
                            </Col>
                          )}
                          <Col className="ps-0">
                            <Link href="" className="text-muted fw-bold">
                              {file.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{file.formattedSize}</strong>
                            </p>
                          </Col>
                          <Col className="text-end">
                            <Link href="" className="btn btn-link btn-lg text-muted shadow-none">
                              <div className="flex-shrink-0 ms-3">
                                <button data-dz-remove className="btn btn-link btn-lg text-danger" onClick={() => removeFile(file)}>
                                <i className="ri-close-line" />
                                </button>
                              </div>
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </>
        )}
      </Dropzone>
    </>
  )
}

export default DropzoneFormInput
