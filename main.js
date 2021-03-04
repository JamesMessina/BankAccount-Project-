function logTransaction(){

  let currentAmount = document.getElementById("amount").value;
  let currentPayee = document.getElementById("payee").value
  let recentTransaction = new Transaction(currentAmount, currentPayee); 

  let lineItem = document.createElement("li"); 
  document.getElementById("transList").appendChild(lineItem);
  lineItem.append(JSON.stringify(recentTransaction));
}


class BankAccount{

  accountNumber;
  owner;
  transactions;
  
  constructor(inputAccountNumber, inputOwner){
    this.accountNumber = inputAccountNumber;
    this.owner = inputOwner;
    this.transactions = [];  
  }
    
  balance(){
      
    // declare currentbalance variable and assign to 0; 
    let currentBalance = 0; 
  
    // initiate for loop to loop over transactions array for current instance
    for(let i = 0; i < this.transactions.length; i++){ 
      // let current transaction amount be assigned to transaction array at current index iterating over 
      let transactionAmount = this.transactions[i].amount;
      //add current transaction amount to balance and set current balance to new sum 
      currentBalance += transactionAmount;
    } 
    return currentBalance; 
  }
  
  deposit(incomingPayments){
    //if amount of incoming payment transaction(instance) is less than 0, then log following statement, else push the incoming payment to transactions array
    if(incomingPayments.amount < 0){
      console.log("You cannot deposit a negative amount of money."); 
    }else{
      this.transactions.push(incomingPayments); 
    }
  }
  
  charge(payee, outgoingPayments){
  
    if(outgoingPayments.amount > 0){
      //if amount of outgoing payment transaction (instance) is greater than 0 then log following statement, else if current bankaccount balance (for whichever instance) plus the amount of outgoing payment results in negative funds then log next statement. If neither condititon is met then push the charge to transactions array 
      console.log('Amount must be negative because you are charging/debiting your account.'); 
    }else if(this.balance() + outgoingPayments.amount < 0 ){
      console.log('Cannot approve this transaction of ' + outgoingPayments.amount + ' dollars to/for ' + outgoingPayments.payee + ' due to insufficient funds in your account. Will result in overdraft. The overdraft amount would be ' + (this.balance() - Math.abs(outgoingPayments.amount)) + ' dollars.');
    }else{
      this.transactions.push(outgoingPayments); 
    }
  }
}
  
class Transaction{
  
  date; 
  amount;
  payee;
  
  constructor(inputAmount, inputPayee){
    this.amount = inputAmount;
    this.payee = inputPayee; 
    this.date = new Date(); 
  }
}
  
class SavingsAccount extends BankAccount{
  
  interestRate; 
  
  constructor(inputAccountNumber, inputOwner, inputInterestRate){
    super(inputAccountNumber, inputOwner);
    this.interestRate = inputInterestRate / 100; 
  }
  
  accrueInterest(){
    let interestAmount = this.balance() * this.interestRate;
    let totalAmount = interestAmount + this.balance(); 
  
    return 'The amount of interest generated is ' + interestAmount + ' and the account total is now ' + totalAmount; 
  }
}
  
/// new instance of bank account created below (1st one):///

const jamesChecking = new BankAccount('185767', 'james v messina'); 

document.getElementById("name").value = jamesChecking.owner;
document.getElementById("currentAccount").innerHTML =  jamesChecking.owner;
document.getElementById("accountnumber").value = jamesChecking.accountNumber;
  

  
///new transaction instances created below for james checking:///
  
const incomeCheck = new Transaction(1230.00, 'income payment from job');
//console.log(incomeCheck);
  
const dividendPayment = new Transaction(400.00, 'payout from current investments');
//console.log(dividendPayment); 
  
const phoneBillPayment = new Transaction(-75.00, 'payment to AT&T for wireless service');
//console.log(phoneBillPayment);
  
const rent = new Transaction(-1000.00, 'rent payment');
//console.log(rent); 
  
const tvPurchase = new Transaction(-500.00, 'payment for new tv');
//console.log(tvPurchase); 
  
const workoutEquipment = new Transaction(-4000.00, 'payment for workout equip');
//console.log(workoutEquipment);
  
///transactions, updated balances, snapshot of james account below: ///
   
//jamesChecking.deposit(incomeCheck); //deposit income check to jamesChecking
//jamesChecking.deposit(dividendPayment); //deposit dividend payment to jamesChecking
//console.log(jamesChecking) //log out jamesChecking object to make sure deposits are being stored in transactions array 
//console.log('The current balance is ' + jamesChecking.balance()); //get balance 
//jamesChecking.charge(phoneBillPayment.payee, phoneBillPayment); //make a charge to jamesChecking account for phoneBill 
//console.log(jamesChecking); // log out jamesChecking to make sure transactions updated 
//console.log('The current balance is ' + jamesChecking.balance()) //get new balance 
//jamesChecking.charge(rent.payee, rent); //charge rent payment to jamesChecking
//console.log(jamesChecking);
//console.log('The current balance is ' + jamesChecking.balance()) //get updated balance 
//jamesChecking.charge(tvPurchase.payee, tvPurchase); 
//console.log(jamesChecking);
//console.log('The current balance is ' + jamesChecking.balance());
//jamesChecking.charge(workoutEquipment.payee, workoutEquipment);
///console.log(jamesChecking);
//console.log('The current balance is ' + jamesChecking.balance()); 

document.getElementById("balance").value = jamesChecking.balance(); 
  
  
///new instance of savings account created below:///
  
const billySavings = new SavingsAccount('18227746', 'Billy Paranto', 2.0);
//console.log(billySavings); 
  
///new transaction for billySavings(deposit):/// 
  
const trustFundDeposit = new Transaction(5781.00, 'proceeds from trust fund');
//console.log(trustFundDeposit); 
  
////activity below for billySavings account:////
  
//billySavings.deposit(trustFundDeposit); 
//console.log(billySavings);
//billySavings.balance(); 
//console.log(billySavings.accrueInterest()); 
  
////assertion function below used for testing:///
  
function assertObjectsEqual(actual, expected, testName){
    
  actual = JSON.stringify(actual);
  expected = JSON.stringify(expected);
  
  if(actual === expected){
    console.log('Test passed');
  }else{
    console.log('Test failed'); 
  }
}
  
let johnChecking = new BankAccount('78856', 'John Fields');
johnChecking.deposit(incomeCheck);
johnChecking.deposit(dividendPayment);  

  
  //let actualOutcome = johnChecking.transactions
  //let expectedOutcome = [
   // {
      //date: 2021-03-03T19:57:46.311Z,
      //amount: 1230,
      //payee: 'income payment from job'
    //},
    //{
      //date: 2021-03-03T19:57:46.311Z,
      //amount: 400,
     // payee: 'payout from current investments'
    //}
  //];
  //let x = assertObjectsEqual(actualOutcome, expectedOutcome, 'tests to see if the objects have the same properties and values'); 
  //console.log(x)
  
  
  
  
  
  
  
  
  
  
  
  
  