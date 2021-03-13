import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addBalanceToUser, deductBalanceToUser } from "../actions/transactionActions";
import { banUser, getUser } from "../actions/userActions";
import Header from 'components/Header';
import SideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import { adminAddCreditToUser, adminDeductCreditFromUser } from "actions/transactionActions";
import { useNavigate } from "react-router";

export default function UpdateBalancePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState(false);
    const [searchUserEmail, setSearchUserEmail] = useState('');
    const [creditUnit, setCreditUnit] = useState(0);

    //get the admin user information
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const senderEmail = userInfo.email;

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
            dispatch(adminAddCreditToUser(senderEmail, user.email, creditUnit));
            navigate('/admin');
        }
    };

    //button handler for deduct balance
    const deductBalanceHandler = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Do you want to add credit to the user?");
        if (confirm) {
            dispatch(adminDeductCreditFromUser(senderEmail, user.email, creditUnit));
            navigate('/admin');
        }
    };

    const banUserHandler = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure to ban the current user?");
        if (confirm) {
            dispatch(banUser(user.email));
            navigate('/admin');
        }
    };

    // const unBanUserHandler = (e) => {
    //     e.preventDefault();
    //     const confirm = window.confirm("Are you sure to ban the current user?");
    //     if (confirm) {
    //         dispatch(updateUser(user.email));
    //     }
    // };

    return (
        <div>
            <Header />
            <div className="sidebar-content">
                <SideBar />
                <div className="container admin-container">
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
                                            <div className="wallet-key"> Wallet Key </div>
                                            <div className="currentbalance"> Current Credit </div>
                                            <div > Status </div>
                                            {/* <div className="div-button1"> Update Credit</div> */}

                                            {/* <div className="div-button1"> Update Credit</div> */}
                                        </div>
                                        {user.validateStatus ? (
                                            <div>
                                                <div className="row">
                                                    <div className="email">{user.email}</div>
                                                    <div className="wallet-key">0xeccf6b5ff3e006B6159D8C06dE402C186FA155C1</div>
                                                    <div className="currentbalance">{user.currentCredit}</div>
                                                    <div >{user.banned ? "locked" : "unlocked"}</div>
                                                </div>

                                                <div className="row">
                                                    <div className="div-button1 title"> Update the user Credit</div>
                                                    <div >Number of Credit: 
                                                          <input className="credit-input" type="number" onChange={(e) => setCreditUnit(e.target.value)}></input>
                                                            Transaction token: 
                                                          <input className="transaction-input" type="number" ></input>
                                                        <button className="button is-primary is-rounded" onClick={addBalanceHandler}>Add</button>
                                                        <button className="button is-primary is-rounded"
                                                                      onClick={deductBalanceHandler}>Deduct</button>
                                                        </div>
                                                </div>

                                                <div className="row">
                                                    <div className="div-button2">
                                                        <button className="button is-primary is-rounded" onClick={banUserHandler}>Lock the user Account</button>
                                                        <button className="button is-primary is-rounded" >UnLock the user Account</button></div>
                                                </div>
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
