import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import LikeDislikes from './LikeDislikes'

const { TextArea } = Input;
function SingleComment(props) {

    const videoId = props.postId

    const user = useSelector(state => state.user);

    const [openReply, setOpenReply] = useState(false)
    const [commentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!openReply)
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('커멘트를 저장하지 못했습니다.')
                }

            })
    }

    const actions = [<LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />
            {openReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={commentValue}
                        placeholder="답글을 작성해주세요."
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}> Submit </Button>
                </form>
            }


        </div>

    )
}

export default SingleComment
