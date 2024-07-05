// import React, { Component } from 'react'

// export class Newsitem extends Component {
//     render() {
//         let { title, description, imgurl, newsurl, author, date, source } = this.props;
//         return (
//             <div className='my-3'>
//                 <div className="card">
//                     <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
//                         {source}
//                     </span>
//                     <img src={imgurl} className="card-img-top" alt="..." />
//                     <div className="card-body">
//                         <h5 className="card-title">{title}</h5>
//                         <p className="card-text">{description}</p>
//                         <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
//                         <a href={newsurl} target="blank" className="btn btn-sm btn-primary">Read more</a>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Newsitem

import React from 'react'

const Newsitem = (props) => {
    let { title, description, imgurl, newsurl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}>
                    {source}
                </span>
                <img src={imgurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} target="blank" className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem