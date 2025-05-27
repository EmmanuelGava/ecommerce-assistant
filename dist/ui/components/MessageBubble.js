import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
const BubbleContainer = styled.div `
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin: 4px 0;
`;
const Bubble = styled.div `
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${props => props.$isUser ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.$isUser ? 'white' : 'black'};
  font-size: 14px;
  line-height: 1.4;
`;
const ProductsContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 8px;
`;
const ProductCard = styled.div `
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  background: white;
`;
const ProductImage = styled.img `
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;
const ProductTitle = styled.h3 `
  margin: 8px 0;
  font-size: 16px;
  font-weight: 600;
`;
const ProductBrand = styled.p `
  color: #6b7280;
  font-size: 14px;
  margin: 4px 0;
`;
const ProductPrice = styled.p `
  font-weight: 600;
  color: #2563eb;
  margin: 4px 0;
`;
const ProductDescription = styled.p `
  font-size: 12px;
  color: #4b5563;
  margin: 4px 0;
`;
const Timestamp = styled.div `
  font-size: 11px;
  color: #6b7280;
  margin-top: 4px;
  text-align: right;
`;
const MessageBubble = ({ message }) => {
    const isUser = message.sender === 'user';
    const formattedTime = message.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (_jsx(BubbleContainer, { "$isUser": isUser, children: _jsxs("div", { children: [message.text && (_jsx(Bubble, { "$isUser": isUser, children: message.text })), message.products && (_jsx(ProductsContainer, { children: message.products.map((product) => (_jsxs(ProductCard, { children: [_jsx(ProductImage, { src: product.thumbnail, alt: product.title }), _jsx(ProductTitle, { children: product.title }), _jsx(ProductBrand, { children: product.brand }), _jsxs(ProductPrice, { children: ["$", product.price.toFixed(2)] }), _jsx(ProductDescription, { children: product.description })] }, product.id))) })), _jsx(Timestamp, { children: formattedTime })] }) }));
};
export default MessageBubble;
