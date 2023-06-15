import React, {useEffect, useState} from 'react';
import {UsergroupAddOutlined,UserOutlined, DesktopOutlined,AreaChartOutlined,PieChartOutlined} from '@ant-design/icons';
import {Layout, Menu, Modal, theme} from 'antd';
import {BrowserRouter,  Link, Route, Routes} from 'react-router-dom';
import './Css/Main.css'
import Product from "./Product/Product";
import Order from "./Order/Order";
import AuthServise from "./AuthServise";
import Input from "./Input/Input";
import ProductReport from "./Product/ProductReport";






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
            label: <Link to="/order">OrderReport</Link>,
        }, {
            key: '5',
            icon: <UserOutlined />,
            label: <Link to="/productReport">ProductRepoer</Link>,
        },
        {
            key: '4',
            icon: <UserOutlined />,
            label: <Link to="/input">Input</Link>,
        }
    ];






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
                    <Content style={{ margin: '24px 16px 0' }}>

                        <Routes>

                            <Route path="/product" element={<Product isAdmin={isDirector}/>} />
                            <Route path="/order" element={<Order user={user}/>} />
                            <Route path="/input" element={<Input/>} />
                            <Route path="/productReport" element={<ProductReport/>} />

                        </Routes>

                    </Content>

                </Layout>

            </Layout>
        </BrowserRouter>
    );
};

export default Main;