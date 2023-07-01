import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {isLoader: true, blogData: []}

  componentDidMount() {
    this.getBlogdata()
  }

  getBlogdata = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const Data = await response.json()
    const updateData = Data.map(eachItem => ({
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,
    }))
    this.setState({isLoader: false, blogData: updateData})
  }

  render() {
    const {blogData, isLoader} = this.state
    return (
      <div className="blog-list-container">
        {isLoader ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
