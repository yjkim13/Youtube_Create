import React from 'react'
import { Typography, Button,Input, Form, message} from 'antd'

const {Title} =Typography;

function VideoUploadPage() {
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}> Upload Video</Title>
            </div>
        </div>
    )
}

export default VideoUploadPage
