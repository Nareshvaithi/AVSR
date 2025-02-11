import { createSlice } from "@reduxjs/toolkit";
import storeImg from "../assets/Images/footer/store-img.png";
import specialOccasionImg from "../assets/Images/footer/special-occasions.png";
import specialDiscountImg from "../assets/Images/footer/special-discount.jpg";
import easyGoldImg from "../assets/Images/footer/easy-gold.png";
import masterCardImg from "../assets/Images/footer/master-card.png";
import vistCardImg from "../assets/Images/footer/visa-card.png";
import upiImg from "../assets/Images/footer/upi.png";
import faceboolIcon from "../assets/Images/footer/facebook-icon.png";
import youtubeIcon from "../assets/Images/footer/youtube-icon.png";
import instagramIcon from "../assets/Images/footer/insta-icon.png";
import pinterestIcon from "../assets/Images/footer/pintrust-icon.png";
import whatsappIcon from "../assets/Images/footer/whatsapp-icon.png";
import linkedInIcon from "../assets/Images/footer/linkedin-icon.png";


const initialState = {
    title:"About Our Store",
    subtitle:"Get in touch us for a complete jewellery shopping experience!",
    storeImg:storeImg,
    contactNo:"+91 9600 507 952",
    storeSpecials:[
        {id:1,name:"EASY GOLD PLANTHE",img:easyGoldImg},
        {id:2,name:"SPECIAL DISCOUNT",img:specialDiscountImg},
        {id:3,name:"SPECIAL OCCASIONS",img:specialOccasionImg},
    ],
    footerlinks1:[
        {id:1,title:"BSI Hallmark",link:""},
        {id:2,title:"Free Insured Shipping & Delivery",link:""},
        {id:3,title:"Diamond Certified",link:""},
    ],
    footerlinks2:[
        {id:1,title:"About Us",link:""},
        {id:2,title:"Contact Us",link:""},
        {id:3,title:"Store Locator",link:""},
    ],
    footerlinks3:[
        {id:1,title:"Enquire Form",link:""},
        {id:2,title:"Cancellation & Returns",link:""},
        {id:3,title:"Delivery Information",link:""},
        {id:4,title:"Store Policies",link:""},
        {id:5,title:"CSR Policies",link:""},
    ],
    paymentCards:[
        {id:1,name:"Master Card",img:masterCardImg},
        {id:2,name:"Visa Card",img:vistCardImg},
        {id:3,name:"UPI",img:upiImg},
    ],
    socialMedia:[
        {id:1,name:"Facebook",icon:faceboolIcon},
        {id:2,name:"YouTube",icon:youtubeIcon},
        {id:3,name:"Instagram",icon:instagramIcon},
        {id:4,name:"WhatsApp",icon:whatsappIcon},
        {id:5,name:"Pinterest",icon:pinterestIcon},
        {id:6,name:"linkedIn",icon:linkedInIcon},
    ]
}

const footerSlice = createSlice({
    name:"footer",
    initialState,
    reducers:{},
})

export default footerSlice.reducer;
export const selectFooterTitle = (state) => state.footer.title;
export const selectFooterSubTitle = (state) => state.footer.subtitle;
export const selectFooterStoreImg = (state) => state.footer.storeImg;
export const selectContactNo = (state) => state.footer.contactNo;
export const selectStoreSpecials = (state) => state.footer.storeSpecials;
export const selectfooterlinks1 = (state) => state.footer.footerlinks1; 
export const selectfooterlinks2 = (state) => state.footer.footerlinks2; 
export const selectfooterlinks3 = (state) => state.footer.footerlinks3;
export const selectPaymentCards = (state) => state.footer.paymentCards;
export const selectSocialMedia = (state) => state.footer.socialMedia