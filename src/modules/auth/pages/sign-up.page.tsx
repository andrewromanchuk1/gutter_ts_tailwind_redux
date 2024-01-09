import { FC } from 'react'
import Container from '../../../common/components/container/container.component'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../common/components/input/input.component'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../../common/components/button/button.component'
import { useLazySignUpQuery } from '../api/repository'
import { toast } from 'react-toastify'
import { setUser } from '../service/slice'
import { useAppDispatch } from '../../../store/store'

type SignUpPageProps = {}

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})

const SignUpPage: FC<SignUpPageProps> = () => {
  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema)
  });

  const [ triggerSignUpQuery ] = useLazySignUpQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const { data } = await triggerSignUpQuery(values, false);
      if(!data) {
        throw new Error('No data recieved')
      }
      dispatch(setUser(data.user));
      navigate('/');
    } catch (error) {
      toast.error('Something wen\'t wrong. Please, try again later')
    }
  }

  return (
    <Container>
      <h1 className='text-4xl text-center mt-7 mb-2'>Sign up</h1>
      <p className='text-center'>
        <Link to='/login' className='pt-10'>Have an account?</Link>
      </p>
      <form className='max-w-xl mx-auto flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <dl className='pl-7'>
          {(Object.keys(formState.errors) as (keyof typeof formState.errors)[]
            ).map((err, id) => (
              <li key={id} className='text-conduit-red font-bold'>{formState.errors[err]?.message}</li>
          ))}
        </dl>
        <Input placeholder='Username' {...register('username')}/>
        <Input placeholder='Email' {...register('email')} type='email'/>
        <Input placeholder='Password' {...register('password')} type='password'/>
        <div className='flex justify-end'>
          <Button btnStyle='GREEN' size='LG' type='submit' disabled={formState.isSubmitting}>
            Sign up
          </Button>
        </div>
      </form>
    </Container> 
  )
}

export default SignUpPage