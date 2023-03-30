import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types';

interface LoginForm {
    username: string;
    password: string;
    email: string;
}
export default function Forms() {
    const {register, handleSubmit, formState: { errors }} = useForm<LoginForm>({mode: 'onChange'});
    const onValid = (data: LoginForm) => {
        console.log(data)
    }

    const onInvalid = (errors: FieldErrors) => {
        console.log(errors)
    }
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input {...register('username', {
            required: 'Username is required',
            minLength: {
                message: '5글자 이상이여야 합니다!',
                value: 5,
            }
            })} type="text" placeholder='Username'/>
        <input {...register('email', {
            required: 'Email is required',
            validate: {
                notGmail: (value) => !value.includes('@gmail.com')? '' : 'Gmail is not allowd',
            }
            })} type="email" placeholder='Email'/>
            {errors.email?.message}
        <input {...register('password',{required: 'Password is required'})} type="password" placeholder='Password'/>
        <input type="submit" placeholder='Create Account' />
    </form>
  )
}
