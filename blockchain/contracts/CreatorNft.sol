// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error NftCreator__AlreadyInitialized();
error NftCreator__RangeOutOfBounds();
error NftCreator__TransferFailed();

contract CreatorNft is ERC721URIStorage, Ownable {
    // Type Declaration
    enum Creator {
        NILOJEDA,
        WERLYB,
        MIXWELL,
        CALITOS,
        ESPE,
        GREFG,
        LIASIKORA,
        GUANYAR,
        JCORKO
    }

    // Contract Variables
    uint256 private s_tokenCounter;
    string[] internal s_creatorTokenUris;
    bool private s_initialized;

    // Events
    event NftMinted(Creator Creator, address minter);

    constructor(string[9] memory _creatorTokenUris) ERC721("Heretics Creator NFT", "HER") {
        _initializeContract(_creatorTokenUris);
        s_tokenCounter = 0;
    }

    function _initializeContract(string[9] memory _creatorTokenUris) private {
        if (s_initialized) {
            revert NftCreator__AlreadyInitialized();
        }
        s_creatorTokenUris = _creatorTokenUris;
        s_initialized = true;
    }

    function requestNft(uint256 _creatorTokenIdType) public payable {
        if (_creatorTokenIdType > 8) {
            revert NftCreator__RangeOutOfBounds();
        }
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, s_creatorTokenUris[_creatorTokenIdType]);
        emit NftMinted(Creator(_creatorTokenIdType), msg.sender);
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert NftCreator__TransferFailed();
        }
    }

    function setCreatorTokenUris(string[9] memory _creatorTokenUris) public onlyOwner {
        s_creatorTokenUris = _creatorTokenUris;
    }

    function getCreatorTokenUris(uint256 _index) public view returns (string memory) {
        return s_creatorTokenUris[_index];
    }

    function getInitialized() public view returns (bool) {
        return s_initialized;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
