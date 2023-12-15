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

        const updateContentCourse = async (contentId, updatedData) => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/contents/${id}`, {
                    method: 'PUT',
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(updatedData),
                });
        
                if (!response.ok) {
                    throw new Error('Error updating content');
                }
        
                const updatedContent = await response.json();
                // Puedes hacer algo con la respuesta actualizada si es necesario.
                console.log('Contenido actualizado:', updatedContent);
            } catch (error) {
                console.error(error);
            }
        };
        
        const handleEdit = (contentId, updatedData) => {
        updateContentCourse(contentId, updatedData);
        // Realizar otras operaciones después de la edición si es necesario.
    };


        const deleteContentCourse = async (contentId) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/contents/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting content');
        }

        // Puedes hacer algo con la respuesta si es necesario.
        console.log('Contenido eliminado correctamente');
    } catch (error) {
        console.error(error);
    }
};   

    const handleDelete = (contentId) => {
    deleteContentCourse(contentId);
    // Realizar otras operaciones después de la eliminación si es necesario.
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
                                <div>
                                    {/* Botón de Editar */}
                                    <button onClick={() => handleEdit(contentC.id, /* datos actualizados */)}>
                                        Editar
                                    </button>
                                    {/* Botón de Eliminar */}
                                    <button onClick={() => handleDelete(contentC.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
    
    export default ContentCourse;