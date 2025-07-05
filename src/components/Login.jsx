import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import '../styles/Login-Success.css';

const formInitial = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Geçerli bir eposta adresi girin.',
  password:
    'En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol(!@#$%^&*_ ) ve en az 1 rakam içermelidir.',
  terms: 'KVKK metnini kabul etmeniz gerekmektedir.',
};

export default function Login() {
  const [formData, setFormData] = useState(formInitial);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/.test(
      password
    );
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: newValue });

    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: !validateEmail(newValue) }));
    }

    if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: !validatePassword(newValue) }));
    }

    if (name === 'terms') {
      setErrors((prev) => ({ ...prev, terms: !newValue }));
    }
  };

  useEffect(() => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    history.push('/success');
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h5>Kayıt Ol</h5>
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email giriniz"
              value={formData.email}
              onChange={handleChange}
              invalid={errors.email}
            />
            {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="password">Şifre</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Şifre giriniz"
              value={formData.password}
              onChange={handleChange}
              invalid={errors.password}
            />
            {errors.password && (
              <FormFeedback>{errorMessages.password}</FormFeedback>
            )}
          </FormGroup>

          <FormGroup check className="mb-3">
            <Input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              invalid={errors.terms}
            />
            <Label for="terms" check>
              Kullanım koşullarını, gizlilik politikasını kabul ediyorum.
            </Label>
            {errors.terms && (
              <FormFeedback style={{ display: 'block' }}>
                {errorMessages.terms}
              </FormFeedback>
            )}
          </FormGroup>

          <Button color="primary" disabled={!isValid} type="submit" block>
            Kayıt Ol
          </Button>
        </Form>
      </div>
    </div>
  );
}