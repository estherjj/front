import React, { useEffect } from 'react';
import Editor from '../../components/mr_admin/Editor';
import SubHeader from '../../components/common/SubHeader';
import { TextField, Select, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
import OnOffSwitch from '../../components/mr_admin/OnOffSwitch';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../../components/common/RectangleBtn';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer2 from '../../components/mr_admin/MainContainer2';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
const MrNotice = () => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('<p>테스트</p>');
  const [isPublic, setIsPublic] = useState(true); // OnOff 스위치의 상태를 관리
  const [notice_title, setNotice_title] = useState('');
  const [template, setTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const mem_code = useSelector((state) => state.user.mem_code);

  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };
  /**공개 비공개 여부 체크 */
  const handleSwitchChange = (event) => {
    setIsPublic(event.target.checked);
  };
  /**공지사항에 들어가야하는 데이터 */
  const FormtoData = {
    contents: editorData,
    is_opened: isPublic ? 0 : 1,
    notice_title,
    mem_code
  };
  /**공지사랑 등록 버튼 이벤트 */
  const handleClick = () => {
    axiosInstance.axiosInstance
      .post('/mr/notice', FormtoData)
      .then(() => {
        handleOpenSnackbar();
        handleSetSnackbarContent('공지사항이 등록되었습니다.');
        navigate('../NoticeList');
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    // console.log('텍스트:' + editorData);
    // console.log('공개 여부: ' + isPublic); // OnOff 스위치 상태 출력
  };

  /**템플릿을 선택할때의 이벤트 */
  const handleSelectChange = (event) => {
    const selectedTemplate = template.find(
      (item) => item.type === event.target.value
    );
    console.log(selectedTemplate);
    if (selectedTemplate) {
      setSelectedTemplate(selectedTemplate);
    }
  };
  /**에디터에 데이터가 바뀔때 쓰는 함수 */
  const handleEditorChange = (content) => {
    setEditorData(content);
  };
  /**템플릿을 불러오는 useEffect */
  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/mr/template')
      .then((res) => {
        // console.log(res.data);
        setTemplate(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);

  return (
    <>
      <SubHeader title={'공지사항 작성'} />
      <MainContainer2>
        <WrapContainer bgcolor={'#fff'}>
          <Grid container spacing={1} sx={{ display: 'flex' }}>
            <Grid item container spacing={2}>
              {/* <StyledLabelGrid item xs={1}>
                <Label htmlFor={'title'} text={'제목'} />
              </StyledLabelGrid> */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="제목"
                  variant="outlined"
                  sx={{ width: '100%', backgroundColor: '#f5f5f5' }}
                  placeholder="제목을 입력하세요"
                  onChange={(e) => {
                    setNotice_title(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex' }}>
                <OnOffSwitch checked={isPublic} onChange={handleSwitchChange} />
              </Grid>
              <Grid item container xs={5}></Grid>
              <Grid item container xs={3}>
                <StyledSelect onChange={handleSelectChange} displayEmpty>
                  <MenuItem defaultValue="" disabled>
                    탬플릿 선택
                  </MenuItem>
                  {template.map((item) => (
                    <MenuItem key={item.template_code} value={item.type}>
                      {item.type}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </Grid>
              <Grid item xs={2}>
                <RectangleBtn
                  category={'register'}
                  type={'submit'}
                  text={'작성 완료'}
                  sx={{
                    width: '100%'
                  }}
                  handlebtn={handleClick}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  onEditorChange={handleEditorChange}
                  defaultEditorData={editorData}
                  selectedTemplate={selectedTemplate}
                />
              </Grid>
            </Grid>
          </Grid>
        </WrapContainer>
      </MainContainer2>
    </>
  );
};

export default MrNotice;
// index,value

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '&.MuiInputBase-root': {
    width: '100%'
  }
}));
// const template = [
//   {
//     template_code: 'NT001',
//     type: '회의실 긴급 추가',
//     contents:
//       '<h2>안녕하세요, OOO입니다.</h2><p>최근 특정 요일에 회의실이 몰리는 것을 확인했습니다.</p><p>이에 회의실 OOO을 추가했습니다.</p><p>위치는 OOO에 있습니다.</p><p>많은 사용 부탁드립니다.</p><p>감사합니다.&nbsp;</p>'
//   }
// ];
