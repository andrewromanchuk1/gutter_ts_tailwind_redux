export interface CreateArticleOutDTO {
   article: Article
 }
 
 export interface Article {
   title: string
   description: string
   body: string
   tagList: string[]
 }
 