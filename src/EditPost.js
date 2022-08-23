import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext'
import { format } from 'date-fns'
import api from './api/posts'

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext)
    const [editTitle, setEditTitle] =useState('')
    const [editBody, setEditBody] = useState('')
    const navigate = useNavigate()

    const { id }  = useParams()
    const post = posts.filter(post => (post.id).toString() === id)[0]
    useEffect(()=>{
        if (post) {
           setEditTitle(post.title)
           setEditBody(post.body)
        }
    }, [post, setEditBody, setEditTitle])
    
    const handleEdit = async (e, id) => {
        e.preventDefault() 
        const updatedPost = {
          id,
          title: editTitle,
          datetime: format(new Date(), 'MMMM dd, yyyy pp'),
          body: editBody
        }
        try {
          await api.put(`/posts/${id}`, updatedPost)
          const updatedPosts = posts.map((post) => {
            if ((post.id).toString() === id) {
              return updatedPost
            } else {
              return post
            }
          })
          setPosts(updatedPosts)
          setEditTitle('')
          setEditBody('')
          navigate('/')
        } catch (err) {
          console.log(`Error: $(err.message)`)
        }
        
      }
    return (
        <main className="NewPost">
            {
                editTitle && <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => handleEdit(e, id)}>
                        <label htmlFor="postTitle">Title</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Body</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form></>
            }
          {!editTitle && 
            <>
              <h2>Post Not FOund!</h2>
              <p> Well, that's dissappointing.</p>
              <p>
                 <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>}
        </main>
      )
}

export default EditPost