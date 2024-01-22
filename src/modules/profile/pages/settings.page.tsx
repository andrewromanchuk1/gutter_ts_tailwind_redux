import { FC } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../../../common/components/input/input.component';
import Container from '../../../common/components/container/container.component';
import TextArea from '../../../common/components/textarea/textarea.component';
import Button from '../../../common/components/button/button.component';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../auth/hooks/use-auth';
import ErrorsList from '../../../common/components/errors-list/errors-list.component';
import { useUpdateUserMutation } from '../api/repository';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface SettingsPageProps {}

interface SettingsFormValues { 
   avatar: string;
   username: string;
   bio: string;
   email: string;
   newPassword?: string | undefined;
}

const validationSchema = yup.object({
   avatar: yup.string().url().required(),
   username: yup.string().min(3).required(),
   bio: yup.string().default(' '),
   email: yup.string().email().required(),
   newPassword: yup.string(),
})

const SettingsPage: FC<SettingsPageProps> = () => {

   const [triggerUpdateUser] = useUpdateUserMutation();

   const { user } = useAuth();

   const navigate = useNavigate();
   
      const { 
         register, 
         handleSubmit,
         formState: { errors }
      } = useForm({
         defaultValues: {
            avatar: user?.image,
            username: user?.username,
            bio: user?.bio,
            email: user?.email,
            newPassword: '',
         },
         resolver: yupResolver(validationSchema),
      });

   const onSubmit = async ( values: SettingsFormValues ) => {
      try {
         await triggerUpdateUser(values).unwrap();
         navigate(`/@/${encodeURIComponent(values.username)}`); 
      } catch (error) {
         navigate(`/personal-feed`); 
         toast.error('Something wen\'t wrong')
      }
   }

   return (
      <Container>
         <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <ErrorsList errors={errors} />   
            <Input 
               placeholder='URL of profile picture'
               {...register('avatar')}
               size='SM'
            />
            <Input 
               placeholder='Username'
               {...register('username')}
            />
            <TextArea
               placeholder='Short bio about you'
               {...register('bio')}
               rows={10}
            />
            <Input 
               placeholder='Email'
               type='email'
               {...register('email')}
            />
            <Input 
               placeholder='New password'
               {...register('newPassword')}
               type='password'
            />
            <div className='flex justify-end'>
               <Button 
                  btnStyle='GREEN'
                  type='submit'
                  size='LG' 
               >
                  Update settings
               </Button>
            </div>
         </form>
      </Container>
   )
}

export default SettingsPage