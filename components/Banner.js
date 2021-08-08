import Image from 'next/image'
import BannerImage from '../media/banner.jpg'
function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
            <Image 
            src={BannerImage}
            alt="Taken by Brady Bellini. Source: unsplash"
            layout="fill"
            objectFit="cover"
            />
            <div className="absolute top-1/2 w-full text-center">
                <p className="text-lg sm:text-xl">Not sure where to go? Perfect.</p>
                <button className="text-blue-500 bg-white px-8 py-3 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">Explore</button>
            </div>
        </div>
    )
}

export default Banner
