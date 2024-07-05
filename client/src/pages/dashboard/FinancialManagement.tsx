import React, { useState } from 'react';
import './FinancialManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faChartLine, faCoins, faBullseye, faUmbrella, faBalanceScale, faTimes, faStar, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-reveal';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const FinancialManagement = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '', resources: '', rating: 0 });

  const openModal = (title, content, resources) => {
    setModalContent({ title, content, resources, rating: 0 });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const parseResources = (resources) => {
    if (!resources) return null;

    // Regular expression to match markdown-style links
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    return resources.replace(linkRegex, '<a href="$2" target="_blank">$1</a>');
  };

  const handleRatingChange = (value) => {
    setModalContent({ ...modalContent, rating: value });
  };

  const shareTopic = () => {
    const { title } = modalContent;
    const shareText = `Check out this financial management topic: ${title}`;
    const shareUrl = window.location.href; // Replace with actual URL to share

    // Using Web Share API if available, fallback to a simple alert
    if (navigator.share) {
      navigator.share({
        title: shareText,
        text: shareText,
        url: shareUrl,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert(`Share this topic:\n${shareText}\n${shareUrl}`);
    }
  };

  const sections = [
    {
      icon: faBalanceScale,
      title: 'Introduction to Financial Management',
      content: `
        Managing your finances is crucial for achieving financial stability and reaching your life goals. This section covers the basics of financial management, including budgeting, saving, and investing.

        <h3>Key Concepts:</h3>
        <ul>
          <li>Budgeting techniques</li>
          <li>Saving strategies</li>
          <li>Investment basics</li>
        </ul>
      `,
      resources: 'For more information, visit [Investopedia](https://www.investopedia.com), [NerdWallet](https://www.nerdwallet.com), and [The Balance](https://www.thebalance.com).',
    },
    {
      icon: faChartLine,
      title: 'Budgeting',
      content: `
        Creating and maintaining a budget helps you track your income and expenses. This section will teach you how to create a budget, stick to it, and adjust it as needed.

        <h3>Steps to Effective Budgeting:</h3>
        <ol>
          <li>Calculate your income and expenses</li>
          <li>Set financial goals</li>
          <li>Track your spending</li>
        </ol>
      `,
      resources: 'For detailed guides on budgeting, visit [Mint](https://www.mint.com), [YNAB](https://www.youneedabudget.com), and [Dave Ramsey](https://www.daveramsey.com).',
    },
    {
      icon: faPiggyBank,
      title: 'Saving',
      content: `
        Saving money is essential for future security and unexpected expenses. Learn about different savings strategies, how to set savings goals, and the importance of an emergency fund.

        <h3>Saving Tips:</h3>
        <ul>
          <li>Automate savings transfers</li>
          <li>Establish an emergency fund</li>
          <li>Explore high-interest savings accounts</li>
        </ul>
      `,
      resources: 'Learn more about saving strategies at [SmartAsset](https://www.smartasset.com), [Bankrate](https://www.bankrate.com), and [NerdWallet](https://www.nerdwallet.com).',
    },
    {
      icon: faCoins,
      title: 'Investing',
      content: `
        Investing allows your money to grow over time, helping you build wealth. Discover the basics of investing, different types of investments, and how to create an investment plan.

        <h3>Types of Investments:</h3>
        <ul>
          <li>Stocks and bonds</li>
          <li>Mutual funds</li>
          <li>Real estate</li>
        </ul>
      `,
      resources: 'For investing tips, visit [Robinhood](https://www.robinhood.com), [Fidelity](https://www.fidelity.com), and [Charles Schwab](https://www.schwab.com).',
    },
    {
      icon: faBullseye,
      title: 'Debt Management',
      content: `
        Managing debt effectively can help you avoid financial strain. This section covers strategies for paying off debt, consolidating loans, and improving your credit score.

        <h3>Debt Reduction Strategies:</h3>
        <ul>
          <li>Snowball method</li>
          <li>Debt consolidation loans</li>
          <li>Credit counseling</li>
        </ul>
      `,
      resources: 'For debt management resources, check [Credit Karma](https://www.creditkarma.com), [Debt.org](https://www.debt.org), and [The Simple Dollar](https://www.thesimpledollar.com).',
    },
    {
      icon: faUmbrella,
      title: 'Emergency Fund',
      content: `
        Building an emergency fund helps you cover unexpected expenses without financial stress. Learn how to create and maintain an emergency fund, and why it's important.

        <h3>Emergency Fund Essentials:</h3>
        <ul>
          <li>Setting fund targets</li>
          <li>Using liquid assets</li>
          <li>Replenishing after use</li>
        </ul>
      `,
      resources: 'Read more about emergency funds at [NerdWallet](https://www.nerdwallet.com), [The Balance](https://www.thebalance.com), and [Investopedia](https://www.investopedia.com).',
    },
  ];

  return (
    <div className="financial-management">
      <div className="hero">
        <h1>How to Manage Your Finances</h1>
        <p>Take control of your financial future with these tips and strategies.</p>
      </div>
      <div className="features-container">
        {sections.map((section, index) => (
          <Fade bottom key={index}>
            <div className="feature-card" onClick={() => openModal(section.title, section.content, section.resources)}>
              <FontAwesomeIcon icon={section.icon} size="3x" className="feature-icon" />
              <div className="feature-content">
                <h2>{section.title}</h2>
                <p>{section.content.split('\n')[0]}</p>
                <div className={`accordion-content ${section.expanded ? 'expanded' : ''}`}>
                  <p dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
                <p className="learn-more">Click to learn more...</p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles} contentLabel="Feature Details">
        <div className="modal-header">
          <h2>{modalContent.title}</h2>
          <div className="modal-actions">
            <div className="modal-share">
              <FontAwesomeIcon icon={faShareAlt} onClick={shareTopic} />
            </div>
            
          </div>
          <button onClick={closeModal} className="modal-close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-content" dangerouslySetInnerHTML={{ __html: modalContent.content }} />
          {modalContent.resources && (
            <div className="modal-resources">
              <h3>Additional Resources</h3>
              <p dangerouslySetInnerHTML={{ __html: parseResources(modalContent.resources) }} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FinancialManagement;
