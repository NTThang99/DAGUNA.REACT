import React from "react";
import { roomItems } from "../data/Data";
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "../../css/roomDetail.css"



export default function RoomDetails() {

  const { roomName } = useParams(); // Lấy roomName từ URL
  const room = roomItems.find((item) => item.url === roomName);

  if (!room) {
    return <div>Room not found</div>;
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ display: 'contents' }}>
        <Container maxWidth="lg" className="css-1pdm75k">
          <div className="content">
            <Typography className="title css-1bg6fs1" variant="h3" >Choáng ngợp trước vẻ đẹp ngoạn mục của dãy Trường Sơn hùng vĩ</Typography>
            <div className="root css-57wpn8">
              <div className="descriptionMD">
                <p> Hít thật sâu, đón bình minh đầy sảng khoái trong hơi thở đầu ngày khi trước mắt là khung cảnh hùng vĩ của dãy núi Trường Sơn từ chiếc giường cỡ King vô cùng thoải mái, bước chân ra là ban công riêng, nơi để bạn tận hưởng khí trời mát lành. Hạng phòng Garden Balcony King Grand của chúng tôi là sự kết hợp giữa phong cách truyền thống Việt Nam với nội thất tiện nghi hiện đại, như kênh TV vệ tinh, vòi sen phun mưa và internet miễn phí.</p>
              </div>
              <div className="btnWrapper css-i28fnt">
                <a className="btn btn-sm btn-dark rounded py-2 px-4" href="">book now</a>
              </div>
            </div>
          </div>
          <div className="colRight">
            <div className="imgWrapper">
              <div className="imgProgress"></div>
              <div className="imgWrapperInner">
                <span className="spanImg">
                  <img className="fade" src={room.img} />
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div style={{ display: 'contents' }}>
        <div className="css-1valejz">
          <Container maxWidth="lg" >
            <Grid container style={{ borderBottom: '0.5px solid #d6d6d6', marginLeft: 0 }} spacing={3} >
              <Grid xs={4}>
                <Box className="colInner">
                  <Typography variant="h6" className="colTitle css-4a66jt"> capacity & size  </Typography>
                  <Box className="colContent">
                    <svg width="35" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                      <g fill="currentColor" clip-path="url(#icon-people_svg__b)">
                        <path d="M14.928 12.63a2.308 2.308 0 01-2.315-2.315A2.308 2.308 0 0114.928 8a2.331 2.331 0 012.315 2.315 2.331 2.331 0 01-2.315 2.315zm0-3.943c-.868 0-1.592.724-1.592 1.592 0 .868.724 1.591 1.592 1.591.868 0 1.591-.723 1.591-1.591s-.723-1.592-1.591-1.592zM18.509 22.36H11.31c-.217 0-.362-.145-.362-.362v-6.113a2.902 2.902 0 012.894-2.894h2.097a2.902 2.902 0 012.894 2.894v6.113c.036.217-.145.362-.325.362zm-6.837-.724h6.439v-5.75c0-1.195-.977-2.171-2.17-2.171h-2.098c-1.194 0-2.17.976-2.17 2.17v5.751zM9.502 12.991a1.814 1.814 0 01-1.808-1.808 1.79 1.79 0 011.808-1.809 1.79 1.79 0 011.809 1.809 1.814 1.814 0 01-1.809 1.808zm0-2.857c-.579 0-1.085.47-1.085 1.085 0 .579.47 1.085 1.085 1.085s1.085-.47 1.085-1.085c-.036-.615-.506-1.085-1.085-1.085z"></path>
                        <path d="M11.31 20.515H6.863c-.217 0-.362-.145-.362-.362v-3.69a2.995 2.995 0 013.002-3.001c.904 0 1.736.398 2.315 1.085.145.144.109.398-.036.506-.145.145-.398.109-.507-.036-.434-.506-1.048-.832-1.736-.832a2.292 2.292 0 00-2.278 2.279v3.327h4.087c.217 0 .362.145.362.362s-.181.362-.398.362z"></path>
                        <g>
                          <path d="M20.498 12.991a1.814 1.814 0 01-1.809-1.808 1.79 1.79 0 011.809-1.809 1.79 1.79 0 011.808 1.809 1.79 1.79 0 01-1.808 1.808zm0-2.857c-.579 0-1.085.47-1.085 1.085 0 .579.47 1.085 1.085 1.085s1.085-.47 1.085-1.085-.47-1.085-1.085-1.085zM23.138 20.515H18.69c-.217 0-.361-.145-.361-.362s.144-.362.361-.362h4.088v-3.327a2.292 2.292 0 00-2.28-2.279c-.686 0-1.301.29-1.735.832-.145.145-.362.18-.507.036-.144-.144-.18-.362-.036-.506a2.99 2.99 0 012.279-1.085 2.995 2.995 0 013.002 3.002v3.69c0 .216-.145.36-.362.36z"></path>
                        </g>
                      </g>
                    </svg>
                    <span className="colContentText">2</span>
                  </Box>
                  <Box className="colContent">
                    <svg width="35" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" clip-path="url(#icon-zoom_svg__b)">
                        <path d="M8.27 13.315V8.438M8.294 8.438l13.628 13.707M8.27 8.438h4.878M21.922 17.268v4.877M21.922 22.145h-4.877M17.045 8.438h4.877M21.922 8.438v4.877M13.171 22.145H8.294M8.294 22.145v-4.877"></path>
                      </g>
                    </svg>
                    <span className="colContentText">90-102 sqm</span>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="colInner">
                  <Typography component="h3" variant="h6" className="colTitle css-4a66jt"> beds  </Typography>
                  <Box className="IconWithLabel">
                    <Box className="IconWithLabel-icon">
                      <svg width="35" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor" clip-path="url(#icon-bed-1_svg__b)">
                          <path d="M23.138 22.938c-.217 0-.361-.144-.361-.361v-3.798H7.223v3.798c0 .217-.144.361-.361.361s-.362-.144-.362-.361v-4.16c0-.217.145-.362.362-.362h16.276c.217 0 .362.145.362.362v4.16c0 .18-.145.361-.362.361z"></path>
                          <path d="M23.138 22.323H6.862c-.217 0-.362-.144-.362-.361s.145-.362.362-.362h16.276c.217 0 .362.145.362.362s-.145.361-.362.361zM21.547 14.257H8.453c-.217 0-.362-.144-.362-.361v-4.34C8.091 8.686 8.78 8 9.647 8h10.67c.868 0 1.555.687 1.555 1.555v4.34c.036.182-.108.362-.325.362zm-12.732-.723h12.37V9.555a.841.841 0 00-.832-.832H9.647a.841.841 0 00-.832.832v3.979z"></path>
                          <path d="M23.138 18.779H6.862c-.109 0-.217-.073-.29-.145a.352.352 0 01-.036-.325l1.592-4.522a.347.347 0 01.325-.253h13.094c.145 0 .29.109.325.253l1.592 4.522a.351.351 0 01-.036.325.329.329 0 01-.29.145zm-15.77-.724h15.264l-1.338-3.798H8.706l-1.338 3.798z"></path>
                        </g>
                      </svg>
                    </Box>
                    <Typography component="p" className="css-1vbufz3">King</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box className="colInner">
                  <Typography component="h3" variant="h6" className="colTitle css-4a66jt"> view  </Typography>
                  <Box className="IconWithLabel">
                    <Box className="IconWithLabel-icon">
                      <img src="https://www.angsana.com/assets/icons/Rooms - Courtyard.svg" alt="Rooms - Courtyard.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/Rooms - Courtyard.svg" />
                    </Box>
                    <Typography component="p" className="css-1vbufz3">Courtyard</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box className="features" >
              <Typography variant="h6" className="colTitle css-4a66jt" style={{ paddingLeft: '51px' }}> room features & amenities </Typography>
              <Box className="featuresInner">
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/AN Amenities - Bathtub.svg" alt="AN Amenities - Bathtub.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/AN Amenities - Bathtub.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Bathtub</Typography>
                </Box>
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/Angsana - Bike.svg" alt="Angsana - Bike.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/Angsana - Bike.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Complimentary Bicycles</Typography>
                </Box>
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/AN Amenities - WiFi.svg" alt="AN Amenities - WiFi.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/AN Amenities - WiFi.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Complimentary Wi-Fi</Typography>
                </Box>
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/AN Amenities - Fridge.svg" alt="AN Amenities - Fridge.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/AN Amenities - Fridge.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Minibar</Typography>
                </Box>
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/AN Amenities - Terrace-Deck.svg" alt="AN Amenities - Terrace-Deck.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/AN Amenities - Terrace-Deck.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Private Deck</Typography>
                </Box>
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/AN Amenities - Pool.svg" alt="AN Amenities - Pool.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/AN Amenities - Pool.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Private Plunge Pool</Typography>
                </Box>
                <Box className="IconWithLabel css-1j8bv2l">
                  <Box className="IconWithLabel-icon">
                    <img src="https://www.angsana.com/assets/icons/AN Amenities - TV_0.svg" alt="AN Amenities - TV.svg" title="" width="30" height="30" decoding="async" data-src="https://www.angsana.com/assets/icons/AN Amenities - TV_0.svg" />
                  </Box>
                  <Typography component="p" className="css-1vbufz3">Television Set</Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      </div>

    </React.Fragment>

  );
}
