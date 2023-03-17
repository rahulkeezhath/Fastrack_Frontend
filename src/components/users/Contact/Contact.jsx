import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, FormGroup, Row } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Helmet from '../Helmet/Helmet'
import CommonSection from '../UI/About/CommonSection'
import './Contact.css'
import { useForm } from "react-hook-form";
import {toast, Toaster} from 'react-hot-toast'
import emailjs from "@emailjs/browser";

const socialLinks = [
    {
        url: "#",
        icon: "ri-facebook-line"
    },
    {
        url: "#",
        icon: "ri-instagram-line"
    },
    {
        url: "#",
        icon: "ri-linkedin-line"
    },
    {
        url: "#",
        icon: "ri-twitter-line"
    }
]

const Contact = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

      const form = useRef();


       const sendEmail = () => {

         emailjs
           .sendForm(
             "service_k449w18",
             "template_6us6o9z",
             form.current,
             "V1f2hZRjnAVJkGvZm"
           )
           .then(
             (result) => {
                
                toast.success("Message sent!");
               console.log(result.text);
               form.current.reset();
             },
             (error) => {
              toast.error('Message sent failed')
               console.log(error.text);
             }
           );
       };

  return (
    <Helmet title="Contact">
      <Header />
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mt-5" style={{ color: "#000d6b" }}>
                Get In Touch
              </h6>

              <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                <FormGroup className="contact_form">
                  <input
                    placeholder="Your Name"
                    type="text"
                    name="from_name"
                    {...register("from_name", {
                      required: "Please Enter Name",
                      minLength: {
                        value: 3,
                        message: "Name must be 3 or more characters",
                      },
                    })}
                  />
                  {errors.fullName && (
                    <p className="error_mg">{errors.from_name?.message}</p>
                  )}
                </FormGroup>
                <FormGroup className="contact_form">
                  <input
                    placeholder="Email"
                    type="email"
                    name="from_email"
                    {...register("from_email", {
                      required: "Please Enter Email",
                      pattern:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z-9-]+\.[a-zA-Z0-9-.]+$/i,
                      message: "Invalid Email Address",
                    })}
                  />
                  {errors.fullName && (
                    <p className="error_mg">{errors.from_email?.message}</p>
                  )}
                </FormGroup>
                <FormGroup>
                  <textarea
                    rows="5"
                    cols={50}
                    name="message"
                    placeholder="Message"
                    className="textarea"
                    {...register("message", {
                      required: "Please Enter Name",
                      minLength: {
                        value: 10,
                        message: "Message must be 10 or more characters",
                      },
                    })}
                  ></textarea>
                  {errors.fullName && (
                    <p className="error_mg">{errors.message?.message}</p>
                  )}
                </FormGroup>

                <button className="contact_btn mb-5" type="submit" value="Send">
                  Send Message
                </button>
              </form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact_info mt-5">
                <h6 className="fw-bold" style={{ color: "#000d6b" }}>
                  Contact Information
                </h6>
                <p className="section_description2 mb-0">
                  272 Manjeri, Malappuram, Kerala
                </p>
                <div className="d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0" style={{ color: "#000d6b" }}>
                    Phone:
                  </h6>
                  <p className="section_description2 mb-0">+91 6282314460</p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6" style={{ color: "#000d6b" }}>
                    Email:
                  </h6>
                  <p className="section_description2 mb-0">
                    rahulkeezhath@gmail.com
                  </p>
                </div>

                <h6 className="fw-bold mt-5" style={{ color: "#000d6b" }}>
                  Follow Us
                </h6>

                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social_link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Toaster />
      <Footer />
    </Helmet>
  );
}

export default Contact
