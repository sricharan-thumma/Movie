import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './Home.css'

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}   interval={2000}>
            <Carousel.Item>
                <a href="/product/f6a6bf7f">
                    <img
                        className="d-block imgsize"
                        src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-14102023-MainBannerDailyChanging-Z1-P2-DNMXTS-under499.jpg"
                        alt="First slide"
                    />
                </a>

            </Carousel.Item>
            <Carousel.Item>
                <a href="/product/ed644f9c">
                    <img
                        className="d-block imgsize"
                        src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-10102023-MainBannerDailyChanging-Z1-P7-uspaamericaneagleoutfitters-upto50.jpg"
                        alt="First slide"
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="/product/cb6e35b9">
                    <img
                        className="d-block imgsize"
                        src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-14102023-MainBannerDailyChanging-Z1-P5-AnubhuteeSojanya-flat55.jpg"
                        alt="First slide"
                    />
                </a>
            </Carousel.Item>
        </Carousel>
        <Container>
            <h1 className=' pt-4 text-start'>Shop by Product</h1>
            <div className='row pt-4'>
                <div className="produc col-md-4 ">
                    <span>
                        <a className='cardl' href="/mobiles">
                            <img className=" device" src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-06102023-ClassicBrandTiles-allensollyvanheusen-min40.jpg" alt="Card image" style={{ width: '100%' }} />
                            <div className="middle mt-5">
                                <br />
                                
                            </div>
                        </a>
                    </span>
                </div>
                <div className="produc col-md-4 ">
                    <span>
                        <a className='cardl' href="/laptops">
                            <img className=" device" src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-22092023-TrendsBrandTiles-pointcoveriogirls-min60.jpg" alt="Card image" style={{ width: '100%' }} />
                            <div className="middle mt-5">
                                <br />
                               
                            </div>
                        </a>
                    </span>
                </div>
                <div className="produc col-md-4 ">
                    <span>
                        <a className='cardl' href="/laptops">
                            <img className=" device " src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-22092023-Kidswear-kgfrendzriogirls-starting149.jpg" alt="Card image" style={{ width: '100%' }} />
                            <div className="middle mt-5 mt-4    ">
                                <br />
                                
                            </div>
                        </a>
                    </span>
                </div>
            </div>
        </Container >
      </div>
    );
}

export default Home;