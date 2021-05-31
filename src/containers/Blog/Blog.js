import React, { Component } from 'react';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(()=>{
    return import('./NewPost/NewPost'); 
});
/*we can also do lazy loading without creating a custom component for that
const Posts=React.lazy(()=>import(path to the component));
and then using suspense component while rendering
<Route path='/posts' render={()=>(
    <Suspense fallback={<div>Loading...</div>}>
    <Posts/>
    </Suspense>
)}/> */ 
class Blog extends Component {
    state = {
        auth: false
    }
    render () { 
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts/' exact activeClassName="my-active" activeStyle={{
                                textDecoration: 'underline',
                                color: '#fa932f'
                            }}>Home</NavLink></li>
                            <li><NavLink to='/new-post'>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                {this.state.auth?<Route path="/new-post" component={AsyncNewPost}/>: null}
                <Route path="/posts" component={Posts} />
                <Route render={()=> <h1>Not Found</h1>} />
                <Redirect from='/' to='/posts' />
                </Switch>
            </div>
        );
    }
}

export default Blog;