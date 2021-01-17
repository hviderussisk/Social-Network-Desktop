import React from 'react';
import News from './news';
import { connect } from 'react-redux';
import * as axios from 'axios'
import { postAC, moreNewsAC } from '../../../redux/news-reducer';
import { newLikeActionCreator } from '../../../redux/profile-reducer';

class NewsCont extends React.Component {
    componentWillMount() {
        axios.get('https://lenta.ru/rss').then(response => {
                let arrayNews = []
                let body = response.request.responseXML.querySelector('channel')
                let itemArray = []
                let parser = (body) => {
                    body.childNodes.forEach(element =>{
                        let newsObject = {}
                        if(element.localName === 'item'){ 
                            element.childNodes.forEach(itemelement =>{
                                if(itemelement.localName === 'title'){
                                    newsObject.title = itemelement.textContent
                                } else if(itemelement.localName === 'description'){
                                    newsObject.description = itemelement.textContent.trim()
                                } else if(itemelement.localName === 'link'){
                                    newsObject.link = itemelement.textContent
                                } else if(itemelement.localName === 'category'){
                                    newsObject.category = itemelement.textContent
                                } else if(itemelement.localName === 'pubDate'){
                                    newsObject.data = itemelement.textContent
                                } else if(itemelement.localName === 'enclosure'){
                                    newsObject.img = itemelement.attributes.url.textContent
                                }
                            })
                            itemArray.push(newsObject)
                            if(itemArray.length === this.props.pageSize){
                                arrayNews.push(itemArray)
                                itemArray = []
                            }
                        }
                    })
                    this.props.Post(arrayNews)
                }
                parser(body)
        })
    }
    render() {
        return <>
            <News pageNumber={this.props.pageNumber} moreNews={this.props.moreNews} newsArray={this.props.newsData} newLike={this.props.newLike}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        newsData: state.newsPage.newsData,
        pageSize: state.newsPage.size,
        pageNumber: state.newsPage.page
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        Post: (array) => {
            dispatch(postAC(array))
        },
        newLike: (idPage,id) => {
            dispatch(newLikeActionCreator(idPage,id))
        },
        moreNews: (current) =>{
            dispatch(moreNewsAC(current))
        }
    }
}

let NewsContainer = connect(mapStateToProps, mapDispatchToProps)(NewsCont)

export default NewsContainer;