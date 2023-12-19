import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { LayoutFullSize } from '../components/Layout';

import { logIn, registerSuccess } from '../lib/auth';
import jsonp from 'jsonp';

import api from '../lib/api';
import { countries } from '../lib/common';
import { Fragment, useEffect, useState } from 'react';
import Guast from '../components/Guast';

const LoginPage = () => {
  const [isSignInFormShown, setIsSignInFormShown] = useState(true);

  const [busy, setBusy] = useState(false);

  const [bgImage, setBgImage] = useState({});

  const getBgImage = () => {
    api()
      .get('/api/v1/loginPageBackground')
      .then(response => setBgImage(response.data));
  }

  useEffect(() => {
    getBgImage();
  }, []);

  return (
    <LayoutFullSize
      busy={busy}
      bgImage={bgImage}
      showSignInAdv={true}
      additionalClass='login-page'
    >
      {/* Page Title */}
      <Head>
        <title>Login | 3d Infinite</title>
      </Head>

      <div className='login-area'>
        <Container fluid={'sm'}>
          <Row>
            {isSignInFormShown
              ? <SignInForm callback={setIsSignInFormShown} />
              : <RegisterForm callback={setIsSignInFormShown} />}
          </Row>
        </Container>
      </div>
    </LayoutFullSize>
  );
};

