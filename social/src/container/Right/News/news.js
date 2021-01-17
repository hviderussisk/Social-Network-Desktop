import React from 'react'
import NewsItem from './newsitem'
import c from './news.module.sass'

let Item = (props) => {
    let currentPage = () => {
        props.moreNews(props.pageNumber + 1)
        window.scrollTo(0,0)
    }
    let arrayMap
    !props.newsArray[props.pageNumber] ? arrayMap = props.newsArray : arrayMap = props.newsArray[props.pageNumber]
    let elemnts = arrayMap.map(newsitem => <NewsItem
        newLike={props.newLike}
        title={newsitem.title}
        description={newsitem.description}
        link={newsitem.link}
        category={newsitem.category}
        data={newsitem.data}
        img={newsitem.img}
        id={newsitem.key} />)
    return <>
        <div className={c.wrap}>
            {elemnts}
        </div>
        <div>
            <button onClick={currentPage}>Ещё</button>
        </div>
    </>


}

export default Item



