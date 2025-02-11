const Banners = ({name,img,rounded})=>{
    return(
        <div className={`w-full h-full ${rounded ? "rounded-xl" : "rounded-none"}`}>
            <img src={img} alt={name} className={`w-full h-full object-cover ${rounded ? "rounded-xl" : "rounded-none"}`}/>
        </div>
    )
}

export default Banners;