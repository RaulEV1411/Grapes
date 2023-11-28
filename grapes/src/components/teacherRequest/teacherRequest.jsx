import React, { useRef } from 'react';

const RequestForm = ({ setSuccessMessage, setErrorMessage }) => {
  const formRef = useRef();

  const submitRequest = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('request[identification_number]', formRef.current['identification_number'].value);
    formData.append('request[subject_id]', formRef.current['subject_id'].value);
    formData.append('request[id_person]', formRef.current['id_person'].files[0]);
    formData.append('request[person_photo]', formRef.current['person_photo'].files[0]);
    formData.append('request[title_photo]', formRef.current['title_photo'].files[0]);
    formData.append('request[cv]', formRef.current['cv'].files[0]);

    try {
      const response = await fetch('http://localhost:3001/api/v1/requests', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error submitting request');
      }

      setSuccessMessage('Request submitted successfully');
    } catch (error) {
      console.log("error")
    }
  };

  return (
    <form ref={formRef} onSubmit={submitRequest}>
      <input name="identification_number" type="text" placeholder="Identification Number" required />
      <input name="subject_id" type="text" placeholder="Subject ID" required />
      <input name="id_person" type="file" required />
      <input name="person_photo" type="file" required />
      <input name="title_photo" type="file" required />
      <input name="cv" type="file" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestForm;