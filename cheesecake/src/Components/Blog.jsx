import React from 'react';
import blog1 from '../images/IMAGE FOR BLOG 1.png';
import blog2 from '../images/Image Blog 2.png';
import blog3 from '../images/Image Blog 3.png'

function Blog() {
  return (
    <section className='blog'>
        <h1>Our Blog</h1>
        <p className='recent'>Our Recent Posts</p>
        <div className="row">
            <div className="col-lg-4 blog-box col-sm-12">
                <div className="blog-img"><img src={blog1} /></div>
                <h5>23 Nov, 2023 / Cheesecake</h5>
                <h4>A Peek Behind the Cheesecake Curtain</h4>
                <p className='blog-text'>Step into our cheesecake haven, where the magic unfolds behind the scenes, whisking dreams into reality. Our kitchen is a symphony and very...</p>
                <p className='read-more'>Read More</p>
            </div>
            <div className="col-lg-4 blog-box col-sm-12">
            <div className="blog-img"><img src={blog2} /></div>
                <h5>18 July, 2023 / Cheesecake</h5>
                <h4>Low-Sugar & Gluten-Free Cheesecakes</h4>
                <p className='blog-text'>Welcome to our guilt-free indulgence zone, where we're redefining the art of cheesecake with our delectable low-sugar...</p>
                <p className='read-more read2'>Read More</p>
            </div>
            <div className="col-lg-4 blog-box col-sm-12">
            <div className="blog-img"><img src={blog3} /></div>
                <h5>1 January, 2024 / Cheesecake</h5>
                <h4>Sweet Words - Customer Reviews of Cheesecakes</h4>
                <p className='blog-text'>Indulge in the rich tapestry of heartfelt stories within "Sweet Words." This curated collection of customer reviews offers a glimpse into the joy...</p>
                <p className='read-more'>Read More</p>
            </div>
        </div>
    </section>
  )
}

export default Blog