// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {
    uint256 public favoriteNumber; // Initialized to zero // If no modifier is mentioned, internal

    mapping(string => uint256) public nameToFavoriteNumber;

    // People public person = People ({
    //     favoriteNumber: 1111,
    //     name: 'Niharika'
    // });

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    // To make it override-able, keyword: virtual
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
