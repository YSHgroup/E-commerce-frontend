import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import api from "../../lib/api";

const SubscribeEmail = () => {
  const [status, setStatus] = useState('initial');
  const [message, setMessage] = useState('');

  const validate = (email) => {
    if (!email) {
      return 'Please enter email';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return 'Invalid email';
    }

    return 1;
  }

  const onKeyDown = (e) => {
    setStatus('initial');

    if (e.code == 'Enter') {
      submit();
    }
  }
 
  const submit = async () => {
    const emailInput = document.getElementById('mc-form-email');
    const email = emailInput.value;

    const validated = validate(email);

    if (typeof validated == 'string') {
      setMessage(validated);
      setStatus('error');
      return false;
    }
    setMessage('');
    setStatus('sending');

    await api().get('/sanctum/csrf-cookie');
    const { data: response } = await api().post('/api/v1/subscribe', { email });

    if (response.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setMessage(response.message);
    }
    

    emailInput.value = "";
  };

  return (
    <div className="subscribe-form">
      <div className="mc-form position-relative">
        <input
          id="mc-form-email"
          className="email"
          type="email"
          placeholder="Your email address"
          onKeyDown={onKeyDown}
        />
        <button className="button" onClick={submit}>
          <IoIosArrowRoundForward />
        </button>
      </div>

      {status === "sending" && (
        <div
          style={{
            color: "#3498db",
            fontSize: "14px",
            marginTop: "15px",
            lineHeight: "1.3"
          }}
        >
          sending...
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            color: "#e74c3c",
            fontSize: "14px",
            marginTop: "15px",
            lineHeight: "1.3"
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{
            color: "#2e9c31",
            fontSize: "14px",
            marginTop: "15px",
            lineHeight: "1.3"
          }}
        >
          Thank you for subscribe!
        </div>
      )}
    </div>
  );
};

export default SubscribeEmail;
