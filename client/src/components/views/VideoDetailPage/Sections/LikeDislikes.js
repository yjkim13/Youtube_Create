import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Tooltip } from 'antd'
import { LikeOutlined, DislikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'

function LikeDislikes(props) {

    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [likeAction, setLikeAction] = useState(null)
    const [dislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }



    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    //얼마나 많은 좋아요를 받았는지 확인이 필요
                    setLikes(response.data.likes.length)

                    // 내가 이미 그 좋아요를 눌렀는지

                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })

                } else {
                    alert("Likes에 정보를 가져오지 못했습니다.")
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    //얼마나 많은 싫어요를 받았는지 확인이 필요
                    setDislikes(response.data.dislikes.length)

                    // 내가 이미 그 싫어요를 눌렀는지

                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })

                } else {
                    alert("Dislikes에 정보를 가져오지 못했습니다.")
                }
            })


    }, [])

    const onLike = () => {
        if (likeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes + 1)
                        setLikeAction('liked')

                        if (dislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(dislikes - 1)
                        }
                    } else {
                        alert("Like를 올리지 못하였습니다.")
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes - 1)
                        setLikeAction(null)

                    } else {
                        alert("Like를 내리지 못하였습니다.")
                    }
                })
        }
    }



    const onDislike = () => {

        if (dislikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert("Dislike를 내리지 못하였습니다.")
                    }
                })
        } else {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(dislikes + 1)
                        setDislikeAction('disliked')

                        if (likeAction !== null) {
                            setLikeAction(null)
                            setLikes(likes - 1)
                        }
                    } else {
                        alert("Dislike를 올리지 못하였습니다.")
                    }
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">

                    {likeAction === "liked" ?
                        <LikeFilled
                            type="like"
                            onClick={onLike}
                        />
                        :
                        <LikeOutlined
                            type="like"
                            onClick={onLike} />}

                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {likes} </span>
            </span>
            &nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {dislikeAction === "disliked" ?
                        <DislikeFilled
                            type="dislike"
                            onClick={onDislike} />
                        :
                        <DislikeOutlined
                            type="dislike"
                            onClick={onDislike}
                        />}


                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {dislikes} </span>
            </span>&nbsp;&nbsp;&nbsp;

        </div>
    )
}

export default LikeDislikes
