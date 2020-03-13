import React from 'react';
import './ContactUs.css' ;
const Contact = () => {
    return (
        <div className="checkoutPage">
                <h3>Contact Us</h3>
                <div className="clearBoth"></div>
                <div className="items">
                    <div className="lableInput">
                        <div className="lable">
                            <p>We love talking tech and we're here via email, chat, or phone. Our personal concierge shopping consultants are always on call to answer your questions and help you make informed purchases. Reach out today to consult with one of our friendly, slightly tech-obsessed experts.</p>
                        </div>
                        <div className="getInput">
                           
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Problem with my order </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                        <select>
                            <option value="OrderQuery">Problem with my order</option>
                            <option value="OrederReturn">Returns and refunds</option>
                            <option value="PaymentOption">Payment Options</option>
                            <option value="GiftCard">Gif cards</option>
                           </select>
                        </div>
                    </div>
                    
                    <div className="lableInput">
                        <div className="lable">
                            <span>Subject </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Name </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" /> 
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Email </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Order Number  </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                             <input type="text" />
                        </div>
                    </div>
                    <div className="lableInput">
                        <div className="lable">
                            <span>Message </span><span className="starik">*</span>
                        </div>
                        <div className="getInput">
                            <textarea cols="97"  rows="5"> </textarea>
                        </div>
                    </div>
                    
                    <div className="nextBtn"><a href="#">Submit </a></div>
                    <br/><br/><br/>
                    
                </div>
                
            </div>
    )
}
export default Contact;