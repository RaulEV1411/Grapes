// Definition of the base URL for API requests
const API_URL = 'http://localhost:3001/api';

// Function to edit a course using a PATCH request to the API
const editCourse = async (newCourse, course_id) => {
    // Build the specific URL to edit the course with the provided ID
    const url = `${API_URL}/v1/courses/${course_id}`;
    try {
        // Make the PATCH request to the server
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json",
                "authorization": localStorage.getItem("token"), // Include the token in the request headers
            },
            body: JSON.stringify(newCourse),
        });
        // Parse the JSON response
        const data = await response.json();
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) { throw data.error };
    } catch (error) {
        // Handle the error and log a message to the console
        console.error("Error:", error.message);
    };
}

// Function to approve a user as an administrator using a POST request to the API
const approveAdmin = async (idUser) => {
    // Build the specific URL to approve the administrator with the provided ID
    const url = `${API_URL}/v1/users/${idUser}/approve_admin`;
    try {
        // Make the POST request to the server
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUser })
        });
        // Parse the JSON response
        const data = await response.json();
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) { throw data.error }
    } catch (error) {
        // Handle the error and log a message to the console
        console.error("Error:", error.message);
    }
}

// Function to get information about a user using a GET request to the API
const userInfo = async (userId) => {
    // Build the specific URL to get information about the user with the provided ID
    const url = `${API_URL}/v1/users/${userId}`;
    try {
        // Make the GET request to the server
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw Error;
        }
        // Parse the JSON response and return it
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle the error and log a message to the console
        console.error("Error:", error.message);
    }
};

// ----------------------------------------

// Function to get courses by subject using a GET request to the API
const getCourses = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/v1/courses/${id}/courses_by_subject`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                },
            }
        );
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw Error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle the error and log it to the console
        console.error("Error:", error.message);
    }
};

// Function to reject a user request using a DELETE request to the API
const rejectRequest = async (idUserDelete) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/users/${idUserDelete}/decline_request`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUserDelete })
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw Error;
        }
    } catch (error) {
        // Log the error to the console
        console.log(error);
    }
};

// Function to perform user login using a POST request to the API
const login = async (userInfo) => {
    const url = "http://localhost:3001/login";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        localStorage.setItem("token", response.headers.get("Authorization"));
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) {
            throw new Error(data.error || "Authentication failed");
        }
    } catch (error) {
        // Log the error to the console
        console.error("Error:", error.message);
        // You can handle the error differently, for example, by displaying a message to the user
    }
};

// Function to perform user logout using a DELETE request to the API
const logout = async () => {
    try {
        const response = await fetch("http://localhost:3001/logout", {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
        })
        const data = await response.json()
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) { throw data.error }
        localStorage.removeItem("token")
    } catch (error) {
        // Log the error to the console
        console.log("error", error)
    }
}

// --------------------------------------------------------------2
// Function to obtain courses by teacher using a GET request to the API
const obtainCourseByTeacher = async (Id) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/courses/${Id}/courses_by_teacher`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw Error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle the error and log it to the console
        console.error("Error:", error.message);
    }
};

// Function to create new content using a POST request to the API
const newContent = async (formData) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/contents", {
            method: 'POST',
            headers: {
                "authorization": localStorage.getItem("token"), // Include the token in the request headers
            },
            body: formData,
        });
        const data = await response.json();
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) {
            throw data.error;
        }
        console.log(data, "it reaches here");
    } catch (error) {
        // Handle the error and provide feedback to the user
    };
}

// Function to create a new course using a POST request to the API
const newCourse = async (newCourse) => {
    const url = "http://localhost:3001/api/v1/courses"; // Get the token from local storage
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json",
                "authorization": localStorage.getItem("token"), // Include the token in the request headers
            },
            body: JSON.stringify(newCourse),
        });
        const data = await response.json();
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) {
            throw data.error;
        }
    } catch (error) {
        // Handle the error and provide feedback to the user
    };
}

// Function to fetch subjects using a GET request to the API
const fetchSubjects = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/v1/subjects', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching subjects');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Function to fetch user requests using a GET request to the API
const requestsByUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/requests/${id}/show_by_user`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        console.log(response)
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching requests');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Function to create a new request using a POST request to the API
/**
 * The function `newRequest` sends a POST request to a server with a given form data and authorization
 * token, and handles any errors that occur.
 * @param formData - The `formData` parameter is an object that contains the data to be sent in the
 * request body. It is typically used when submitting form data, such as file uploads or form inputs.
 * The `formData` object should be created using the `FormData` constructor and populated with
 * key-value pairs representing the form
 */
const newRequest = async (formData) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/requests", {
            method: "POST",
            headers: {
                authorization: localStorage.getItem("token"),
            },
            body: formData,
        });
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Error submitting request");
        }
    } catch (error) {
        console.error(error);
    }
}

// -----------------------------------------------3
/**
 * The `addPendingRole` function sends a request to the server to add a pending role for a user with
 * the specified ID.
//  * @param userId - The `userId` parameter is the unique identifier of the user for whom you want to add
 * a pending role.
 */// Function to add a pending admin role for a user using a POST request to the API
const addPendingRole = async (userId) => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/v1/users/${userId}/request_admin`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    id: userId,
                }),
            }
        );
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Error submitting request");
        }
        // Handle the successful response here
        console.log("Request sent successfully");
    } catch (error) {
        // Log the error to the console
        console.error(error);
    }
}

// Function to register a new user using a POST request to the API
const registerUser = async (userInfo) => {
    const url = "http://localhost:3001/signup";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        // If the response is not successful, throw an error with the error message provided by the server
        if (!response.ok) { throw data.error };
        localStorage.setItem('token', response.headers.get("Authorization"));
        console.log(data, "it reaches here");
    } catch (error) {
        // Log the error to the console and handle it, providing feedback to the user
        console.error("Error:", error);
    }
};

// Function to fetch pending requests using a GET request to the API
const pendingRequests = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/requests/index_request_pending`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching requests');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the error to the console and handle it, providing feedback to the user
        console.error(error);
    }
};

// Function to fetch approved requests using a GET request to the API
const approvedRequests = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/requests/index_request_approved`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching requests');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the error to the console and handle it, providing feedback to the user
        console.error(error);
    }
};

// Function to fetch all users using a GET request to the API
const allUsers = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/v1/users', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching subjects');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the error to the console and handle it, providing feedback to the user
        console.error(error);
    }
};

// -----------------------------------------4
// Function to fetch requests information for a specific user using a GET request to the API
const requestsInformationByUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/requests/${id}/show_by_user`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // Log the response to the console
        console.log(response)
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching requests');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the error to the console
        console.error(error);
    }
};

// Function to fetch all requests using a GET request to the API
const fetchRequests = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/requests`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
            },
        });
        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Error fetching requests');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the error to the console
        console.error(error);
    }
};

export { editCourse, approveAdmin, userInfo, getCourses, rejectRequest, login, logout, obtainCourseByTeacher, newContent, newCourse, fetchSubjects, requestsByUser, newRequest, addPendingRole, registerUser, pendingRequests, approvedRequests, allUsers, requestsInformationByUser, fetchRequests };

