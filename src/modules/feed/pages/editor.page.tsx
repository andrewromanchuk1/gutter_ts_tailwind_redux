import { FC } from 'react'
import Container from '../../../common/components/container/container.component'
import { useCreateArticleMutation, useEditArticleMutation, useGetSingleArticleQuery } from '../api/repository'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CreateArticleInDTO } from '../api/dto/create-article.in'
import { EditArticleInDTO } from '../api/dto/edit-article.in'
import { PostFormValues } from '../types'
import PostForm from '../components/post-form/post-form.component'

interface EditorPageProps {}

const EditorPage: FC<EditorPageProps> = () => {
  
  const [ triggerCreateArticle ] = useCreateArticleMutation();
  const [ triggeEditArticle ] = useEditArticleMutation();

  const { slug } = useParams(); 

  const { data, isLoading } = useGetSingleArticleQuery(
    { slug: slug! }, 
    { skip: !Boolean(slug)}
  )
  
  const navigate = useNavigate();

  const onSubmit = async (values: PostFormValues) => {
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

  if( slug && isLoading ) {
    return <Container>
      Loading...
    </Container>
  }

  return (
    <Container>
      <PostForm 
        onSubmit={onSubmit} 
        data={data} 
      />
    </Container>
  )
}

export default EditorPage