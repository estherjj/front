import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import TimeField from '../../components/common/TimeField';
import MrTag from './MrTag';
import Modal from '../common/Modal';
import DashBoard from '../../pages/mr_admin/DashBoard';
import axios from 'axios';

const MrRegistForm = () => {
  /*-------------------------------입력폼 제어--------------------------------------------*/
  const [mr_name, setMr_name] = useState('');
  const [location, setLocation] = useState('');
  const [maximum_capacity, setMaximum_capacity] = useState('');
  const handleMrName = (event) => {
    setMr_name(event.target.value);
  };
  const handleLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleMaximum_capacity = (event) => {
    setMaximum_capacity(event.target.value);
  };
  /*-----------------------------------------------------------------------------------------*/
  /*------------------------------회의실 분류-----------------------------*/
  const [mrType, setMrType] = useState('');
  const handleSelectChange = (event) => {
    setMrType(event.target.value);
  };
  /*------------------------------------------------------------------------*/
  /*----------------------------회의실 키워드------------------------*/
  //회의실 키워드 선택 값
  const [selectedTags, setSelectedTags] = useState([]);
  /**회의실 키워드 선택된 값 */
  const handleTagSelect = (tags) => {
    setSelectedTags(tags);
  };
  /*---------------------------------------------------------------------*/
  /*----------------------------모달------------------------------------*/
  // 모달창 열림 여부 값
  const [open, setOpen] = useState(false);
  // 모달창 열림닫힘 이벤트
  const handleModal = () => setOpen(!open);
  /*--------------------------------------------------------------------*/
  /*-------------------------요일 컨트롤--------------------------------------- */
  /**요일 매핑 */
  const dayMappings = {
    월: 0,
    화: 1,
    수: 2,
    목: 3,
    금: 4,
    토: 5
  };
  const [selectedDays, setSelectedDays] = useState([
    '월',
    '화',
    '수',
    '목',
    '금'
  ]); // 배열로 선택된 요일을 저장

  // 선택된 요일 배열을 숫자 값으로 변환하여 mr_op_day 배열 생성
  const mr_op_day = selectedDays.map((day) => ({ day: dayMappings[day] }));
  /** 배열로 선택된 요일을 저장*/
  const [showTimeField, setShowTimeField] = useState(false); // 기간 선택을 보여줄지 여부
  const [value, setValue] = useState('종일');
  const [checked, setChecked] = useState(false);
  /**선택된 요일 관리 */
  const handleDayToggle = (day) => {
    let newSelectedDays;
    if (selectedDays.includes(day)) {
      // 이미 선택된 요일인 경우, 선택 해제
      newSelectedDays = selectedDays.filter(
        (selectedDay) => selectedDay !== day
      );
    } else {
      // 선택되지 않은 요일인 경우, 선택
      newSelectedDays = [...selectedDays, day];
    }
    setSelectedDays(newSelectedDays);
    // 선택된 요일을 출력
    console.log('선택된 요일: ', newSelectedDays);
  };
  /**상태를 토글하여 보이기/숨기기 */
  const toggleTimeField = () => {
    setShowTimeField(!showTimeField); // 상태를 토글하여 보이기/숨기기
  };
  /**기간 선택을 누를 시 뜨는 datepicker */
  const handleChange = (event) => {
    setValue(event.target.value);
    setChecked((prev) => !prev);
    if (event.target.value === '기간 선택') {
      setShowTimeField(true);
    } else {
      setShowTimeField(false);
    }
  };
  /**회의실 등록 버튼 클릭 이벤트 */
  const handleSubmit = () => {
    axios.post('http://localhost:8081/mr/mrRegister', FormToData).then(() => {
      alert('회의실이 등록되었습니다.');
    });
  };
  /*----------------------------------------------------------------------------- */
  /*-------------------------------FormToData------------------------------------------- */
  const FormToData = {
    mr_name,
    maximum_capacity,
    location,
    mr_type: mrType,
    mr_keyword: selectedTags,
    mr_op_day: mr_op_day // 변환된 요일 배열 사용
  };
  /*-------------------------------------------------------------------------------------- */

  return (
    <Item
      sx={{
        '& .MuiTextField-root': {
          width: '100%',
          backgroundColor: '#f5f5f5'
        }
      }}
    >
      <Stack spacing={1}>
        <TextField
          id="outlined-basic"
          label="회의실명"
          variant="outlined"
          value={mr_name}
          onChange={handleMrName}
        />
        <TextField
          id="outlined-basic"
          label="위치"
          variant="outlined"
          value={location}
          onChange={handleLocation}
        />
        <TextField
          id="outlined-basic"
          label="최대 수용 인원"
          variant="outlined"
          value={maximum_capacity}
          onChange={handleMaximum_capacity}
        />
        {/* 요일 영역 */}
        <Grid container spacing={1}>
          {daysOfWeek.map((day, index) => (
            <Grid key={index} item xs>
              <label>
                <Checkbox
                  checked={selectedDays.includes(day)} // 요일이 선택되었는지 확인
                  onChange={() => handleDayToggle(day)} // 체크박스 토글 함수 호출
                  // style={{ visibility: 'hidden' }} // 체크박스는 숨김 처리
                  color={selectedDays.includes(day) ? 'primary' : 'default'} // 스타일 색상 변경
                />
                <span>{day}</span> {/* 텍스트 */}
              </label>
            </Grid>
          ))}
        </Grid>
        {/* 회의실 분류 영역 */}
        <FormControl fullWidth sx={{ backgroundColor: '#f5f5f5' }}>
          <InputLabel id="demo-simple-select-label">회의실 분류</InputLabel>
          <Select
            value={mrType}
            label="회의실 분류"
            onChange={handleSelectChange}
          >
            <MenuItem value="미팅룸">미팅룸</MenuItem>
            <MenuItem value="소회의실">소회의실</MenuItem>
            <MenuItem value="중회의실">중회의실</MenuItem>
            <MenuItem value="대회의실">대회의실</MenuItem>
          </Select>
        </FormControl>
        {/* 기간 선택 영역 */}
        <Grid spacing={2}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography ml={1}>기간 선택</Typography>
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  value="종일"
                  control={<Radio />}
                  label="종일"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  value="기간 선택"
                  control={<Radio />}
                  label="기간 선택"
                  labelPlacement="end"
                  onClick={toggleTimeField}
                />
              </Grid>
            </Grid>
          </RadioGroup>
          {/* 날짜 선택시 콜랩스 영역 */}
          <Collapse in={checked}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TimeField withMonth={true} label={'시작 시간'} />
              </Grid>
              <Grid item xs={6}>
                <TimeField withMonth={true} label={'종료 시간'} />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        {/* 회의실 분류 영역 */}
        <MrTag onTagSelect={handleTagSelect} />
        {/* 회의실 사진 업로드 */}
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          회의실 사진
          <VisuallyHiddenInput type="file" />
        </Button>
        {/* 기본 비품 버튼 영역 */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Typography>기본 비품</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              component="label"
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleModal}
            >
              <ControlPointOutlinedIcon />
            </IconButton>
            <Modal
              open={open}
              modalTitle={'비품 항목'}
              handleModal={handleModal}
              content={<ModalContentExample />}
              buttons={<ModalActionBtns />}
            />
          </Grid>
        </Grid>
        {/* 회의실 사진들 */}
        <ImageList sx={2} cols={3} rowHeight={180}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
        {/* 회의실 등록 버튼 */}
        <Button variant="outlined" onClick={handleSubmit}>
          회의실 등록
        </Button>
      </Stack>
    </Item>
  );
};

export default MrRegistForm;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  }
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%'
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});
const daysOfWeek = ['월', '화', '수', '목', '금', '토'];

const ModalActionBtns = () => {
  const handleSaveBtn = () => {
    console.log('save 누름');
  };
  const handleCancelBtn = () => {
    console.log('cancel 누름');
  };

  return (
    <Box>
      <Button color="primary" onClick={handleSaveBtn}>
        Save
      </Button>
      <Button color="secondary" onClick={handleCancelBtn}>
        Cancel
      </Button>
    </Box>
  );
};

const ModalContentExample = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <DashBoard />
    </Box>
  );
};
