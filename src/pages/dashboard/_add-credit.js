import Head from 'next/head';

import { LayoutDashlite } from '../../components/Layout';
import WithAuth from '../../components/WithAuth';
import { fetchUser } from '../../redux/actions/userActions';
import { useDispatch, connect } from 'react-redux';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Alert, Button, Card, Col, ListGroup, Row, Spinner, Form, Container } from 'react-bootstrap';
import api from '../../lib/api';
import taxRate from '../../data/vat.json';
import countries from '../../data/countries.json';

const AddCredit = ({ user }) => {
    const [busy, setBusy] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isSidebarShown,  setIsSidebarShown] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [amount, setAmount] = useState(50);
    const [validated, setValidated] = useState(amount > 19.99);
    const [rate, setRate] = useState(0);
    const [country, setCountry] = useState('AF');
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    const getTax = (e) => {
        return (e*rate / 100).toFixed(2)
    }

    const getTotal = (e) => {
        return (e*(100+rate)/100).toFixed(2)
    }
    
    const dispatch = useDispatch();

    useEffect(()=>{
        api()
        .post(`/api/v1/fastspring/detail`, {email: user.email})
        .then((res) => {
            const {email, first_name, last_name, address, city, phone, state, postal_code, company, country, vat_id} = res.data;
            setCountry(country);
            setForm({
                email, 
                firstName: first_name, 
                lastName:last_name, 
                addressLine1: address, 
                city, 
                phone, 
                region: state, 
                postalCode: postal_code, 
                company,
                vatId: vat_id
            });
        });
    }, [user]);
    
    useEffect(() => {
        const onFSPopupClosed = (order) => {
            if(order && order.id) {
                api()
                .get(`/api/v1/fastspring/orders/${order.id}`)
                .then((res) => {
                    api()
                        .post(`/api/v1/fastspring/billing`, {
                            email:res?.data?.customer?.email,
                            firstName:res?.data?.customer?.first, 
                            lastName:res?.data?.customer?.last, 
                            company: res?.data?.customer?.company, 
                            addressLine1: res?.data?.address?.addressLine1,  
                            city: res?.data?.address?.city,  
                            region: res?.data?.address?.region,  
                            phone: res?.data?.customer?.phone,
                            country: res?.data?.address?.country,  
                            postalCode: res?.data?.address?.postalCode 
                        })
                        .then((response) => {
                            console.log(response)
                        })
                    dispatch(fetchUser());
                })
            }
        }

        const addSBL = () => {
            const scriptId = "fsc-api";
            const existingScript = document.getElementById(scriptId);
            if (!existingScript) {
              const storeFrontToUse = "3dinfinite.test.onfastspring.com/popup-pop-add-credit";
              const script = document.createElement("script");
      
              script.type = "text/javascript";
              script.id = scriptId;
              script.src =
                "https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.8.5/fastspring-builder.min.js";
              script.dataset.storefront = storeFrontToUse;
              // Make sure to add callback function to window so that the DOM is aware of it
              window.onFSPopupClosed = onFSPopupClosed;
              script.setAttribute("data-popup-closed", "onFSPopupClosed");
      
              document.body.appendChild(script);
            }
          };
          addSBL();
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        if (isSidebarShown) {
            document.body.classList.add('nav-shown');
        } else {
            document.body.classList.remove('nav-shown');
        }
    }, [isSidebarShown]);

    const updateProd = () => {
        if(!validated) {
            setShowError(true);
            return
        }
        setLoadingCheckout(true);
        api()
            .get(`/api/v1/fastspring/products/credit/${amount}`)
            .then(() => {
                setLoadingCheckout(false)
                const { email, firstName, lastName, addressLine1, city, phone, region, postalCode, company } = form
                window.fastspring.builder.push({
                    products: [
                      {
                        path: 'credit',
                        quantity: 1
                      }
                    ],
                    paymentContact:{
                        email:email,
                        firstName:firstName, 
                        lastName:lastName, 
                        company: company, 
                        addressLine1: addressLine1,  
                        city: city,  
                        region: region,  
                        phone: phone,
                        country: country,  
                        postalCode: postalCode 
                    },
                    checkout: true
                  });
            })
            .catch((err) => {
                setLoadingCheckout(false)
            })
    }



  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      updateProd()
    }
  }

  const findFormErrors = () => {
    const { email, firstName, lastName, addressLine1, city, phone, postalCode, terms } = form
    const newErrors = {}
    var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if ( !terms ) {
        setShow(true)
        newErrors.term = "Please read and check terms.";
    } 
    if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
    if (!emailPattern.test(email)) {
        newErrors.email = "Please enter valid email address.";
    }
    if ( !firstName || firstName === '' ) newErrors.firstName = 'please input a firstName!'
    if ( !lastName || lastName === '' ) newErrors.lastName = 'please input a lastName!'
    if ( !addressLine1 || addressLine1 === '' ) newErrors.addressLine1 = 'please input a addressLine1!'
    if ( !city || city === '' ) newErrors.city = 'please input a city!'
    if ( !phone || phone === '' ) newErrors.phone = 'please input a phone!'
    if ( !postalCode || postalCode === '' ) newErrors.postalCode = 'please input a postalCode!'
    return newErrors
  }

    return (
        <LayoutDashlite 
            busy={ busy }
            setBusy={ setBusy }
            user={ user }
            isSidebarShown={ isSidebarShown }
            setIsSidebarShown={ setIsSidebarShown }
        >
            <Head>
                <title>Add Credit | My Account | 3d Infinite</title>
            </Head>
            <Container style={{maxWidth:'662px'}}>
                <div className="nk-block-head nk-block-head-sm pb-4">
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h4 className="nk-block-title page-title">
                                Checkout
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="nk-block">
                    <div className="card">
                        <div className="card-inner">
                            <Form.Group controlId="terms">
                                <Form.Check
                                    onChange={ e => {
                                        setField('terms', e.target.checked) 
                                        if(e.target.checked) {
                                            setShow(!e.target.checked)
                                        }
                                    }}
                                    checked={form.terms}
                                    isInvalid={ !!errors.terms }
                                    type='checkbox'
                                    label={
                                        <p className='m-0'>
                                            &nbsp;Please read through the&nbsp;<Alert.Link style={{color:'#40798B'}} href='/toc'>terms of use</Alert.Link>&nbsp;and&nbsp;<Alert.Link style={{color:'#40798B'}} href='/privacy-policy'>privacy policy</Alert.Link>.
                                        </p>
                                    }
                                    id="terms-check"
                                    />
                                <Form.Control.Feedback type='invalid'>{ errors.terms }</Form.Control.Feedback>
                            </Form.Group>
                            <Alert show={show} variant="danger">
                                <div className="d-flex justify-content-between" style={{alignItems:'center',width:'100%', height:'100%'}}>
                                    Please read and check terms!
                                </div>
                            </Alert>
                            <Alert variant="danger"  dismissible onClose={() => setShowError(false)} show={showError}>
                                <p>
                                    Minimum Credit amount should be $20!
                                </p>
                            </Alert>
                            <Card>
                                <div className='p-3 px-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h5>
                                            Billing Details
                                        </h5>
                                    </div>
                                    <div className='py-3'>
                                        <Form>
                                            <Form.Group as={Row} className="mb-3" controlId="email">
                                                <Form.Label column sm="3">
                                                    Email
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control 
                                                        placeholder='Email'
                                                        value={form.email}
                                                        onChange={ e => setField('email', e.target.value) }
                                                        isInvalid={ !!errors.email }
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="vatId">
                                                <Form.Label column sm="3">
                                                    VAT ID
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control 
                                                        placeholder='VAT ID'
                                                        value={form.vatId}
                                                        onChange={ e => setField('vatId', e.target.value) }
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="fname">
                                                <Form.Label column sm="3">
                                                    First Name
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        placeholder='First Name'
                                                        value={form.firstName}
                                                        onChange={ e => setField('firstName', e.target.value) }
                                                        isInvalid={ !!errors.firstName }
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.firstName }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="lname">
                                                <Form.Label column sm="3">
                                                    Last Name
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        placeholder="Last Name" 
                                                        value={form.lastName}
                                                        onChange={ e => setField('lastName', e.target.value) }
                                                        isInvalid={ !!errors.lastName }
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.lastName }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="comp">
                                                <Form.Label column sm="3">
                                                    Company
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        placeholder="Company" 
                                                        value={form.company}
                                                        onChange={ e => setField('company', e.target.value) }
                                                        isInvalid={ !!errors.company }
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.company }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="country">
                                                <Form.Label column sm="3">
                                                    Country
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control 
                                                        as='select' 
                                                        value={form.country}
                                                        onChange={ e => {
                                                            setField('country', e.target.value)
                                                            setCountry(e.target.value);
                                                            if(e.target.value) {
                                                                setRate(taxRate[`${e.target.value}`] ?? 0);
                                                            }
                                                        }}
                                                        isInvalid={ !!errors.country }
                                                    >
                                                        {
                                                            countries.map((c) =><option key={c.code} value={c.code}>{c.name}</option>)
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="address">
                                                <Form.Label column sm="3">
                                                    Address
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        placeholder="Address"
                                                        value={form.addressLine1}
                                                        onChange={ e => setField('addressLine1', e.target.value) }
                                                        isInvalid={ !!errors.addressLine1 } 
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.addressLine1 }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="city">
                                                <Form.Label column sm="3">
                                                    City
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        placeholder="City"
                                                        value={form.city}
                                                        onChange={ e => setField('city', e.target.value) }
                                                        isInvalid={ !!errors.city } 
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.city }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="region">
                                                <Form.Label column sm="3">
                                                    State
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control 
                                                        placeholder="State" 
                                                        value={form.region}
                                                        onChange={ e => setField('region', e.target.value) }
                                                        isInvalid={ !!errors.region } 
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="zipcode">
                                                <Form.Label column sm="3">
                                                    Zip Code
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control 
                                                        type="number" 
                                                        value={form.postalCode}
                                                        placeholder="Zip Code" 
                                                        onChange={ e => setField('postalCode', e.target.value) }
                                                        isInvalid={ !!errors.postalCode } 
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.postalCode }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="phone">
                                                <Form.Label column sm="3">
                                                    Phone
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control 
                                                        placeholder="Phone" 
                                                        value={form.phone}
                                                        onChange={ e => setField('phone', e.target.value) }
                                                        isInvalid={ !!errors.phone } 
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{ errors.phone }</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className='p-3 px-4'>
                                    <div className='d-flex justify-content-between' style={{alignItems:'center'}}>
                                        <div className='text-center'>
                                            <h5 className='m-0'>
                                                Credit Amount($)
                                            </h5>
                                            {
                                                !validated &&
                                                <sup style={{textAlign:'center', color:'#d93025'}}>
                                                    Minimum buy $20
                                                </sup>
                                            }
                                        </div>
                                        <h5>
                                        <Form.Control
                                            type="text"
                                            name="amount"
                                            value={amount} 
                                            style={{textAlign:'right'}}
                                            id='amount-input'
                                            onChange={(e)=>{
                                                setAmount(e.target.value*1)
                                                setValidated(e.target.value*1 > 19.99);
                                            }} 
                                        />
                                        </h5>
                                    </div>
                                    <div className='d-flex justify-content-between my-3'>
                                        <div>
                                            Tax($)
                                        </div>
                                        <div>
                                            {getTax(amount)}({rate}%)
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <h5>
                                            Total($):
                                        </h5>
                                        <h5>
                                            {getTotal(amount)}
                                        </h5>
                                    </div>
                                </div>
                            </Card>
                            <div className='text-right mt-3'>
                                <Button variant='success' className='rs-btn' onClick={handleSubmit} style={{width:'150px'}}>
                                    {
                                        !loadingCheckout ? 'Checkout' : <Spinner size='sm' animation='border' />
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </LayoutDashlite>
    );
};

const mapStateToProps = (state) => {
    const success = Cookies.get('tdi_purchase_success');
    let status = {
        success: false
    };

    if (!!success) {
        status = {
            success: success
        };

        if (success.new) {
            success.new = false;
        }
    }

    return {
        user: state.userData,
        status
    };
};

export default connect(mapStateToProps)(WithAuth(AddCredit));
