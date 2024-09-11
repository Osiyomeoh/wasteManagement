// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DataStorage {

    struct DataRecord {
        string dataHash;
        address owner;
    }

    // Mapping from user address to data records
    mapping(address => DataRecord) private records;

    // Mapping to keep track of access rights
    mapping(address => mapping(address => bool)) private accessControl;

    // Owner of the contract
    address private contractOwner;

    // Events to notify updates and access changes
    event DataUpdated(address indexed owner, string dataHash);
    event AccessGranted(address indexed owner, address indexed grantedTo);
    event AccessRevoked(address indexed owner, address indexed revokedFrom);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    // Modifier to restrict access to only the contract owner
    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Not contract owner.");
        _;
    }

    // Modifier to restrict access to only the data owner
    modifier onlyDataOwner() {
        require(records[msg.sender].owner == msg.sender, "You don't own this data.");
        _;
    }

    // Constructor to set the contract owner
    constructor() {
        contractOwner = msg.sender;
    }

    // Store data (Only the owner can call this)
    function storeData(string memory _dataHash) public {
        require(bytes(_dataHash).length > 0, "Data hash cannot be empty");
        records[msg.sender] = DataRecord(_dataHash, msg.sender);
        emit DataUpdated(msg.sender, _dataHash);
    }

    // Update existing data (Only the owner can update their data)
    function updateData(string memory _dataHash) public onlyDataOwner {
        require(bytes(_dataHash).length > 0, "Data hash cannot be empty");
        records[msg.sender].dataHash = _dataHash;
        emit DataUpdated(msg.sender, _dataHash);
    }

    // Grant access to a dataHash for another user (Only the owner can grant access)
    function grantAccess(address _user) public onlyDataOwner {
        require(_user != address(0), "Invalid user address");
        require(!accessControl[msg.sender][_user], "Access already granted");

        accessControl[msg.sender][_user] = true;
        emit AccessGranted(msg.sender, _user);
    }

    // Revoke access to a dataHash for another user (Only the owner can revoke access)
    function revokeAccess(address _user) public onlyDataOwner {
        require(_user != address(0), "Invalid user address");
        require(accessControl[msg.sender][_user], "Access not granted");

        accessControl[msg.sender][_user] = false;
        emit AccessRevoked(msg.sender, _user);
    }

    // Transfer ownership of data to another address
    function transferDataOwnership(address _newOwner) public onlyDataOwner {
        require(_newOwner != address(0), "New owner address cannot be zero.");

        // Transfer data ownership to the new owner
        records[_newOwner] = records[msg.sender];

        // Remove access for the old owner without looping
        delete records[msg.sender];
        emit OwnershipTransferred(msg.sender, _newOwner);
    }

    // Retrieve data by owner address (Owner or granted users can retrieve data)
    function getData(address _owner) public view returns (string memory) {
        require(_owner != address(0), "Invalid owner address");
        require(
            msg.sender == _owner || accessControl[_owner][msg.sender],
            "You do not have access to this data."
        );
        return records[_owner].dataHash;
    }

    // Helper function to check if a user has access to a given owner's data
    function hasAccess(address _owner, address _user) public view returns (bool) {
        return accessControl[_owner][_user];
    }

    // Transfer ownership of the contract to another address
    function transferContractOwnership(address _newOwner) public onlyContractOwner {
        require(_newOwner != address(0), "New owner address cannot be zero.");
        contractOwner = _newOwner;
        emit OwnershipTransferred(msg.sender, _newOwner);
    }

    // Get the current contract owner
    function getContractOwner() public view returns (address) {
        return contractOwner;
    }
}
