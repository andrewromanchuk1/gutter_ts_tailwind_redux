import { FC } from "react"
import ArticleBanner from "../components/article-banner/article-banner.component"
import Container from "../../../common/components/container/container.component"
import TagList from "../components/tag-list/tag-list.component"
import ArticleMeta from "../components/article-meta/article-meta.component"
import { useGetSingleArticleQuery } from "../api/repository"
import { useParams } from "react-router-dom"


interface ArticlePageProps {

}

const ArticlePage: FC<ArticlePageProps> = () => {
  
  const {slug} = useParams();

  const resp = useGetSingleArticleQuery({slug: slug!});
  console.log(resp)
  if(!resp.data && !resp.isLoading) {
    return <h1>Article not found</h1>
  }
  
  return (
    <>
      <ArticleBanner title={resp.data?.article.title!} author={resp.data?.article.author!}/>
      <Container>
        <div className="pb-8 border-b mb-6">
          <p className="font-sourceSerif text-articleBody leading-articleBody mb-8">
            Sunt excepturi ut dolore fuga.\nAutem eum maiores aut nihil magnam corporis consectetur sit. Voluptate et quasi optio eos et eveniet culpa et nobis.\nSint aut sint sequi possimus reiciendis nisi.\nRerum et omnis et sit doloribus corporis voluptas error.\nIusto molestiae tenetur necessitatibus dolorem omnis. Libero sed ut architecto.\nEx itaque et modi aut voluptatem alias quae.\nModi dolor cupiditate sit.\nDelectus consectetur nobis aliquid deserunt sint ut et voluptas.\nCorrupti in labore laborum quod. Ipsa laudantium deserunt. Ut atque harum inventore natus facere sed molestiae.\nQuia aliquid ut.\nAnimi sunt rem et sit ullam dolorem ab consequatur modi. Cupiditate officia voluptatum.\nTenetur facere eum distinctio animi qui laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id provident suscipit harum odio et. Et fuga repellendus magnam dignissimos eius aspernatur rerum. Quo perferendis nesciunt.\nDolore dolorem porro omnis voluptatibus consequuntur et expedita suscipit et.\nTempora facere ipsa.\nDolore accusamus soluta officiis eligendi.\nEum quaerat neque eum beatae odio. Ad voluptate vel.\nAut aut dolor. Cupiditate officia voluptatum.\nTenetur facere eum distinctio animi qui laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id provident suscipit harum odio et.          
          </p>
          <TagList list={['123', '321']}/>
        </div>
        <div className="flex justify-center">
          {/* <ArticleMeta authorNameStyle="GREEN"/> */}
        </div>
      </Container>
    </>
  )
}

export default ArticlePage