import React  from 'react';

const NewContentForm = () => {
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    
    
    const submitContent = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target); // Obtén el token del almacenamiento local
        try {
            const response = await fetch("http://localhost:3001/api/v1/contents", {
                method: 'POST',
                headers: {
                    "authorization" :localStorage.getItem("token"),// Incluye el token en los encabezados de la solicitud
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) { throw data.error };
            console.log(data, "si llega")
        } catch (error) {

            // Manejar el error y proporcionar retroalimentación al usuario
        };
    };


    return (
    <div>
    
        <form className="formularioUvas" onSubmit={submitContent}>

            <div className="campo">
                <p>nombre</p>
                <label htmlFor="content[name]"></label>
                <input className="campoTexto" type="text" id="content[name]" name="content[name]" required />
            </div>

            <div className="campo">
                <p>descricion</p>
                <label htmlFor="content[description]"></label>
                <input className="campoTexto" type="text" id="content[description]" name="content[description]" required />
            </div>

            <div className="campo">
                <p>images</p>
                <label htmlFor="content[img]"></label>
                <input className="campoTexto" type="file" id="content[img]" name="content[img]" required />
            </div>
        
            <div className="campo">
                <p>Videos</p>
                <label htmlFor="content[video]"></label>
                <input className="campoTexto" type="file" id="content[video]" name="content[video]" required />
            </div>

            <div className="campo">
            <p>pdf</p>
                <label htmlFor="content[pdf]"></label>
                <input className="campoTexto" type="file" id="content[pdf]" name="content[pdf]" required />
            </div>

            <div>
                <button type="submit" className="submit">
                    <span className="text">Submit</span>
                </button>
            </div>
                </form>
    </div>
);
};

export default NewContentForm;