import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { registerUser} from '../../../_actions/user_action';


function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ComfirmPassword, setComfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onComfirmPasswordHandler = (event) => {
        setComfirmPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) => {
        event.preventDefault()

        if(Password !== ComfirmPassword) {
            return alert("비밀번호가 일치하지 않습니다.")
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
        .then(response =>{
            if(response.payload.success){
                props.history.push('/login')
            } else{
                alert('Failed To Sign Up')
            }
        })
    }

    const onClickHome = ()=>{
        props.history.push('/') 
    }
    const onClickLogin = ()=>{
        props.history.push('/login') 
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',
        width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Comfirm password</label>
                <input type="password" value={ComfirmPassword} onChange={onComfirmPasswordHandler} />

                <br />
                <button type ="submit">
                    회원 가입
                </button>

                <button onClick={onClickLogin}>
                    로그인
                </button>

                <button onClick={onClickHome}>
                    Home
                </button>


            </form>
        </div>
    )
}

export default RegisterPage
