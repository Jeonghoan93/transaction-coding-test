import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../components/ErrorMessage";
import { Input } from "../components/Input";
import TransactionList from "../components/TransactionsList";
import { Container, InputBox, Main, Title } from "../components/sharedstyles";
import { createTransaction, getAccountById } from "../services/accounting";
import { Transaction } from "../types";
import { isValidUUID } from "../utils";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function Home() {
  const [accountId, setAccountId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!isValidUUID(accountId)) {
      setErrorMessage("Invalid account ID");
      return;
    }
    const newAmount = Number(amount);
    if (isNaN(newAmount)) {
      setErrorMessage("Invalid amount");
      return;
    }

    try {
      const response = await createTransaction(accountId, newAmount);
      const account = await getAccountById(accountId);

      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setTransactions([
          {
            account_id: response.account_id,
            amount: response.amount,
            balance: account.balance,
          },
          ...transactions,
        ]);

        setErrorMessage("");
        setAccountId("");
        setAmount("");
      }
    } catch (error) {
      setErrorMessage("An error occurred.");
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <Container>
      <Head>
        <title>Coding Test</title>
        <meta name="description" content="Generated by Coding Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>Transaction Management</Title>

        <ErrorMessage message={errorMessage} />

        <InputBox>
          <Input
            value={accountId}
            placeholder="Account ID"
            dataType="account-id"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setAccountId(e.target.value);
            }}
          />
          <Input
            value={amount}
            placeholder="Amount"
            dataType="amount"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setAmount(e.target.value);
            }}
          />

          <Button
            data-type="transaction-submit"
            onClick={handleSubmit}
            type="submit"
          >
            Submit Transaction
          </Button>
        </InputBox>

        <TransactionList transactions={transactions} />
      </Main>
    </Container>
  );
}
