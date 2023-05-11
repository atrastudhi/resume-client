import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import service from './common/service/base_service';
import OverallComponent from './components/overall/overall.component';
import ExperienceComponent from './components/experience/experience.component';
import SkillComponent from './components/skill/skill.component';
import ProjectComponent from './components/project/project.component';
import EducationComponent from './components/education/education.component';

function App() {
  const [overall, setOverall] = useState({});

  useEffect(() => {
    getOverallData();
  }, []);

  const getOverallData = async () => {
    try {
      const { data } = await service.get('/overall');
      setOverall(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <OverallComponent overall={overall} refreshData={getOverallData} />
      <Row>
        <Col span={9} offset={4}>
          <ExperienceComponent experiences={overall && overall.experiences ? overall.experiences : []} refreshData={getOverallData} />
          <ProjectComponent projects={overall && overall.projects ? overall.projects : []} refreshData={getOverallData} />
          <EducationComponent educations={overall && overall.educations ? overall.educations : []} refreshData={getOverallData} />
        </Col>
        <Col span={4} offset={3}>
          <SkillComponent skills={overall && overall.skills ? overall.skills : []} refreshData={getOverallData} />
        </Col>
      </Row>
    </>
  );
}

export default App;
