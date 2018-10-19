pragma solidity 0.4.24;

contract LoyaltyPoints {

    // model a member
    struct Member {
        address memberAddress;
        string firstName;
        string lastName;
        string email;
        uint points;
        bool isRegistered;
    }

    // model a partner
    struct Partner {
        address partnerAddress;
        string name;
        bool isRegistered;
    }

    // model points transaction
    enum TransactionType { Earned, Redeemed }
    struct PointsTransaction {
        uint points;
        TransactionType transactionType;
        address memberAddress;
        address partnerAddress;
    }

    //members and partners on the network mapped with their address
    mapping(address => Member) public members;
    mapping(address => Partner) public partners;

    //public transactions and partners information
    Partner[] public partnersInfo;
    PointsTransaction[] public transactionsInfo;

    //register sender as member
    function registerMember (string _firstName, string _lastName, string _email) public {
      //check msg.sender in existing members
      require(!members[msg.sender].isRegistered, "Account already registered as Member");

      //check msg.sender in existing partners
      require(!partners[msg.sender].isRegistered, "Account already registered as Partner");

      //add member account
      members[msg.sender] = Member(msg.sender, _firstName, _lastName, _email, 0, true);
    }

    //register sender as partner
    function registerPartner (string _name) public {
      //check msg.sender in existing members
      require(!members[msg.sender].isRegistered, "Account already registered as Member");

      //check msg.sender in existing partners
      require(!partners[msg.sender].isRegistered, "Account already registered as Partner");

      //add partner account
      partners[msg.sender] = Partner(msg.sender, _name, true);

      //add partners info to be shared with members
      partnersInfo.push(Partner(msg.sender, _name, true));

    }

    //update member with points earned
    function earnPoints (uint _points, address _partnerAddress ) public {
      // only member can call
      require(members[msg.sender].isRegistered, "Sender not registered as Member");

      // verify partner address
      require(partners[_partnerAddress].isRegistered, "Partner address not found");

      // update member account
      members[msg.sender].points = members[msg.sender].points + _points;

      // add transction
      transactionsInfo.push(PointsTransaction({
        points: _points,
        transactionType: TransactionType.Earned,
        memberAddress: members[msg.sender].memberAddress,
        partnerAddress: _partnerAddress
      }));

    }

    //update member with points used
    function usePoints (uint _points, address _partnerAddress) public {
      // only member can call
      require(members[msg.sender].isRegistered, "Sender not registered as Member");

      // verify partner address
      require(partners[_partnerAddress].isRegistered, "Partner address not found");

      // verify enough points for member
      require(members[msg.sender].points >= _points, "Insufficient points");

      // update member account
      members[msg.sender].points = members[msg.sender].points - _points;

      // add transction
      transactionsInfo.push(PointsTransaction({
        points: _points,
        transactionType: TransactionType.Redeemed,
        memberAddress: members[msg.sender].memberAddress,
        partnerAddress: _partnerAddress
      }));
    }

    //get length of transactionsInfo array
    function transactionsInfoLength() public view returns(uint256) {
        return transactionsInfo.length;
    }

    //get length of partnersInfo array
    function partnersInfoLength() public view returns(uint256) {
        return partnersInfo.length;
    }

}
