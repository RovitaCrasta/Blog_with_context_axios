import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import api from './api/posts'

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext)
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const postItems = posts.filter(post => post.id !== id)
    try {
      await api.delete(`/posts/${id}`)
      setPosts(postItems)
      navigate('/')
    } catch {
      console.log(`Error: $(err.message)`)
    }
  }
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
    return (
      <main className="PostPage">
          <article className="post">
            {post &&
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postDate">{post.body}</p>
              <Link to={`/editPost/${post.id}`}>
                <button className='editButton'>Edit Post</button>
              </Link>
              <button onClick={()=>{handleDelete(post.id)}} >
                Delete Post
              </button>
            </>
            }
            {!post && 
            <>
              <h2>Post Not FOund!</h2>
              <p> Well, that's dissappointing.</p>
              <p>
                 <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>}
          </article>
      </main>
    )
}


export default PostPage