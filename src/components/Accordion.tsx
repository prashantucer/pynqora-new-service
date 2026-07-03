import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`accordion-item ${openIndex === index ? 'is-open' : ''}`}
        >
          <button 
            className="accordion-header" 
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <span className="accordion-title">{item.question}</span>
            <motion.div 
              className="accordion-icon"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="accordion-content-wrapper"
              >
                <div className="accordion-content">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
