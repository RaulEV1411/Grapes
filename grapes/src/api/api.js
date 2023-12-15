
const API_URL = 'http://localhost:3001/api';


const editCourse = async (newCourse, course_id) => {
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

const approveAdmin = async (idUser) => {
    const url = `${API_URL}/v1/users/${idUser}/approve_admin`; // Obtén el token del almacenamiento local
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUser })
        });

        const data = await response.json();
        if (!response.ok) { throw data.error }
    } catch (error) {
        // Manejar el error y proporcionar retroalimentación al usuario
    }
}

const userInfo = async (userId) => {
    const url = `${API_URL}/v1/users/${userId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
        },
    });
    if (!response.ok) {
        throw Error;
    }
    const data = await response.json();
    return data;
};

const getCourses = async (id) => {
        const response = await fetch(
            `http://localhost:3001//api/v1/courses/${id}/courses_by_subject`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                },
            }
        );
        if (!response.ok) {
            throw Error;
        }
        const data = await response.json();
        return data;
};



export { editCourse, approveAdmin, userInfo, getCourses };










