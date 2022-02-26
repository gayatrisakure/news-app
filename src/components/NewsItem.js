import React from 'react'

const NewsItem = (props) => {


    
        let {title, description, imageUrl, newsUrl, author, date} = props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl?"https://st1.latestly.com/wp-content/uploads/2022/01/9-Watch-784x441.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown" :author} on {new Date(date).toGMTString()} 3 mins ago</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
