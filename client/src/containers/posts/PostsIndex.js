import React, { Component } from 'react';
import { harmonyConnect } from '../../base/features/harmony-redux-react-connect';
import { fetchPosts } from '../../actions/posts/actions_posts';
import { Link } from 'react-router-dom';
import { POSTS_NEW, POSTS_SHOW } from '../../routes';

class PostsIndex extends Component {

    componentWillMount() {
		
        this.props.fetchPosts();
		
    }

    renderPosts() {
        if(this.props.posts) {
            return this.props.posts.map((post) => {
                return (
                    <li className="list-group-item" key={post._id}>
                        <Link to={POSTS_SHOW + post._id}>
                            <span className="pull-xs-right">{post.categories}</span>
                            <strong>{post.title}</strong>
                        </Link>
                    </li>
                );
            });
        }
        else if (this.props.message) {
            return (<div>{this.props.message}</div>);
        }

        else {
            return <div></div>
        }
    }

    render () {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to={POSTS_NEW} className="btn btn-primary" >
                        {this.T("addPost")}
                    </Link>
                </div>
                <h3>{this.T("postsTitle")}</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

export default harmonyConnect(PostsIndex,
    (state) => {
        return {
            posts: state.posts.get('all'),
            message: state.posts.get('message')
        }
    },
    {
        fetchPosts
    }
);