import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {


    const [subscribeNumber, setSubscribeNumber] = useState(0)
    const [subscribed, setSubscribed] = useState(false)


    useEffect(() => {

        let variable = { userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보를 불러오지 못했습니다.')
                }
            })

        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert(" 구독자 현황을 가져올 수 없습니다.")
                }
            })
    }, [])

    const OnSubscribe = () => {

        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }


        //이미 구독 중이라면
        if (subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(subscribeNumber - 1)
                        setSubscribed(!subscribed)
                        console.log("구독취소했습니다.", subscribed);
                    } else {
                        alert("구독취소가 실패했습니다.")
                    }
                })
         // 구독중이 아니라면 
        } else {
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(subscribeNumber + 1)
                        setSubscribed(!subscribed)
                        console.log("구독했습니다.", subscribed);

                    } else {
                        alert("구독이 실패했습니다.")
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{
                    backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={OnSubscribe}
            >
                {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
