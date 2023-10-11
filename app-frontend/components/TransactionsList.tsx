import styled from "styled-components";
import { Transaction } from "../types";

export const ITEMS_PER_PAGE = 10;

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionDiv = styled.div`
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-top: 7px;
  font-size: 0.7rem;
`;

const FlexContainer = styled.div`
  max-height: 400px;
  overflow-y: scroll;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
`;

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <FlexContainer>
      <h2>
        {transactions.length === 0 ? "Please enter input" : "Transactions"}
      </h2>
      {Array.isArray(transactions) &&
        transactions.slice(0, 6).map((transaction, index) => (
          <TransactionDiv
            key={index}
            data-type="transaction"
            data-account-id={transaction.account_id}
            data-amount={transaction.amount}
            data-balance={transaction.balance}
          >
            {transaction.account_id} - {transaction.amount} -{" "}
            {transaction.balance}
          </TransactionDiv>
        ))}
    </FlexContainer>
  );
};

export default TransactionList;
