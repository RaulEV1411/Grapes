import {React,useState, useEffect} from 'react'
import CardContentCourse from '../CardContentCourse/CardContentCourse';
import { useParams } from 'react-router-dom';
import BackButton from '../Back Button/BackButton';

const ContentCourse = () => {
    const [contentCourse, setContentCourse] = useState([]);
    const { id } = useParams();

    const fetchContentCourse = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/contents/contents_by_course?course_id=${id}`, {
                method: 'GET',
                headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
                },
            });
    
            if (!response.ok) {
                throw new Error('Error fetching requests');
            }
    
            const data = await response.json();
            setContentCourse(data);
            console.log(data);
            } catch (error) {
            console.error(error);
            // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
            }
        };







        useEffect(() => {
        fetchContentCourse();
        }, []);
    
        return (
            <div>
                <div>
                    <BackButton />
                    <ul className="List-Course">
                        {contentCourse.map((contentC) => (
                            <li className="link" key={contentC.id}>
                                <CardContentCourse
                                    name={contentC.name}
                                    description={contentC.description}
                                    documentURL={contentC.pdf}
                                    imageUrls={contentC.img}
                                    videoURL={contentC.video}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
    
    export default ContentCourse;