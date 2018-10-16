pragma solidity 0.4.24;

contract LoyaltyPoints {

    // model transaction
    enum TransactionType { Earned, Redeemed }
    struct Transaction {
        uint points;
        TransactionType transactionType;
        uint memberAccountNumber;
        uint partnerId;
    }

    // model a member
    struct Member {
        uint accountNumber;   //identifiable on transactions ledger
        string firstName;
        string lastName;
        string email;
        uint points;
    }

    // model a partner
    struct Partner {
        uint id;    //identifiable on transactions ledger
        string name;
    }

    //members and partners on the network mapped with their address
    mapping(address => Member) public members;
    mapping(address => Partner) public partners;

    //public transaction and partners information
    Partner[] public partnersInfo;
    Transaction[] public transactions;


    function registerMember (uint _accountNumber, string _firstName, string _lastName, string _email) public {
      //check msg.sender in existing members
      //check msg.sender in existing partners

      //add member account
      members[msg.sender] = Member(_accountNumber, _firstName, _lastName, _email, 0);
    }

    function registerPartner (uint _id, string _name) public {
      //check msg.sender in existing members
      //check msg.sender in existing partners

      //add partner account
      partners[msg.sender] = Partner(_id, _name);

      //add partners info to be shared with members
      partnersInfo.push(Partner({
        id: _id,
        name: _name
      }));

    }

    // only member can call
    function earnPoints (uint _points, uint _partnerId ) public {

      // verify partnerId

      // update member account
      members[msg.sender].points = members[msg.sender].points + _points;

      // add transction
      transactions.push(Transaction({
        points: _points,
        transactionType: TransactionType.Earned,
        memberAccountNumber: members[msg.sender].accountNumber,
        partnerId: _partnerId
      }));

    }

    // only member can call
    function usePoints (uint _points, uint _partnerId) public {

      // verify partnerId

      // update member account
      members[msg.sender].points = members[msg.sender].points - _points;

      // add transction
      transactions.push(Transaction({
        points: _points,
        transactionType: TransactionType.Redeemed,
        memberAccountNumber: members[msg.sender].accountNumber,
        partnerId: _partnerId
      }));
    }

    //get length of transactions array
    function transactionsLength() public view returns(uint256) {
        return transactions.length;
    }

    //get length of partnersInfo array
    function partnerInfosLength() public view returns(uint256) {
        return partnersInfo.length;
    }

}
