import React, {useEffect, useState} from 'react';
import {UsergroupAddOutlined,UserOutlined, DesktopOutlined,AreaChartOutlined,PieChartOutlined} from '@ant-design/icons';
import {Layout, Menu, Modal, theme} from 'antd';
import {BrowserRouter,  Link, Route, Routes} from 'react-router-dom';
import './Css/Main.css'
import Product from "./Product/Product";
import Category from "./Category/Category";
import User from "./User/User";
import Order from "./Order/Order";
import AuthServise from "./AuthServise";
import axios from "axios";





const { Header, Content, Footer, Sider } = Layout;

const Main = () => {

    const [temp,setTemp]=useState(false);
    const [date,setDate]=useState('');
    const [loading,isLoading]=useState(true);
    const string = localStorage.getItem("access_token");
    const [collasped,isCollasped]=useState(false)
    const [isDirector,setIsDrector]=useState(false)
    const [user,setUser]=useState({});



    useEffect(() => {
        AuthServise.getUser().then((user)=>{
            setUser(user)
if(user.roleEntities.includes('SUPER_ADMIN')){
    setIsDrector(true)
}
            console.log(user)
        })

    }, [])






    let menuItems = [
        {

        },
        {
            key: '1',
            icon: <DesktopOutlined />,
            label: <Link to="/product">Product</Link>,
        },

        {
            key: '3',
            icon: <UserOutlined />,
            label: <Link to="/order">Order</Link>,
        },
        {
            key: '4',
            icon: <UserOutlined />,
            label: <Link to="/user">User</Link>,
        }
    ];
    if(isDirector){
        menuItems.push(
            {
                key: '2',
                icon: <AreaChartOutlined />,
                label: <Link to="/category">Category</Link>,

            }
        );

    }




    useState(new Date().toLocaleDateString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();



    return (
        <BrowserRouter>
            <Layout className={"all"} style={{minHeight:"100vh"}}>

                {collasped?(
                    <Sider

                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                            isCollasped(collapsed);
                            console.log(collasped)
                        }}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            className={"sider"}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={menuItems}

                        />

                    </Sider>
                ):(
                    <Sider
                        className={" menu-open"}
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                            isCollasped(collapsed);
                            console.log(collasped)
                        }}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            className={"sider"}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={menuItems}

                        />

                    </Sider>
                )}
                <Layout>
                    <Header className={"test"} style={{ padding: 0, background: colorBgContainer }} >
                        <div className=" nav1">
                            <div className="nav-text">Barcha Ko’rsatkichlar</div>

                            <div className="icons">
                                <i className='bx bx-comment-dots'></i>
                                <i className='bx bxs-calendar'></i>
                                <i className='bx bxs-bell-ring'></i>
                            </div>

                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>

                        <Routes>

                            <Route path="/product" element={<Product isAdmin={isDirector}/>} />
                            <Route path="/order" element={<Order user={user}/>} />
                            <Route path="/category" element={<Category/>} />
                            <Route path="/user" element={<User/>} />

                        </Routes>

                    </Content>

                </Layout>

            </Layout>
        </BrowserRouter>
    );
};

export default Main;