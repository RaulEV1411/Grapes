import jwtDecode from 'jwt-decode';

const ApproveButton = () => {
    const submitRequest = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.sub;

        const response = await fetch(`http://localhost:3001/${userId}/approve_admin`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <button onClick={submitRequest}>Approve</button>
        </div>
    );
};

export default ApproveButton;