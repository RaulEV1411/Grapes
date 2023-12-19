import {React,useState, useEffect} from 'react'
import CardContentCourse from '../CardContentCourse/CardContentCourse';
import {  useParams } from 'react-router-dom';
import BackButton from '../Back Button/BackButton';
import './styles.css';
const ContentCourse = () => {
    const [contentCourse, setContentCourse] = useState([]);
    const { id } = useParams();

    const fetchContentCourse = async () => {
        try {
        // A GET request is sent to the '/api/v1/contents/contents_by_course' endpoint.
        // The 'course_id' query parameter is set to the 'id' from the URL parameters.
        // The 'authorization' header is set to the token stored in local storage.
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
            } catch (error) {
            console.error(error);
            // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
            }
        };

        // The 'useEffect' hook is used to call the 'fetchContentCourse' function when the component mounts.
        // The empty dependency array means that the effect will only run once, when the component mounts.
        useEffect(() => {
        fetchContentCourse();
        }, []);
    
        return (
            <div>
                <div>
                    <BackButton />
                    <ul className="List-Course">
                        {contentCourse.map((contentC) => (
                            <li className="link_content" key={contentC.id}>
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