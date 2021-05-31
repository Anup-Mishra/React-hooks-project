import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    postDataHandler = () => {
        const post ={
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', post)
             .then(response => {
                 console.log(response);
                //  this.props.history.push('/posts'); pushes the page /posts in the stack and shows it but if we press back button it will bring us to the newpost page.
                //  this.props.history.replace('/posts'); works same as redirect it replaces the current page with the /posts so if we press back button it will take us to /posts bcoz we were previously there.
                 this.setState({submitted: true});
             });
    }

    render () {
        let redirect = null;
        if(this.state.submitted){
            redirect = <Redirect to='/posts' />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;