import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';
// import {Link} from 'react-router-dom';
import './Posts.css';
 class Posts extends Component{
    state = {
        posts: [],
    }
    postSelectHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    componentDidMount(){
        axios.get('/posts')
             .then(response =>{
                 const posts = response.data.slice(0,4);
                 const updatedPosts = posts.map(post => {
                    return{
                         ...post,
                         author: 'Anup'
                 };
                 });
                this.setState({posts:updatedPosts});
             })
             .catch(error => {
                 console.log(error);
            //    this.setState({rror: true});
             });
    }
    render(){
        let posts = <p style={{textAlign: 'center'}}>Something went wrong...</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                // <Link to={"/posts/" + post.id} key={post.id} >
                <Post title={post.title} key={post.id} 
                author={post.author} 
                clicked={() => this.postSelectHandler(post.id)} />
                // </Link>;
                );
            });
        }
        return(
            <div>
            <section className="Posts">
                    {posts}
                </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
 }
 
export default Posts;