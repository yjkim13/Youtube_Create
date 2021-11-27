import React, { useEffect, useState } from 'react'
import { Row, Col, Avatar, List } from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'




function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [videoDetail, setVideoDetail] = useState([])
    const [comment, setComment] = useState([])

    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail)

                } else {
                    alert('비디오 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/comment/getComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComment(response.data.comment)

                } else {
                    alert('코멘트 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    const refreshFunction = (newComment) => {
        setComment(comment.concat(newComment))
    }

    if (videoDetail.writer) {

        const subscribeButton = videoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={videoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>

                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />

                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={videoDetail.writer.image} />}
                                title={videoDetail.writer.name}
                                description={videoDetail.description}
                            />
                        </List.Item>

                        {/* Comments */}
                        <Comment refreshFunction={refreshFunction} commentList={comment} postId={videoId} />
                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>

            </Row>
        )

    } else {
        return (
            <div>...Loding</div>
        )

    }

}

export default VideoDetailPage

