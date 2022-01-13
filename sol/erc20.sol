// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ERC20
 * @dev 这是ERC20的标准接口，用于第三方应用调用时
 */
abstract contract ERC20 {
    function name() external virtual view returns (string memory);
    function symbol() external virtual view returns (string memory);
    function decimals() external virtual view returns (uint256);
    function totalSupply() external virtual view returns (uint256);

    function balanceOf(address who) external virtual view returns (uint256);
    function transfer(address to, uint256 value) external virtual returns (bool);
    function transferFrom(address _from, address _to, uint _value) external virtual returns (bool success);
    function approve(address _spender, uint _value) external virtual returns (bool success);
    function allowance(address _owner, address _spender) external virtual view returns (uint remaining);
    function transferBath(address _from, address[] memory _to, uint256[] memory _value) external virtual returns(bool);

    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}