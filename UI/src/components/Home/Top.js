import React from 'react'
import './Homee.css';
import v1 from './v1.mp4';
import Orders from './Orders';
import Business from './Business';
import Aboutweb from './Aboutweb';
import Pic from './Pic';
export default function Top() {
  return (
 <div className="home"  >

<header>
    <div >
      <div className="video-container">
        <video autoPlay loop muted id="video-bg">
        <source src={v1} type="video/mp4" width="100%" height= "70%" frameborder="0" allowfullscreen />
        </video>
      </div>
    </div>

</header>

<div>
<Business/>
</div>

<div>
  <Pic/>
</div>


<div>
<Orders/>
</div>

{/* 
<div>
<Aboutweb/>
</div> */}

</div>
  )
}
