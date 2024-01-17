import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../common/components/input/input.component'
import Container from '../../../common/components/container/container.component'
import MDEditorHookForm from '../../../common/components/mdeditor-hook-form/mdeditor-hook-form.component'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../../common/components/button/button.component'
import { useCreateArticleMutation, useEditArticleMutation, useGetSingleArticleQuery } from '../api/repository'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ErrorsList from '../../../common/components/errors-list/errors-list.component'
import { CreateArticleInDTO } from '../api/dto/create-article.in'
import { EditArticleInDTO } from '../api/dto/edit-article.in'

interface EditorPageProps {}

export interface EditorFormValues {
  title: string,
  description: string,
  body: string,
  tags?: string,
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
})

const EditorPage: FC<EditorPageProps> = () => {
  
  const [ triggerCreateArticle ] = useCreateArticleMutation();
  const [ triggeEditArticle ] = useEditArticleMutation();

  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditorFormValues>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const { slug } = useParams(); 

  const { data, isLoading } = useGetSingleArticleQuery(
    { slug: slug! }, 
    { skip: !Boolean(slug)}
  )
  
  const navigate = useNavigate();

  const onSubmit = async (values: EditorFormValues) => {
    try {
      let payload: CreateArticleInDTO | EditArticleInDTO;
      if(slug) {
        payload = await triggeEditArticle({ ...values, slug }).unwrap();
        navigate(`/article/${payload.article.slug}`);
      } else {
        payload = await triggerCreateArticle(values).unwrap();
        navigate(`/article/${payload.article.slug}`);
      }
      
    } catch (error) {
      toast.error('Something wen\'t wrong. Please, try again later')
    }
  }

  

  useEffect(() => {
    if(!data) {
      return;
    }

    reset({
      title: data.article.title,
      description: data.article.description,
      body: data.article.body,
      tags: data.article.tagList.join(', '),
    })
  }, [data])

  if( slug && isLoading ) {
    return <Container>
      Loading...
    </Container>
  }

  return (
    <Container>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <ErrorsList errors={errors} />
        <Input placeholder='Article Title' {...register('title')}/>
        <Input 
          placeholder="What's this article about?" 
          {...register('description')}
          size='SM'
        />
        <MDEditorHookForm control={control} name='body'/>
        <Input 
          placeholder='tags' 
          {...register('tags')}
          size='SM'
        />
        <div className='text-end'>
          <Button size='LG' type='submit' btnStyle='GREEN' disabled={isSubmitting}>
            Publish article
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default EditorPage