import React from 'react';
import { Accordion, AccordionItemT } from './Accordion';
import { FaqForm } from './FaqForm';

const faqList: Array<AccordionItemT> = [
	{
		id: '1',
		question: 'If I don’t the owner of the original NFT, can I own the IMMA NFT?',
		answer: 'No. Only when you are the owner of the original NFT, you can become the current owner of the IMMA NFT.'
	},
	{
		id: '2',
		question: 'Where can I claim IMMA NFT to my wallet if I have its original NFT?',
		answer: 'No. Only when you are the owner of the original NFT, you can become the current owner of the IMMA NFT.'
	},
	{
		id: '3',
		question: 'When does IMMA NFT return to IMMA.love trust wallet?',
		answer: 'No. Only when you are the owner of the original NFT, you can become the current owner of the IMMA NFT.'
	},
	{
		id: '4',
		question: 'How does IMMA NFT help me increase the value of existing NFT?',
		answer: 'No. Only when you are the owner of the original NFT, you can become the current owner of the IMMA NFT.'
	},
	{
		id: '5',
		question: 'What if I didn’t find the question I was looking for?',
		answer: 'No. Only when you are the owner of the original NFT, you can become the current owner of the IMMA NFT.'
	}
];

export const Faq: React.FC = () => {
	return (
		<section className="section faq">
			<div className="section-wrapper faq-wrapper">
				<div className="container">
					<h2 className="title title_size-m faq-title">FAQ</h2>
					<div className="faq-content">
						<Accordion items={faqList} />
						<FaqForm />
					</div>
				</div>
			</div>
		</section>
	);
};
