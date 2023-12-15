const API_URL = 'http://localhost:3001/api';

const editCourse = async (newCourse,course_id) => {
    const url = `${API_URL}/v1/courses/${course_id}`; // Obtén el token del almacenamiento local
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json",
                "authorization": localStorage.getItem("token"),// Incluye el token en los encabezados de la solicitud
            },
            body: JSON.stringify(newCourse),
        });
        const data = await response.json();
        if (!response.ok) { throw data.error };
    } catch (error) {

        // Manejar el error y proporcionar retroalimentación al usuario
    };
}

export {editCourse};