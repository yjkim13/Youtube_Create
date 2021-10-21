import React ,{useEffect} from 'react'
import axios from 'axios';



function LandingPage(props) {
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=> {console.log(response)})
    },[])

    
    const onClickLogin = ()=>{
        props.history.push('/login') 
    }
    const onClickRegister = ()=>{
        props.history.push('/register')
       }

    const onClickLogout = (event)=>{
        event.preventDefault()
        
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push("/login")
            } else {
                alert('Logout Failed');
            }
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',
        width: '100%', height: '100vh'
        }}>
             <form style={{display:'flex', flexDirection:'column'}}>
            <h2>시작 페이지</h2>
            <br />
            
            <button onClick={onClickLogin}>로그인</button>
                
            <button onClick={onClickRegister}> 회원가입</button>
               
            <button onClick={onClickLogout}>로그아웃</button>
            
            </form>
        </div>
    )
}

export default LandingPage
