import { FC } from 'react'
import Container from '../../../common/components/container/container.component'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../common/components/input/input.component'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../../common/components/button/button.component'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/use-auth'

type SignInPageProps = {}

interface SignInFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})

const SignInPage: FC<SignInPageProps> = () => {

const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema)
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (error) {
      toast.error('Something wen\'t wrong. Please, try again later')
    }
  }

  return (
    <Container>
      <h1 className='text-4xl text-center mt-7 mb-2'>Sign in</h1>
      <p className='text-center'>
        <Link to='/register' className='pt-10'>Need an account?</Link>
      </p>
      <form className='max-w-xl mx-auto flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <dl className='pl-7'>
          {(Object.keys(formState.errors) as (keyof typeof formState.errors)[]
            ).map((err, id) => (
              <li key={id} className='text-conduit-red font-bold'>{formState.errors[err]?.message}</li>
          ))}
        </dl>
        <Input placeholder='Email' {...register('email')} type='email'/>
        <Input placeholder='Password' {...register('password')} type='password'/>
        <div className='flex justify-end'>
          <Button btnStyle='GREEN' size='LG' type='submit' disabled={formState.isSubmitting}>
            Sign in
          </Button>
        </div>
      </form>
    </Container> 
  )
}

export default SignInPage
