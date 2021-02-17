import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addBalanceToUser, deductBalanceToUser } from "../actions/transactionActions";
import { getUser } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'

export default function UpdateBalancePage() {
    const dispatch = useDispatch();

    const [search, setSearch] = useState(false);
    const [searchUserEmail, setSearchUserEmail] = useState('');
    const [creditUnit, setCreditUnit] = useState(0);

    //get the admin user information
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const senderEmail = userInfo.user.email;

    //get the receiver information
    const userGet = useSelector(state => state.userGet);
    const { user } = userGet;
    const searchUserHandler = (e) => {
        e.preventDefault();
        setSearch(true);
        dispatch(getUser(searchUserEmail));
    };

    //button handler for add balance
    const addBalanceHandler = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Do you want to add credit to the user?");
        if (confirm) {
            // dispatch(addBalanceToUser(senderEmail, user.email, creditUnit));
        }
    };

    //button handler for deduct balance
    const deductBalanceHandler = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Do you want to add credit to the user?");
        if (confirm) {
            // dispatch(deductBalanceToUser(senderEmail, user.email, creditUnit));
        }
    };

    return (
        <div>
            <Header />
            <div className="sidebar-content">
                <SideBar />
                <div className="admin-container">
                    <div className="admin-table">
                        <div className="table">
                            <h1 className="title-table">Search a User By Email</h1>
                            <div>Please Enter the User Email: <input type="email" onChange={(e) => setSearchUserEmail(e.target.value)}></input>
                                <button className="button is-primary is-rounded" onClick={searchUserHandler}> <span>Search</span></button>
                            </div>
                            {search ?
                                (user ? (
                                    <div className="search-user-table">
                                        <div className="title">
                                            <div className="email"> Email</div>
                                            <div className="currentbalance"> Current balance </div>
                                            <div className="div-button1"> Update Balance</div>
                                            <div className="div-button2"> Invalidate</div>
                                        </div>
                                        {user.validateStatus ? (
                                            <div className="row">
                                                <div className="email">{user.email}</div>
                                                <div className="currentbalance">0</div>
                                                <div className="div-button">Number of Credit
                                                 <input type="number" onChange={(e) => setCreditUnit(e.target.value)}></input>
                                                 <button className="button is-primary is-rounded" onClick={addBalanceHandler}>Add</button>
                                                 <button className="button is-primary is-rounded" 
                                                onClick={deductBalanceHandler}>Deduct</button></div>
                                                <div className="div-button2">
                                                 <button className="button is-primary is-rounded">Invalidate</button></div>
                                            </div>
                                        ) : (
                                                <div>Please Enter the Correct User Email!</div>
                                            )
                                        }

                                    </div>
                                ) : (
                                        <div>Please Enter the Correct User Email!</div>)
                                ) : (
                                    null
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}