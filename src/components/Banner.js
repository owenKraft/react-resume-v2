import React, {useState, useEffect } from 'react';

const Banner = () => {
    const [banner, setBanner] = useState("https://i.pinimg.com/originals/3b/29/ee/3b29ee0897204e6ece68886641afcb63.png");
    const [editFlag, setEditFlag] = useState(false)

    useEffect(() => {
        const toggleEdit = () => {
          if(editFlag === true){
            const src = document.getElementById("banner-src").value;
            setBanner(src)
            setEditFlag(!editFlag);
          } else {
            setEditFlag(!editFlag);
          }
        };
    
        document.querySelector(".fa-cog").addEventListener("click", toggleEdit);
    
        return () => {
          document.querySelector(".fa-cog").removeEventListener("click", toggleEdit);
        };
      }, [editFlag])

    if(editFlag === true){
        return (
            <div class="container">
                <img className="image-banner" src={banner} alt=""/>
                <label for="banner-src">image URL: </label>
                <input id="banner-src" name="banner-src" type="text" defaultValue={banner}></input>
                <button id="banner-submit-btn" class="btn-green float-right fa-cog">all done</button>
            </div>
        )
    } else { 
        return (
            <div class="container">
                <img className="image-banner" src={banner} alt=""/>
                    <div class="overlay">
                        <a href="#" class="icon" title="User Profile">
                            <i class="fas fa-cog"></i>
                        </a>
                </div>
            </div>
        )
    }
}
  
  export default Banner;