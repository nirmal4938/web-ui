import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { resetAuth} from '@state/actions/authActions'
import Modal from "@/components/layout/Modal/Modal";
import LoginForm from "@/components/molecules/LoginForm/LoginForm";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import { SplitWrapper, BannerSection, ContentSection, BannerTextBlock, FooterLink } from "../Register/RegisterModalPage.styles";
import { FaShoppingCart, FaWallet, FaGift } from "react-icons/fa";
import Title from "@/components/atoms/Title/Title";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const formRef = useRef<any>(null);

const handleClose = () => {
  // ✅ Reset Formik form
  formRef.current?.resetForm?.();

  // ✅ Reset Redux auth state
  dispatch(resetAuth());

  // ✅ Close modal & navigate
  setOpen(false);
  navigate("/home-page");
};

  const bannerContent = [
    {
      title: "Secure Login",
      desc: "Access your account securely with email & password.",
      icon: <FaWallet size={24} color="#1F6187" />,
    },
    {
      title: "Track Orders",
      desc: "Track all your orders and manage your account easily.",
      icon: <FaShoppingCart size={24} color="#1F6187" />,
    },
    {
      title: "Exclusive Rewards",
      desc: "Earn loyalty points and avail offers across Reliance formats.",
      icon: <FaGift size={24} color="#1F6187" />,
    },
  ];

  return (
    // <>
    //   <div style={{ textAlign: "center", marginTop: "80px" }}>
    //     <ButtonPrimary onClick={() => setOpen(true)}>Open Login Popup</ButtonPrimary>
    //   </div>

    //   <Modal isOpen={open} onClose={handleClose} title="">
    //     <SplitWrapper>
    //       <BannerSection width="40%">
    //         {bannerContent.map((item, index) => (
    //           <BannerTextBlock key={index}>
    //             <div className="icon">{item.icon}</div>
    //             <div>
    //               <h4>{item.title}</h4>
    //               <p>{item.desc}</p>
    //             </div>
    //           </BannerTextBlock>
    //         ))}
    //       </BannerSection>

    //       <ContentSection width="60%">
    //         <Title>Login to Your Account</Title>
    //         {/* 👇 Pass form ref here */}
    //         <LoginForm ref={formRef} />
    //         <FooterLink>
    //           Don’t have an account? <a href="/register">Register</a>
    //         </FooterLink>
    //       </ContentSection>
    //     </SplitWrapper>
    //   </Modal>
    // </>
    <React.Fragment>
<SplitWrapper>
          <BannerSection width="40%">
            {bannerContent.map((item, index) => (
              <BannerTextBlock key={index}>
                <div className="icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </BannerTextBlock>
            ))}
          </BannerSection>

          <ContentSection width="60%">
            <Title>Login to Your Account</Title>
            {/* 👇 Pass form ref here */}
            <LoginForm ref={formRef} />
            <FooterLink>
              Don’t have an account? <a href="/register">Register</a>
            </FooterLink>
          </ContentSection>
        </SplitWrapper> 
    </React.Fragment>
  );
};

export default LoginPage;
