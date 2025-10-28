import React, { useState } from "react";
import Modal from "@/components/layout/Modal/Modal";
import RegisterForm from "@/components/molecules/RegisterForm/RegisterForm";
import {
  FooterLink,
  SplitWrapper,
  BannerSection,
  ContentSection,
  BannerTextBlock,
} from "./RegisterModalPage.styles";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import { FaShoppingCart, FaWallet, FaGift } from "react-icons/fa";
import Title from "@/components/atoms/Title/Title";

const RegisterModalPage: React.FC = () => {
  const [open, setOpen] = useState(true);

  const bannerContent = [
    {
      title: "Manage Your Orders",
      desc: "Track orders, deliveries, and returns under My Orders.",
      icon: <FaShoppingCart size={24} color="#1F6187" />,
    },
    {
      title: "Flexible Finance Options",
      desc: "Enjoy No Cost EMI, cashback, and multiple payment modes.",
      icon: <FaWallet size={24} color="#1F6187" />,
    },
    {
      title: "ROne Loyalty Points",
      desc: "Earn and redeem loyalty points across Reliance formats.",
      icon: <FaGift size={24} color="#1F6187" />,
    },
  ];

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <ButtonPrimary onClick={() => setOpen(true)}>Open Register Popup</ButtonPrimary>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="">
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
            <Title>Organization Registration</Title>
            <RegisterForm />
            <FooterLink>
              Already have an account? <a href="/login">Login</a>
            </FooterLink>
          </ContentSection>
        </SplitWrapper>
      </Modal>
    </>
  );
};

export default RegisterModalPage;
