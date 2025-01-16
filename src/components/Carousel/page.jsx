"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Carouselitem = () => {
    const images = [
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQBb_p20DoWj9rnSh_ni7TMZxlPGZW1WZ16ZYHoxp8F_Boh7MbFR5DlnQLJthUFNVPsS69dCtgNxeGrDGHRvs4M2OhHwQzCddc8le3JIJ12H3tV59DLkz2J&usqp=CAE",
        "https://www.leafstudios.in/cdn/shop/files/1_1099cd20-7237-4bdf-a180-b7126de5ef3d.png?v=1722230645",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQU0bDugbFtQaHpJXYUlA45hdIaFyWPc7VlOd8RqPQcNqaIsqViwTSDKQw5QP3ztlDCqczyWT16X8Q73N6-VZqgA1G_xM8CrlwjLa32GLyrhtFJkZiskUM3Cw&usqp=CAE",
        "https://m.media-amazon.com/images/I/619gDUPcbNL.jpg",
        "https://tiimg.tistatic.com/fp/1/007/702/fashionable-long-lasting-mobile-cover-black-colour-with-simple-design-026.jpg",
        "https://www.xboom.in/wp-content/uploads/2023/09/2-22.png"
    ];
    return (
        <>
            <div className="w-full flex text-white  gap-2 mt-2">
                <div className="w-full md:w-2/3 h-[20rem] md:h-[28rem]">
                    <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 2000 })]}>
                        <CarouselContent>
                            <CarouselItem>
                                <div
                                    className="h-[20rem] md:h-[28rem] flex items-center justify-center">
                                    <img src="https://myefm.com/cdn/shop/files/Cayman-Banner-1400x1400-2_c65a224b-ce8a-4b89-a8f6-0332a31f7279.jpg?v=1665115640&width=800" className="w-full h-full rounded-lg" width={100} height={100}>
                                    </img>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className="h-[20rem] md:h-[28rem] flex items-center justify-center">
                                    <img src="https://hiraoka.com.pe/media/mageplaza/blog/post/g/u/guia_de_compra_apple-iphone-ipad-apple_watch-macbook.jpg" className="w-full h-full rounded-lg" width={100} height={100}>
                                    </img>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className="h-[20rem] md:h-[28rem] flex items-center justify-center">
                                    <img src="https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg" className="w-full h-full rounded-lg" width={100} height={100}>
                                    </img>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="hidden md:w-1/3 h-[28rem] md:flex flex-col gap-2">
                    <div className="h-[48%]">
                        <div
                            className="h-[100%] flex items-center justify-center">
                            <img src="https://1gr.cz/fotky/idnes/21/062/c460/BHA8c1b87_applewatchtop.jpg" className="w-full h-full rounded-lg" width={100} height={100}>

                            </img>
                        </div>
                    </div>
                    <div className="h-[50%]">
                        <div
                            className="h-[100%] flex items-center justify-center">
                            <img src="https://i.ytimg.com/vi/rhmaot7g0rY/mqdefault.jpg" className="w-full h-full rounded-lg" width={100} height={100}>

                            </img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 mx-auto max-w-6xl">
                {images.map((image, index) => (
                    <div key={index} className="w-full h-48 md:h-72 rounded-md shadow-lg overflow-hidden group">
                        <div className="h-full flex items-center justify-center">
                            <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Carouselitem;