const SignInForm = ({ callback }) => {
  const [busy, setBusy] = useState(false);
  const [shownField, setShownField] = useState('email');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberChecked, setIsRememberChecked] = useState(true);

  const [signinFormInput, setSignInFormInput] = useState({
    email: '',
    password: '',
    remember: 1,
  });

  const [signInErrors, setSignInErrors] = useState({
    email: [],
    password: [],
  });

  const updateSignInFormInput = (e) => {
    e.persist();

    setSignInFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.getAttribute('type') == 'checkbox'
        ? (e.target.checked ? '1' : '')
        : e.target.value,
    }));
    setSignInErrors({ email: [], password: [] });
  };

  const togglePasswordVisibility = e => {
    setShowPassword(!showPassword);
    return false;
  }

  const toggleRememberCheckbox = e => {
    setIsRememberChecked(!isRememberChecked);
  }

  const returnToEmailField = e => {
    e.preventDefault();
    setSignInErrors({ email: [], password: [] });
    setSignInFormInput({ email: [], password: [] });
    setShownField('email');
  }

  const onFormSubmit = e => {
    e.preventDefault();

    shownField == 'email' ? checkEmail(e) : signIn(e);
  }

  const checkEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        api()
          .post('/check-email', signinFormInput)
          .then((response) => {
            if (response.data.errors) {
              setRegisterErrors(error.response.data.errors);
            } else {
              setShownField('password');
            }
          })
          .catch((error) => {
            console.log(error);
            error?.response?.data?.errors && setSignInErrors(error.response.data.errors);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        api()
          .post('/apilogin', signinFormInput)
          .then((response) => {
            if (response.data.errors) {
              setRegisterErrors(error.response.data.errors);
              setLoading(false);
            } else {
              logIn();
            }
          })
          .catch((error) => {
            console.log(error);
            error?.response?.data?.errors && setSignInErrors(error.response.data.errors);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  const switchToRegisterForm = (e) => {
    e.preventDefault();
    callback(false);
    return false;
  }

  return (
    <Col xl={9} className='col-12 mx-auto'>
      <div className='dashlite-form card login-form'>
        <Row className='login-form--inner-wrapper'>
          <Col lg={12}>
            <h2 className='space-mb--20 form--header'>
              {shownField == 'email' ? 'Sign in' : 'Enter your password'}
            </h2>
          </Col>
          <Col>
            <form onSubmit={onFormSubmit}>
              {shownField == 'email' ? <div className='space-mb--15'>
                <div className='space-mb--20'>
                  <p className="hint">
                    New user?{' '}
                    <a
                      href='#'
                      className='mt-2 link'
                      onClick={switchToRegisterForm}
                    >
                      Create an account
                    </a>
                  </p>
                </div>
                <label htmlFor='loginEmail'>
                  Email address
                </label>
                <input
                  id='loginEmail'
                  type='text'
                  name='email'
                  className={`form-control${signInErrors.email?.length ? ' has-error' : ''}`}
                  onChange={updateSignInFormInput}
                />

                {signInErrors.email && (
                  <div className='field-error'>
                    <span>{signInErrors.email[0]}</span>{' '}
                    {signInErrors.email?.length && signInErrors.email[0].indexOf("We couldn't find an account") === 0
                      ? <a
                          href='#'
                          className='small-link'
                          onClick={switchToRegisterForm}
                        >
                          Create an account
                        </a>
                      : ''}
                  </div>
                )}
              </div> : ''}
              {shownField == 'password' ? <div className='space-mb--15'>
                <div className="profile-info">
                  <div className="user-avatar">
                    <em className="icon ni ni-user-alt"></em>
                  </div>
                  <div className="profile-details">
                    <div className="profile-type">
                      Personal Account
                    </div>
                    <div className="profile-email">
                      {signinFormInput.email}
                    </div>
                  </div>
                </div>
                <div className={`password-field${signInErrors.password?.length ? ' has-error' : ''}`}>
                  <label htmlFor='loginPassword'>
                    Password
                  </label>
                  <div className="password-field--inner-wrapper">
                    <input
                      id='loginPassword'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      className={`form-control password-input${signInErrors.password?.length ? ' has-error' : ''}`}
                      onChange={updateSignInFormInput}
                    />
                    <span className="password-input--border"></span>
                    <button
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="password-visibility-toggle-button"
                      onClick={togglePasswordVisibility}
                      key='password-toggle-button'
                      type='button'
                    >
                      <svg
                        viewBox="0 0 36 36"
                        focusable="false"
                        aria-hidden="true"
                        role="img"
                        className="password-visibility-toggle-icon"
                      >
                        {showPassword
                          ? <Fragment>
                              <path d="M24.613 8.58A14.972 14.972 0 0 0 18 6.937c-8.664 0-15.75 8.625-15.75 11.423 0 3 7.458 10.7 15.686 10.7 8.3 0 15.814-7.706 15.814-10.7 0-2.36-4.214-7.341-9.137-9.78zM18 27.225A9.225 9.225 0 1 1 27.225 18 9.225 9.225 0 0 1 18 27.225z"></path>
                              <path d="M20.667 18.083A2.667 2.667 0 0 1 18 15.417a2.632 2.632 0 0 1 1.35-2.27 4.939 4.939 0 0 0-1.35-.209A5.063 5.063 0 1 0 23.063 18a4.713 4.713 0 0 0-.175-1.2 2.625 2.625 0 0 1-2.221 1.283z"></path>
                            </Fragment>
                          : <Fragment>
                              <path d="M14.573 9.44A9.215 9.215 0 0 1 26.56 21.427l2.945 2.945c2.595-2.189 4.245-4.612 4.245-6.012 0-2.364-4.214-7.341-9.137-9.78A14.972 14.972 0 0 0 18 6.937a14.36 14.36 0 0 0-4.989.941z"></path>
                              <path d="M33.794 32.058L22.328 20.592A5.022 5.022 0 0 0 23.062 18a4.712 4.712 0 0 0-.174-1.2 2.625 2.625 0 0 1-2.221 1.278A2.667 2.667 0 0 1 18 15.417a2.632 2.632 0 0 1 1.35-2.27 4.945 4.945 0 0 0-1.35-.209 5.022 5.022 0 0 0-2.592.734L3.942 2.206a.819.819 0 0 0-1.157 0l-.578.579a.817.817 0 0 0 0 1.157l6.346 6.346c-3.816 2.74-6.3 6.418-6.3 8.072 0 3 7.458 10.7 15.686 10.7a16.455 16.455 0 0 0 7.444-1.948l6.679 6.679a.817.817 0 0 0 1.157 0l.578-.578a.818.818 0 0 0-.003-1.155zM18 27.225a9.2 9.2 0 0 1-7.321-14.811l2.994 2.994A5.008 5.008 0 0 0 12.938 18 5.062 5.062 0 0 0 18 23.063a5.009 5.009 0 0 0 2.592-.736l2.994 2.994A9.144 9.144 0 0 1 18 27.225z"></path>
                            </Fragment>
                        }
                      </svg>
                    </button>
                  </div>
                  {signInErrors.password && (
                    <div className='field-error'>
                      <span>{signInErrors.password[0]}</span>
                    </div>
                  )}
                </div>
              </div> : ''}
            </form>
          </Col>
          <Col lg={12} className='button-container'>
            <div>
              {shownField == 'password'
                ? <label
                    className="toggle-switch"
                    onClick={toggleRememberCheckbox}
                  >
                    <input
                      type="checkbox"
                      className="toggle-switch--input"
                      value="1"
                      checked={isRememberChecked}
                      name="remember"
                      onChange={updateSignInFormInput}
                    />
                    <span className="toggle-switch--switch"></span>
                    <span className="toggle-switch--label">
                      Stay signed in
                    </span>
                  </label>
                : ''}
            </div>
            <button
              className='btn-continue'
              onClick={shownField == 'email' ? checkEmail : signIn}
              disabled={loading || signInErrors.email?.length || signInErrors.password?.length}
              key='submit-button-signin'
              type='submit'
            >
              {loading
                ? <div className="circle-loader" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-hidden="true">
                    <div className="track"></div>
                    <div className="fills">
                      <div className="mask1">
                        <div className="sub-mask1">
                          <div className="fill"></div>
                        </div>
                      </div>
                      <div className="mask2">
                        <div className="sub-mask2">
                          <div className="fill"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                : ''
              }
              <span>Continue</span>
            </button>
          </Col>
        </Row>
        {shownField == 'password'
          ? <Row>
              <Col>
                <div className='footer-with-separator'>
                  <a
                    href='https://admin.3dinfinite.com/forgot-password'
                    className='forgot-password-link'
                  >
                    Reset your password
                  </a>
                  <a
                    href='#'
                    className='navigate-back'
                    onClick={returnToEmailField}
                  >
                    Sign in to a different account
                  </a>
                </div>
              </Col>
            </Row>
          : ''}
      </div>
    </Col>
  )
}

const RegisterForm = ({ callback }) => {
  const fields = {
    // field name: Field label
    email: 'Email',
    first_name: 'First name',
    last_name: 'Last name',
    password: 'Password',
    country: 'Country'
  };

  const errorMessages = {
    email_required: 'Please enter an email address.',
    email_invalid: 'That\'s an invalid email.',
    email_exists: 'An account with this email address already exists.',
    first_name_required: 'Please enter your first name.',
    last_name_required: 'Please enter your last name.',
    password_invalid: 'That\'s an invalid password.',
    country_required: 'Please specify your country.',
  };

  const [registerFormInput, setRegisterFormInput] = useState(
    // create new object with field names as keys and bool false as values
    Object.assign({}, ...Object.keys(fields).map(key => ({ [key]: false })))
  );
  useEffect(() => { clientValidation(registerFormInput) }, [
    registerFormInput,
    triedToSubmit
  ]);

  const [registerErrors, setRegisterErrors] = useState(
    // create new object with field names as keys and empty array as values
    Object.assign({}, ...Object.keys(fields).map(key => ({ [key]: [] })))
  );

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [currentField, setCurrentField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserCountryCodeByIP();
    
    const onClick = () => {
      setShowCountriesDropdown(false);
    };
    document.body.addEventListener("click", onClick);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, []);

  let delayedClientValidation = null;

  const getUserCountryCodeByIP = () => {
    jsonp('https://ipinfo.io/?token=' + process.env.IPINFO_TOKEN, (error, data) => {
      if (error) {
        console.log('error:', error);
      } else {
        setRegisterFormInput(prevState => ({
          ...prevState,
          country: data.country.toLowerCase(),
        }));
      }
    });
  };

  const togglePasswordVisibility = e => {
    setShowPassword(!showPassword);
    return false;
  }

  const toggleCountriesDropdownVisibility = e => {
    e && e.stopPropagation();
    setShowCountriesDropdown(!showCountriesDropdown);
    return false;
  }

  const clientValidation = (inputs) => {
    let isFormValid = true;

    // create empty errors object of arrays with field names as keys
    let errors = Object.assign({}, ...Object.keys(fields).map(key => ({ [key]: [] })));

    // check required fields first of all
    const requiredFields = Object.keys(fields);
    requiredFields.forEach(key => {
      if (!inputs[key]) {
        errors[key].push(key + '_required');
        isFormValid = false;
      }
    });

    // check valid email
    const validEmailRegex =
      RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (inputs.email && !validEmailRegex.test(inputs.email)) {
      errors.email.push('email_invalid');
      isFormValid = false;
    }

    if (inputs.password.length) {
      // check minimal password length
      if (inputs.password.length < 8) {
        errors.password.push('at_least_8');
        isFormValid = false;
      }

      // password should contain both lower (a-z) and upper case letters (A-Z)
      if (!inputs.password.match(/[a-z]/) || !inputs.password.match(/[A-Z]/)) {
        errors.password.push('lower_and_upper');
        isFormValid = false;
      }

      // password should contain at least one digit or a symbol
      if (!inputs.password.match(/[0-9]/) || !inputs.password.match(/[a-zA-Z]/)) {
        errors.password.push('one_number_or_symbol');
        isFormValid = false;
      }

      const [firstPart, secondPart] = inputs.email?.length ? inputs.email.toLowerCase().split('@') : ['', ''];
      
      if (firstPart?.length && inputs.password.toLowerCase().indexOf(firstPart) > -1
          || secondPart?.length && inputs.password.toLowerCase().indexOf(secondPart) > -1) {
        errors.password.push('not_contains_email');
        isFormValid = false;
      }
    }

    // check country
    if (inputs.country === '0') {
      errors.country.push(requiredFieldError.country);
      isFormValid = false;
    }

    setRegisterErrors(errors);
    
    if (!errors.email.length && currentField == 'email') {
      serverEmailValidation(registerFormInput.email);
    }

    return isFormValid;
  };

  const serverEmailValidation = email => {
    api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        api()
          .post('/check-email', {email})
          .then((response) => {
            setRegisterErrors(prev => ({
              ...prev,
              email: ['email_exists']
            }));
          })
          .catch((error) => {
            const message = error.response?.data?.errors?.email;
            if (message && message.length
                && message[0].indexOf('We couldn\'t find an account') !== 0) {
              setRegisterErrors(prev => ({
                ...prev,
                email: ['email_exists']
              }));
            }
          })
      });
  }

  const getEmailFieldTitle = () => {
    const email = registerFormInput.email;
    if (!email.length) {
      return '';
    }
    if (email.indexOf('@') === -1) {
      return 'Email should contain "@" symbol. There is no "@" symbol in your email.';
    }
    if (email.indexOf('@') == email.length - 1) {
      return `Enter email part after "@" symbol. Email "${email}" is not completed.`;
    }
    if ((email.match(/@/g) || []).length > 1) {
      return 'Email part after "@" symbol can\'t contain "@" symbol.';
    }
     
    return '';
  }

  const displayIsValid = (field, type) => {
    const errors = type
      ? (registerErrors[field].includes(type) ? [type] : [])
      : registerErrors[field];
    if (!errors || !errors.length) {
      return true;
    }

    if (field == 'email' && errors.length && errors[0] == 'email_exists') {
      return false;
    }

    if (triedToSubmit && errors.length) {
      return false;
    }
    return null;
  }

  const getClassAfterValidation = (field, type) => {
    const validated = displayIsValid(field, type);
    return validated
      ? ' is-valid'
      : validated === false ? ' has-error' : '';
  }

  const getPasswordHintImage = type => {
    const validated = displayIsValid('password', type);
    return validated
      ? <img src="/assets/images/icon/check.svg" />
      : (validated === false
        ? <img src="/assets/images/icon/error.svg" />
        : <svg
            viewBox="0 0 48 48"
            focusable="false"
            aria-hidden="true"
            role="img"
            className="password-icon"
          >
            <circle cx="24" cy="24" r="19.9"></circle>
          </svg>);
  }

  const updateRegisterFormInput = e => {
    e.persist();

    clearTimeout(delayedClientValidation);
    delayedClientValidation = setTimeout(() => {
      setCurrentField(e.target.name);
      setRegisterFormInput(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }, 400);
  };

  const updateRegisterFormCountry = code => {
    setRegisterFormInput(prevState => ({
      ...prevState,
      country: code,
    }));

    setShowCountriesDropdown(false);
  };

  const register = (e) => {
    e.preventDefault();
    setTriedToSubmit(true);
    
    if (!clientValidation(registerFormInput)) {
      return false;
    }
    setLoading(true);
    api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        api()
          .post('/api/v1/register', registerFormInput)
          .then((response) => {
            if (response.data.errors) {
              setRegisterErrors(error.response.data.errors);
              setLoading(false);
            } else {
              registerSuccess();
            }
          })
          .catch((error) => {
            console.log(error);
            error.response?.data?.errors && setRegisterErrors(error.response.data.errors);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const switchToSignInForm = (e) => {
    e.preventDefault();
    callback(true);
    return false;
  }

  return (
    <Col xl={9} className='col-12 mx-auto'>
      <div className='dashlite-form card login-form--register'>
        <form onSubmit={register}>
          <Row>
            <Col lg={12}>
              <div className='space-mb--20'>
                <h2 className='space-mb--20 form--header'>
                  Create an account
                </h2>
                <p className="hint">
                  Already have an account?{' '}
                  <a
                    href='#'
                    onClick={switchToSignInForm}
                    className='small-link'
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </Col>
            <Col lg={12} className='field-group'>
              <p className="with-email-instructions">
                Sign up with email
              </p>
              <label htmlFor='regEmail'>
                Email address
              </label>
              <input
                type='text'
                id='regEmail'
                name='email'
                className={`form-control${getClassAfterValidation('email')}`}
                onChange={updateRegisterFormInput}
                title={getEmailFieldTitle()}
              />

              {displayIsValid('email') === false && (
                <div className='field-error'>
                  <span>{errorMessages[registerErrors.email]}</span>{' '}
                  {registerErrors.email[0] == 'email_exists'
                    ? <a
                        href='#'
                        className='small-link'
                        onClick={switchToSignInForm}
                      >
                        Sign in
                      </a>
                    : ''}
                </div>
              )}
            </Col>
            <Col lg={12}>
              <Row>
                <Col md={6} className='field-group'>
                  <label htmlFor='regFirstName'>
                    First Name{' '}
                  </label>
                  <input
                    type='text'
                    id='regFirstName'
                    name='first_name'
                    className={`form-control${getClassAfterValidation('first_name')}`}
                    onChange={updateRegisterFormInput}
                  />

                  {displayIsValid('first_name') === false && (
                    <div className='field-error'>
                      <span>{errorMessages[registerErrors.first_name[0]]}</span>
                    </div>
                  )}
                </Col>
                <Col md={6} className='field-group'>
                  <label htmlFor='regLastName'>
                    Last Name{' '}
                  </label>
                  <input
                    type='text'
                    id='regLastName'
                    name='last_name'
                    className={`form-control${getClassAfterValidation('last_name')}`}
                    onChange={updateRegisterFormInput}
                  />

                  {displayIsValid('last_name') === false && (
                    <div className='field-error'>
                      <span>{errorMessages[registerErrors.last_name[0]]}</span>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col lg={12} className={`password-field${getClassAfterValidation('password')} field-group`}>
              <label htmlFor='regPassword'>
                Password{' '}
              </label>
              <div className="password-field--inner-wrapper">
                <input
                  id='regPassword'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  className={`form-control${getClassAfterValidation('password')} password-input`}
                  onChange={updateRegisterFormInput}
                />
                <span className="password-input--border"></span>
                <button
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="password-visibility-toggle-button"
                  onClick={togglePasswordVisibility}
                  key='password-toggle-button-signup'
                  type='button'
                >
                  <svg
                    viewBox="0 0 36 36"
                    focusable="false"
                    aria-hidden="true"
                    role="img"
                    className="password-visibility-toggle-icon"
                  >
                    {showPassword
                      ? <Fragment>
                          <path d="M24.613 8.58A14.972 14.972 0 0 0 18 6.937c-8.664 0-15.75 8.625-15.75 11.423 0 3 7.458 10.7 15.686 10.7 8.3 0 15.814-7.706 15.814-10.7 0-2.36-4.214-7.341-9.137-9.78zM18 27.225A9.225 9.225 0 1 1 27.225 18 9.225 9.225 0 0 1 18 27.225z"></path>
                          <path d="M20.667 18.083A2.667 2.667 0 0 1 18 15.417a2.632 2.632 0 0 1 1.35-2.27 4.939 4.939 0 0 0-1.35-.209A5.063 5.063 0 1 0 23.063 18a4.713 4.713 0 0 0-.175-1.2 2.625 2.625 0 0 1-2.221 1.283z"></path>
                        </Fragment>
                      : <Fragment>
                          <path d="M14.573 9.44A9.215 9.215 0 0 1 26.56 21.427l2.945 2.945c2.595-2.189 4.245-4.612 4.245-6.012 0-2.364-4.214-7.341-9.137-9.78A14.972 14.972 0 0 0 18 6.937a14.36 14.36 0 0 0-4.989.941z"></path>
                          <path d="M33.794 32.058L22.328 20.592A5.022 5.022 0 0 0 23.062 18a4.712 4.712 0 0 0-.174-1.2 2.625 2.625 0 0 1-2.221 1.278A2.667 2.667 0 0 1 18 15.417a2.632 2.632 0 0 1 1.35-2.27 4.945 4.945 0 0 0-1.35-.209 5.022 5.022 0 0 0-2.592.734L3.942 2.206a.819.819 0 0 0-1.157 0l-.578.579a.817.817 0 0 0 0 1.157l6.346 6.346c-3.816 2.74-6.3 6.418-6.3 8.072 0 3 7.458 10.7 15.686 10.7a16.455 16.455 0 0 0 7.444-1.948l6.679 6.679a.817.817 0 0 0 1.157 0l.578-.578a.818.818 0 0 0-.003-1.155zM18 27.225a9.2 9.2 0 0 1-7.321-14.811l2.994 2.994A5.008 5.008 0 0 0 12.938 18 5.062 5.062 0 0 0 18 23.063a5.009 5.009 0 0 0 2.592-.736l2.994 2.994A9.144 9.144 0 0 1 18 27.225z"></path>
                        </Fragment>
                    }
                  </svg>
                </button>
              </div>

              {displayIsValid('password') === false && (
                <div className='field-error'>
                  <span>{errorMessages['password_invalid']}</span>
                </div>
              )}
            </Col>
            {registerFormInput.password.length && registerErrors.password?.length
              ? <Col lg={12} className='field-group password-hints--container'>
                  <strong>Create a password that:</strong>
                  <div className='password-hints--inner-container'>
                    <p className={getClassAfterValidation('password', 'at_least_8')}>
                      {getPasswordHintImage('at_least_8')}
                      contains at least 8 characters
                    </p>
                    <p className={getClassAfterValidation('password', 'lower_and_upper')}>
                      {getPasswordHintImage('lower_and_upper')}
                      contains both lower (a-z) and upper case letters (A-Z)
                    </p>
                    <p className={getClassAfterValidation('password', 'one_number_or_symbol')}>
                      {getPasswordHintImage('one_number_or_symbol')}
                      contains at least one number (0-9) or a symbol
                    </p>
                    <p className={getClassAfterValidation('password', 'not_contains_email')}>
                      {getPasswordHintImage('not_contains_email')}
                      does not contain your email address
                    </p>
                  </div>
                </Col>
              : ''}
            <Col lg={12} className='form-group-country'>
              <span className='flag'>
                <span className={`fi fi-${registerFormInput.country}`}></span>
              </span>
              <div className='dropdown-container'>
                <button
                  className='dropdown-button'
                  onClick={toggleCountriesDropdownVisibility}
                  key='country-selector'
                  type='button'
                >
                  <span className='country-label'>{countries[registerFormInput.country]}</span>
                  <svg
                    className="dropdown-icon"
                    focusable="false"
                    aria-hidden="true"
                    role="img"
                  >
                    <path d="M9.99 1.01A1 1 0 0 0 8.283.3L5 3.586 1.717.3A1 1 0 1 0 .3 1.717L4.293 5.7a1 1 0 0 0 1.414 0L9.7 1.717a1 1 0 0 0 .29-.707z" className="icon-medium"></path>
                    <path d="M11.99 1.51A1 1 0 0 0 10.283.8L6 5.086 1.717.8A1 1 0 1 0 .3 2.217l4.99 4.99a1 1 0 0 0 1.414 0l4.99-4.99a1 1 0 0 0 .296-.707z" className="icon-large"></path>
                  </svg>
                </button>
                {showCountriesDropdown && <div className='popup-container'>
                  <ul className='country-menu'>
                    {Object.keys(countries).map(key => (
                      <li
                        className={`menu-item${key == registerFormInput.country ? ' is-selected' : ''}`}
                        onClick={() => updateRegisterFormCountry(key)}
                        key={`country-${key}`}
                      >
                        <span className='item-label'>
                          <span className='flag'>
                            <span className={`fi fi-${key}`}></span>
                          </span>
                          <span>{countries[key]}</span>
                        </span>
                        {key == registerFormInput.country
                          ? <svg
                              className="menu-checkmark"
                              focusable="false"
                              aria-hidden="true"
                              role="img"
                            >
                              <path d="M4.5 10a1.023 1.023 0 0 1-.8-.384l-2.488-3a1 1 0 0 1 1.577-1.233L4.5 7.376l4.712-5.991a1 1 0 1 1 1.576 1.23l-5.511 7A.977.977 0 0 1 4.5 10z" className="icon-medium"></path>
                              <path d="M6 14a1 1 0 0 1-.788-.385l-4-5a1 1 0 1 1 1.576-1.23L6 11.376l7.213-8.991a1 1 0 1 1 1.576 1.231l-8 10A1 1 0 0 1 6 14z" className="icon-large"></path>
                            </svg>
                          : ''}
                      </li>
                    ))}
                  </ul>
                </div>}
              </div>
              
              {registerErrors.country && (
                <div className='field-error'>
                  {registerErrors.country[0]}
                </div>
              )}
            </Col>
            <Col lg={12} className='field-group'>
              <p className='register-warning'>
                By clicking Create account, I agree that I have read and accepted the{' '}
                <Link href='/toc' as={`${process.env.PUBLIC_URL}/toc`} className='xsmall-link'>
                  Terms of Use
                </Link>
                {' '} and {' '}
                <Link
                  href='/privacy-policy'
                  as={`${process.env.PUBLIC_URL}/privacy-policy`}
                  className='xsmall-link'>
                  Privacy Policy
                </Link>.
              </p>
            </Col>
            <Col lg={12} className='button-container'>
              <div></div>
              <button
                className='btn-continue'
                onClick={register}
                disabled={loading}
                key='submit-button-signup'
                type='submit'
              >
                {loading
                  ? <div className="circle-loader" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-hidden="true">
                    <div className="track"></div>
                    <div className="fills">
                      <div className="mask1">
                        <div className="sub-mask1">
                          <div className="fill"></div>
                        </div>
                      </div>
                      <div className="mask2">
                        <div className="sub-mask2">
                          <div className="fill"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ''
                }
                <span>Create account</span>
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </Col>
  );
}

export default Guast(LoginPage);
