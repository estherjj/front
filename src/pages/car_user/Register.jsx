import React, { useCallback, useLayoutEffect, useRef } from 'react';
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Stack,
  Input,
  ButtonGroup,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TimeField from '../../components/common/TimeField';
import SubHeader from '../../components/common/SubHeader';
import DaumPost from '../../components/car_user/DaumPost';
import { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import Typography from '@mui/material/Typography';
import CarList from '../../components/car_user/CarList';

import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { useLocation, useNavigate } from 'react-router-dom';
// import { formatDate } from '@fullcalendar/core';
import dayjs from 'dayjs';
import SubSideContents from '../../components/car_user/SubsideContents';
import Label from '../../components/common/Label';
import Selectbox from '../../components/common/Selectbox';
import RectangleBtn from '../../components/common/RectangleBtn';
import { palette } from '../../theme/palette';
import RectangleIcon from '@mui/icons-material/Rectangle';
import axiosInstance from '../../utils/axios';
import { useSelector } from 'react-redux';
import Spinner from '../../components/common/Spinner';
import LoadingModal from '../../components/car_user/LoadingModal';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const carRez = location.state;
  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: ''
  });
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [carDetail, setCarDetail] = useState({
    id: null,
    car_name: null,
    accum_mileage: null,
    authority: null,
    fuel_type: null,
    fuel_effciency: null,
    car_address: null
  });
  const currentUser = useSelector((state) => state.user);
  const mem_code = currentUser.mem_code;
  const [formData, setFormData] = useState({
    memDTO: {
      mem_code: mem_code
    },
    carDTO: {
      car_code: ''
    },
    detail: '',
    est_mileage: '',
    start_at: '',
    return_at: '',
    receipt_loc: '',
    return_loc: '',
    dest_loc: ''
  });
  //수정시 초기값 설정
  const initCar_rez_code = carRez ? carRez.rez.car_rez_code : '';
  const initMem_code = carRez ? carRez.rez.memResponseVO.mem_code : '';
  const initCar_code = carRez
    ? carRez.rez.carDetailResponseVO.carVO.car_code
    : '';
  const initDetail = carRez ? carRez.rez.detail : '';
  const initEst_mileage = carRez ? carRez.rez.est_mileage : '';
  const initStart_at = carRez ? carRez.rez.start_at : '';
  const initReturn_at = carRez ? carRez.rez.return_at : '';
  const initReceipt_loc = carRez ? carRez.loc[0].address : '';
  const initReturn_loc = carRez ? carRez.loc[1].address : '';
  const initDest_loc = carRez ? carRez.loc[2].address : '';

  const [car_rez_code, setCar_rez_code] = useState(initCar_rez_code);
  // const [mem_code, setMem_code] = useState(initMem_code);
  const [car_code, setCar_code] = useState(initCar_code);
  const [detail, setDetail] = useState(initDetail);
  const [est_mileage, setEst_mileage] = useState(initEst_mileage);
  const [start_at, setStart_at] = useState(initStart_at);
  const [return_at, setReturn_at] = useState(initReturn_at);
  const [receipt_loc, setReceipt_loc] = useState(initReceipt_loc);
  const [return_loc, setReturn_loc] = useState(initReturn_loc);
  const [dest_loc, setDest_loc] = useState(initDest_loc);

  //입력시 변환
  const handleCarCode = (e) => {
    if (carRez) {
      setCar_code(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleDetail = (e) => {
    if (carRez) {
      setDetail(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleEstMileage = (e) => {
    if (carRez) {
      setEst_mileage(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleStartAt = (e) => {
    if (carRez) {
      setStart_at(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleReturnAt = (e) => {
    if (carRez) {
      setReturn_at(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleReceiptLoc = (e) => {
    if (carRez) {
      setReceipt_loc(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleReturnLoc = (e) => {
    if (carRez) {
      setReturn_loc(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleDestLoc = (e) => {
    if (carRez) {
      setDest_loc(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  let updateData = {};
  if (carRez) {
    updateData = {
      car_rez_code: car_rez_code,
      memDTO: {
        mem_code: mem_code
      },
      carDTO: {
        car_code: car_code
      },
      detail: detail,
      est_mileage: est_mileage,
      start_at: start_at,
      return_at: return_at,
      receipt_loc: receipt_loc,
      return_loc: return_loc,
      dest_loc: dest_loc
    };
  }
  const returnLocList = [
    {
      index: 0,
      key: 0,
      value: '강원특별자치도 춘천시 남산면 버들1길 130'
    },
    {
      index: 1,
      key: 1,
      value: '서울특별시 중구 을지로1가 을지로 29'
    },
    {
      index: 2,
      key: 2,
      value: '부산 해운대구 센텀중앙로 79'
    }
  ];
  const dateFormat = (date) => {
    const preDate = new Date(date);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return preDate.toLocaleString('ko-KR', options);
  };
  //값이 변하면 formdata 값변경 함수
  // const handleChange2 = (e) => {
  //   console.log(e.target);
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };
  const handleChange = (e, set) => {
    if (carRez) {
      set(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      set(e.target.value);
    }
  };

  const handleChangeLoc = (e, set) => {
    if (carRez) {
      set(addressObj.areaAddress + addressObj.townAddress);
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      set(addressObj.areaAddress + addressObj.townAddress);
    }
  };
  // let rezStart_at;
  // let rezReturn_at;
  const [rezStart_at, setRezStart_at] = useState(null);
  const [rezReturn_at, setRezReturn_at] = useState(null);
  const handleTimeChange = (e, name, set) => {
    if (carRez) {
      set(e.$d);
    } else {
      console.log(typeof e.$d);
      setFormData({
        ...formData,
        [name]: e.$d
      });
      if (name === 'start_at') {
        setRezStart_at(e.$d);
      }
      if (name === 'return_at') {
        setRezReturn_at(e.$d);
      }
    }
  };
  //submit하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    var flag = 0;
    if (formData.carDTO.car_code === '') {
      alert('차량을 선택하세요');
      flag++;
    }
    if (formData.start_at === '' || formData.return_at === '') {
      alert('날짜를 선택하세요');
      flag++;
    }
    if (formData.return_loc === '' || formData.dest_loc === '') {
      alert('장소를 선택하세요');
      flag++;
    }
    if (flag === 0) {
      axiosInstance
        .post('http://localhost:8081/car_rez/rezSave', formData)
        .then((res) => {
          let data = res.data;
          data.start_at = dateFormat(res.data.start_at);
          data.return_at = dateFormat(res.data.return_at);
          console.log('예약 완료 : ' + dateFormat(res.data.start_at));
          navigate('../carRezComplete', { state: data });
        });
    }
  };

  //modal여는 함수
  const handleOpenModal = () => {
    console.log(rezStart_at);
    if (rezStart_at === null || rezReturn_at === null) {
      alert('날짜를 입력해주세요');
    } else {
      console.log('대여일:' + Date.parse(rezStart_at));
      console.log('반납일: ' + Date.parse(rezStart_at));
      if (Date.parse(rezStart_at) > Date.parse(rezStart_at)) {
        alert('대여일이 반납일보다 늦습니다');
      } else {
        setOpen(true);
      }
    }
  };

  //modal 닫는 함수
  const handleCloseModal = (reason) => {
    if (reason === 'buttonClick') {
      // 특정 버튼을 클릭한 경우의 처리
      console.log('사용자가 버튼을 클릭하여 모달이 닫힘');
    }
    setOpen(false);
  };
  //차량 선택 후 처리
  const carSelect = (e) => {
    console.log(selectedRows);
    if (selectedRows.length !== 0) {
      //console.log(selectedRows.id);
      if (carRez) {
        setCar_code(selectedRows.car_code);
      } else {
        setFormData({
          ...formData,
          carDTO: { car_code: selectedRows.car_code },
          receipt_loc: selectedRows.car_address
        });
      }
      setOpen(false);
    } else {
      alert('차량을 선택해주세요');
    }

    axiosInstance
      .get(`http://localhost:8081/car_rez/carDetail/${selectedRows.car_code}`)
      .then((res) => {
        setCarDetail({
          id: res.data.carVO.car_code,
          car_name: res.data.carVO.car_name,
          accum_mileage: res.data.accum_mileage,
          authority: res.data.carVO.authority,
          fuel_type: res.data.carVO.fuel_type,
          fuel_effciency: res.data.fuel_effciency,
          car_address: res.data.car_address
        });
        //차량 위치 저장
        setReceipt_loc(selectedRows.car_address);
      });
  };

  const est_mileageCal = (locList) => {
    if (locList) {
      const destCoordinate =
        locList.dest_loc[0].toString() + ',' + locList.dest_loc[1].toString();

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          appKey: 'e8wHh2tya84M88aReEpXCa5XTQf3xgo01aZG39k5'
        },
        body: JSON.stringify({
          tollgateFareOption: 16,
          roadType: 32,
          directionOption: 1,
          endX: locList.return_loc[0],
          endY: locList.return_loc[1],
          endRpFlag: 'G',
          reqCoordType: 'WGS84GEO',
          startX: locList.receipt_loc[0],
          startY: locList.receipt_loc[1],
          //gps시간 예약시간으로
          gpsTime: '20191125153000',
          speed: 10,
          uncetaintyP: 1,
          uncetaintyA: 1,
          uncetaintyAP: 1,
          //톨비를 위한 차종 0(기본값):미선택,1:승용차,2:중형승합차,3:대형승합차,4:대형화물차,5:특수화물차,6:경차,7:이륜차
          carType: 0,
          // startName: '%EC%9D%84%EC%A7%80%EB%A1%9C%20%EC%9E%85%EA%B5%AC%EC%97%AD',
          // endName: '%ED%97%A4%EC%9D%B4%EB%A6%AC',
          passList: destCoordinate,
          gpsInfoList:
            '126.939376564495,37.470947057194365,120430,20,50,5,2,12,1_126.939376564495,37.470947057194365,120430,20,50,5,2,12,1',
          detailPosFlag: '2',
          resCoordType: 'WGS84GEO',
          sort: 'index'
        })
      };
      fetch(
        'https://apis.openapi.sk.com/tmap/routes?version=1&callback=function',
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.features[0].properties.totalDistance);
          setFormData({
            ...formData,
            est_mileage: (
              response.features[0].properties.totalDistance / 1000
            ).toFixed(1)
          });
          setEst_mileage(
            (response.features[0].properties.totalDistance / 1000).toFixed(1)
          );
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const locSelect = (e) => {
    handleChange(e, setReturn_loc);
  };
  // useLayoutEffect(() => {
  //   if (carRez !== null) {
  //     console.log(carRez);

  // setFormData({
  //   memDTO: {
  //     mem_code: 'MEM001'
  //   },
  //   carDTO: {
  //     car_code: carRez.rez.carDetailResponseVO.carVO.car_name
  //   },
  //   detail: carRez.rez.detail,
  //   est_mileage: carRez.rez.est_mileage,
  //   start_at: carRez.rez.start_at,
  //   return_at: carRez.rez.return_at,
  //   receipt_loc: carRez.loc[0].address,
  //   return_loc: carRez.loc[1].address,
  //   dest_loc: carRez.loc[2].address
  // });
  //   }
  //   setFormData({
  //     ...formData,
  //     dest_loc: addressObj.areaAddress + addressObj.townAddress
  //   });
  // }, []);

  // 예약 정보 수정
  const updateRez = () => {
    console.log(updateData);
    axiosInstance
      .patch('http://localhost:8081/car_rez/carRezDetail', updateData)
      .then((res) => {
        // console.log('수정완료', res.data);
        let data = { ...res.data, isUp: true };
        data.start_at = dateFormat(res.data.start_at);
        data.return_at = dateFormat(res.data.return_at);
        console.log(data.start_at);
        alert('수정완료.');
        // window.location.href = '/carRez/dashboard';
        navigate('../carRezComplete', { state: data });
      });
  };
  useEffect(() => {
    if (carRez !== null) {
      console.log(carRez);
      setDest_loc(addressObj.areaAddress + addressObj.townAddress);
    }
    setFormData({
      ...formData,
      dest_loc: addressObj.areaAddress + addressObj.townAddress
    });
  }, [addressObj]);
  useEffect(() => {
    setDest_loc(initDest_loc);
  }, []);
  useEffect(() => {
    if (carRez) {
      console.log('update');
      console.log(receipt_loc);
      console.log(return_loc);
      console.log(addressObj);
      console.log(updateData);
      if (
        (receipt_loc !== '') &
        (return_loc !== '') &
        (updateData.dest_loc !== '')
      ) {
        let dest_loc;
        if ((addressObj.areaAddress === '') & (addressObj.townAddress === '')) {
          dest_loc = updateData.dest_loc;
        } else {
          dest_loc = addressObj.areaAddress + addressObj.townAddress;
        }

        axiosInstance
          .get(
            `http://localhost:8081/car_rez/findRoute/${receipt_loc}/${return_loc}/${dest_loc}`
          )
          .then((res) => {
            setIsLoading(true);
            const locList = res.data;
            console.log(locList);
            est_mileageCal(locList);
          });
      }
    } else {
      console.log('asdasdasdasda');
      console.log(receipt_loc);
      console.log(return_loc);
      console.log(addressObj);
      if ((receipt_loc !== '') & (return_loc !== '') & (addressObj !== '')) {
        let dest_loc = addressObj.areaAddress + addressObj.townAddress;
        axiosInstance
          .get(
            `http://localhost:8081/car_rez/findRoute/${receipt_loc}/${return_loc}/${dest_loc}`
          )
          .then((res) => {
            setIsLoading(true);
            const locList = res.data;
            console.log(locList);
            est_mileageCal(locList);
          });
      }
    }
  }, [receipt_loc, return_loc, addressObj]);
  return (
    <>
      <SubHeader title={'차량 예약'} />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}
        >
          <Grid item xs={4}>
            <Item>
              <Stack sx={{ rowGap: '10px' }}>
                <Box
                  display="flex"
                  marginTop="15px"
                  sx={{
                    width: '100%',
                    borderBottom: '3px solid black',
                    padding: '5px 0px'
                  }}
                  mb={1}
                >
                  <RectangleIcon
                    sx={{
                      color: 'black',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      width: '6px',
                      height: '6px'
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
                    기본 정보
                  </Typography>
                </Box>
                {/* 이름 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'mem_code'} text={'이름'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="mem_code"
                      variant="outlined"
                      placeholder="이름을 입력하세요"
                      value={
                        carRez !== null
                          ? carRez.rez.memResponseVO.name
                          : currentUser.name
                      }
                    />
                  </Grid>
                </Grid>

                {/* 부서 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'dpt_name'} text={'부서'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="dpt_name"
                      variant="outlined"
                      placeholder="부서를 입력하세요"
                      value={
                        carRez !== null
                          ? carRez.rez.memResponseVO.deptVO.dept_name
                          : currentUser.dept_name
                      }
                    />
                  </Grid>
                </Grid>

                {/* 직급 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'position_name'} text={'직급'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="position_name"
                      variant="outlined"
                      placeholder="직급을 입력하세요"
                      value={
                        carRez !== null
                          ? carRez.rez.memResponseVO.position_name
                          : currentUser.position_name
                      }
                    />
                  </Grid>
                </Grid>
                {/* 목적 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'detail'} text={'목적'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="detail"
                      name="detail"
                      variant="outlined"
                      placeholder="목적을 입력하세요"
                      onChange={(e) => handleChange(e, setDetail)}
                      value={carRez ? detail : formData.detail}
                    />
                  </Grid>
                </Grid>
                {/* 대여 날짜 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'start_at'} text={'대여 날짜'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TimeField
                      withMonth={true}
                      label={'대여 날짜'}
                      name={'start_at'}
                      onChange={(e) =>
                        handleTimeChange(e, 'start_at', setStart_at)
                      }
                      timeValue={carRez && start_at}
                    ></TimeField>
                  </Grid>
                </Grid>
                {/* 반납 날짜 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'return_at'} text={'반납 날짜'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TimeField
                      withMonth={true}
                      label={'반납 날짜'}
                      name={'return_at'}
                      onChange={(e) =>
                        handleTimeChange(e, 'return_at', setReturn_at)
                      }
                      timeValue={carRez && return_at}
                    ></TimeField>
                  </Grid>
                </Grid>
                {/* 목적지 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'dest'} text={'목적지'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="dest"
                      name="dest_loc"
                      type="text"
                      onChange={(e) => handleChangeLoc(e, setDest_loc)}
                      value={carRez ? dest_loc : formData.dest_loc}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DaumPost setAddressObj={setAddressObj} />
                  </Grid>
                </Grid>
                {/* 차량 찾기 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'detail'} text={'차량 찾기'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    {/* <Button onClick={handleOpenModal}>차량 찾기</Button> */}
                    <RectangleBtn
                      type={'button'}
                      text={'차량 찾기'}
                      sx={{
                        padding: '14px 12px',
                        backgroundColor: palette.grey['500']
                      }}
                      handlebtn={handleOpenModal}
                    />
                    <Modal
                      open={open}
                      handleModal={(e, reason) => handleCloseModal(reason)}
                      modalTitle={'차량 찾기'}
                      content={
                        <SubSideContents
                          setSelectedRows={setSelectedRows}
                          rezStart_at={rezStart_at}
                          rezReturn_at={rezReturn_at}
                        />
                      }
                      buttons={
                        <Grid
                          container
                          xs={12}
                          sx={{ m: '10px 0px' }}
                          justifyContent="center"
                          spacing={2}
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: '#BEBEBE',
                              backgroundColor: '#ffffff',
                              ':hover': {
                                backgroundColor: '#ffffff',
                                borderColor: '#BEBEBE'
                              },
                              margin: '0px 4px'
                            }}
                            onClick={handleCloseModal}
                          >
                            취소
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderColor: '#BEBEBE',
                              ':hover': {
                                backgroundColor: '#2065D1',
                                borderColor: '#BEBEBE'
                              },
                              margin: '0px 4px'
                            }}
                            onClick={carSelect}
                          >
                            선택
                          </Button>
                        </Grid>
                      }
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={4}>
            <Item>
              <Stack sx={{ rowGap: '10px' }}>
                <Box
                  display="flex"
                  marginTop="15px"
                  sx={{
                    width: '100%',
                    borderBottom: '3px solid black',
                    padding: '5px 0px'
                  }}
                  mb={1}
                >
                  <RectangleIcon
                    sx={{
                      color: 'black',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      width: '6px',
                      height: '6px'
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
                    차량 정보
                  </Typography>
                </Box>

                {/* 차종 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'car_name'} text={'차종'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="car_name"
                      type="text"
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.carVO.car_name
                      }
                      value={carDetail.car_name}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 차량 번호 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'car_code'} text={'차량 번호'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="car_code"
                      name="car_code"
                      type="text"
                      onChange={(e) => handleChange(e, setCar_code)}
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.carVO.car_code
                      }
                      value={carDetail.id}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 누적 주행 거리 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'accum_mileage'} text={'누적주행거리'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="accum_mileage"
                      type="text"
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.accum_mileage
                      }
                      value={carDetail.accum_mileage}
                      readOnly
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                {/* 권한 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'authority'} text={'권한'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="authority"
                      type="text"
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.carVO.authority
                      }
                      value={carDetail.authority}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 유종 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'fuel_type'} text={'유종'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="fuel_type"
                      type="text"
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.carVO.fuel_type
                      }
                      value={carDetail.fuel_type}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 연비 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'fuel_effciency'} text={'연비'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="fuel_effciency"
                      type="text"
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.fuel_effciency
                      }
                      value={carDetail.fuel_effciency}
                      readOnly
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞/ℓ</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                {/* 인수지 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'receipt_loc'} text={'인수지'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="receipt_loc"
                      name="receipt_loc"
                      type="text"
                      defaultValue={
                        carRez && carRez.rez.carDetailResponseVO.car_address
                      }
                      onChange={(e) => handleChange(e, setReceipt_loc)}
                      value={carDetail.car_address}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 반납지 */}
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'return_loc'} text={'반납지'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <Selectbox
                      name="return_loc"
                      key={returnLocList.key}
                      // onChange={handleChange}
                      // defaultValue={
                      //   carRez &&
                      value={carRez ? return_loc : formData.return_loc}
                      handleSelectBox={(e) => handleChange(e, setReturn_loc)}
                      menuList={returnLocList}
                    />
                  </Grid>
                </Grid>
                {/* 예상 주행 거리 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'est_mileage'} text={'예상주행거리'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="est_mileage"
                      name="est_mileage"
                      type="text"
                      onChange={(e) => handleChange(e, setEst_mileage)}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                      value={carRez ? est_mileage : formData.est_mileage}
                    />
                  </Grid>
                  <LoadingModal open={isLoading} />
                </Grid>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <Item>
              <Stack sx={{ rowGap: '10px' }}>
                <Box
                  display="flex"
                  marginTop="15px"
                  sx={{
                    width: '100%',
                    borderBottom: '3px solid black',
                    padding: '5px 0px'
                  }}
                  mb={1}
                >
                  <RectangleIcon
                    sx={{
                      color: 'black',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      width: '6px',
                      height: '6px'
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
                    운행 예상 정보
                  </Typography>
                </Box>
              </Stack>
            </Item>
          </Grid>
        </Grid>
        <BottomBox>
          {carRez !== null ? (
            <Button
              variant="contained"
              color="success"
              style={{ marginRight: '10px' }}
              onClick={updateRez}
            >
              수정
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              style={{ marginRight: '10px' }}
              type="submit"
            >
              예약
            </Button>
          )}

          <Button variant="outlined" color="error">
            Error
          </Button>
        </BottomBox>
      </form>
    </>
  );
};
export default Register;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 650
}));

const BottomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 5,
  marginRight: 16
}));

const NewFormControl = styled(FormControl)(({ theme }) => ({
  textAlign: 'left',
  margin: 7
}));

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
