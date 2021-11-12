import React from 'react';
import {Container} from 'reactstrap';

import CourseForm from '../components/CourseForm';

const ViewCourse = (props) => {
    const {errors, setErrors} = props;

    return(
        <Container>
            <h4>Course Details</h4><br/>
            <CourseForm errors={errors} />
        </Container>
    )
}

export default ViewCourse;