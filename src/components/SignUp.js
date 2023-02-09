import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import login_pic from './pictures/login_pic.png';
import './styles/auth_style.css';
import Dropdown from 'react-bootstrap/Dropdown';

function SignUp(){
    return(
    <div className = 'form my-5 mx-5'>
        <div className = 'd-flex justify-content-center align-items-center container'>
            <div className = 'row p-4'>
                <div className="col-lg-6 pt-2">
                    <div className = 'h-row'>
                        <h2>Sign Up</h2>
                    </div>
                    <Form>
                        <Form.Label>Username</Form.Label>
                        <div className="form-row my-2 pb-2">
                            <Form.Control id ='username' type = 'email' required minLength={3} maxLength ={20}></Form.Control>
                        </div>
                        <Form.Label>Password</Form.Label>
                        <div className="form-row my-2 pb-2">
                            <Form.Control id ='password' type = 'password' required minLength={3} maxLength ={20}></Form.Control>
                        </div>
                        <Form.Label>Confirm Password</Form.Label>
                        <div className="form-row my-2 pb-2">
                            <Form.Control id ='password' type = 'password' required minLength={3} maxLength ={20}></Form.Control>
                        </div>
                        <div className="form-row mt-4">
                            <Button variant="outline-dark">Login</Button>
                        </div>
                        <div className="form-row mt-4">
                            <h3>Don't Have an Account?</h3>
                            <div className="form-row mt-4">
                                <Button variant="outline-dark">Create Account</Button>
                            </div>   
                        </div>

                        <div className="form-row mt-4">
                            <h4>What kind of games do you play?</h4>
                            <Form.Select className = 'custom-select-form' aria-label="Default select example">
                                <option value="1">Action</option>
                                <option value="2">Action-Adventure</option>
                                <option value="3">RPG</option>
                                <option value="4">Simulation</option>
                                <option value="5">Strategy</option>
                                <option value="6">Sports</option>
                                <option value="7">MMO</option>
                                <option value="8">Adventure</option>
                            </Form.Select>
                            
                                
                        </div>

                        <div className="form-row mt-4">
                            <h4>What platform do you prefer?</h4>
                                <Form.Select className = 'custom-select-form' aria-label="Default select example">
                                    <option selected>Select platform</option>
                                    <option value="1">Xbox</option>
                                    <option value="2">Playstation</option>
                                    <option value="3">PC</option>
                                    <option value="4">Nintendo</option>
                                </Form.Select>
                        </div>
                        <div className="form-row mt-4">
                            <h3>Already Have an Account?</h3>
                            <div className="form-row mt-4 pb-3">
                                <Button variant="outline-dark">Login</Button>
                            </div>   
                        </div>
                    </Form>

                    
                   
            

                    
                </div>
                <div className= 'col-lg-6 d-flex justify-content-center align-items-center'>
                        <img src={login_pic} className="img-fluid" alt="logo" />
                    </div>
            </div>

            
        </div>
    </div>
    );
}

export default SignUp;