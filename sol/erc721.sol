// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ERC721
 * @dev 这是ERC721的标准接口
 */
abstract contract ERC721 {
  // 查询用户持有token总数
  function balanceOf(address _who) external virtual view returns (uint256 _balance);
  // 查询tokenId的持有人
  function ownerOf(uint256 _tokenId) external virtual view returns (address _owner);
  // 转账tokenId给某人
  function transfer(address _to, uint256 _tokenId) external virtual;
  // 授权tokenId给某人
  function approve(address _to, uint256 _tokenId) external virtual;
  // 取得tokenId所有权
  function takeOwnership(uint256 _tokenId) external virtual;
  // 从持有人安全转移tokenId给某人
  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external virtual;
  // 从持有人安全转移tokenId和数据给某人
  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) external virtual;
  // 从持有人转移tokenId给某人
  function transferFrom(address _from, address to, uint256 _tokenId) external virtual;
  // 查询tokenId的操作人
  function getApproved(uint256 _tokenId) external virtual view returns (address operator);
  // 设置当前持有者所有tokenId给可操作人权限
  function setApprovalForAll(address _operator, bool _approved) external virtual;
  // 查询某人是否有授权操作
  function isApprovedForAll(address _owner, address _operator) external virtual view returns (bool);
  // 批量转账给某些人
  function transferBath(address _from, address[] memory _to, uint256[] memory _tokenId) external virtual returns(bool);

  // 事件通知——转账
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  // 事件通知——授权
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
  // 事件通知——授权所有
  event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}