import React from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  brand: string;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

interface Message {
  id: string;
  text?: string;
  products?: Product[];
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Props {
  message: Message;
}

const BubbleContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin: 4px 0;
`;

const Bubble = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${props => props.$isUser ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.$isUser ? 'white' : 'black'};
  font-size: 14px;
  line-height: 1.4;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 8px;
`;

const ProductCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  background: white;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductTitle = styled.h3`
  margin: 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const ProductBrand = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 4px 0;
`;

const ProductPrice = styled.p`
  font-weight: 600;
  color: #2563eb;
  margin: 4px 0;
`;

const ProductDescription = styled.p`
  font-size: 12px;
  color: #4b5563;
  margin: 4px 0;
`;

const Timestamp = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 4px;
  text-align: right;
`;

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === 'user';
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <BubbleContainer $isUser={isUser}>
      <div>
        {message.text && (
          <Bubble $isUser={isUser}>
            {message.text}
          </Bubble>
        )}
        {message.products && (
          <ProductsContainer>
            {message.products.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.thumbnail} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
              </ProductCard>
            ))}
          </ProductsContainer>
        )}
        <Timestamp>{formattedTime}</Timestamp>
      </div>
    </BubbleContainer>
  );
};

export default MessageBubble; 