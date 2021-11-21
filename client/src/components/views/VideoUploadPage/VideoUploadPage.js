import React, { useState } from 'react'
import { Typography, Button, Input, Form, message } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import Dropzone from 'react-dropzone'
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const privateSelect = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const categorySelect = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
]



function VideoUploadPage() {

    const [videoTitle, setVideoTitle] = useState("")
    const [description, setDescription] = useState("")
    const [videoPrivate, setVideoPrivate] = useState(0)
    const [videocategory, setVideoCategory] = useState("Film & Animation")


    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setVideoPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setVideoCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    alert('비디오 업로드를 실패했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop Zone */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusSquareOutlined style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>
                    {/* Thumbnail*/}
                    <div>
                        <img src alt />
                    </div>
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={videoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={description}
                />
                <br />
                <br />
                <select onChange={onPrivateChange}>
                    {privateSelect.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <select onChange={onCategoryChange}>
                    {categorySelect.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>

                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
